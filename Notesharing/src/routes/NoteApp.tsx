import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import NoteModal from '../components/NoteModal';
import Notes from '../components/Notes';
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../utils/appStore';
import { removeUser } from '../utils/appSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { db } from '../utils/firestore';
import handleAuthStateChanges from '../utils/handleAuthStateChanges';

const buttonStyle = {
  width: '15%',
};

const defaultNoteState: ISTATE = {
  isModalOpen: false,
  notes: [],
  loading: true,
};

const NoteApp: React.FC = () => {
  const [state, setState] = useState(defaultNoteState);
  const { isModalOpen, notes, loading } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store: RootState) => store.user);
  const { login } = location?.state || false;

  console.log("login test", login)

  useEffect(() => {
    const unsubscribe = handleAuthStateChanges(navigate, dispatch, location);
  
    const fetchData = async () => {
      try {
        const notesCollection = collection(db, 'notes');
        const unsubscribeSnapshot = onSnapshot(notesCollection, (querySnapshot) => {
          const notesArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("notesArray.........", notesArray);
          setState((prevState) => ({
            ...prevState,
            notes: notesArray,
            loading: false,
          }));
        });
  
        return () => {
          unsubscribeSnapshot();
        };
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };
  
    fetchData();
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  

  const handleModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
    }));
  };

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
    }));
  };

  const handleSignOutSubmit = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error('Error signing out: ', error);
      });

    navigate('/', { state: { login: false } });
    dispatch(removeUser());
  };


  console.log("notes........123", notes)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={buttonStyle}
          onClick={handleSignOutSubmit}
        >
          Sign Out
        </Button>
      </div>
      <Grid align="center">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleModal}
          style={buttonStyle}
          fullWidth
        >
          Create Note
        </Button>
        <NoteModal isOpen={isModalOpen} onRequestClose={handleCloseModal} isCreate={true} />
        <Notes noteList={notes} loading={loading} />
      </Grid>
    </div>
  );
};

export default NoteApp;
