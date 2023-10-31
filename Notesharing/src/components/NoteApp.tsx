import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import NoteModal from './NoteModal';
import Notes from './Notes';
import { notesRef } from '../utils/firebase';
import { onValue, off, DataSnapshot } from 'firebase/database';

const buttonstyle = {
  width: "25%"
}

const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  title: "",
  description: '',
  error: '',
  loading: true
};



const NoteApp: React.FC = () => {
  const [state, setState] = useState(defaultValues);
  const { isModalOpen, notes, loading } = state;

  useEffect(() => {
    const notesCallback = (snapshot: DataSnapshot) => {
      const notesData = snapshot.val() || [];
      // console.log("notesData", notesData);
      const notesArray = notesData && Object.keys(notesData)?.map((id) => ({ id, title: notesData[id]?.title, description: notesData[id]?.description } ));
      console.log("notesArray", notesArray);
      setState((prevState) => ({
        ...prevState,
        notes: notesArray,
        loading: false
      }));
    };

    const notesRefOff = onValue(notesRef, notesCallback);

    return () => {
      off(notesRef, 'value', notesRefOff);
    };
  }, []);

  const handleModal = () => {
    setState((prevSate) => ({
      ...prevSate,
      isModalOpen: true,
    }));
  }

  const handleCloseModal = () => {
    setState((prevSate) => ({
      ...prevSate,
      isModalOpen: false
    }));
  }

  console.log("loading", loading)
  return(
    <div>
      <Button type='submit' color='primary' variant="contained" onClick={handleModal} style={buttonstyle} fullWidth>Create Note</Button>
    <NoteModal 
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      isCreate={true}
    />
     <Notes noteList={notes} loading={loading}  />
    </div>
  )
}

export default NoteApp