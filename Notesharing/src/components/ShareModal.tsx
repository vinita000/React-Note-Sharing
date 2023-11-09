import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Modal,
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';

import { db } from '../utils/firestore';
import { getDocs, collection, query, where, addDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from "../utils/firebase";

const errorStyle = { color: 'red' }
const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  isShared: true,
  error: '',
  loading: false,
  login: true,
  name: '',
  email: '',
  password: '',
  errorMessage: ''
};

const ShareModal: React.FC<NoteModalProps> = ({ isOpen, onRequestClose, noteId }) => {
  console.log("noteId.....", noteId)
  // console.log("onRequestClose....", onRequestClose)
  const [state, setState] = useState(defaultValues);
  // console.log("isShared....", state.isShared)
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      email: e.target.value
    }));
  }

  const handleShareNote = async () => {
    try {
      const currentUser = auth.currentUser
      console.log("currentUser....", currentUser);
      if(currentUser?.email === state.email) {
        console.log("You can't share notes to yourself")
        setState((prevState) => ({
          ...prevState,
          error: "You can't share notes to yourself"
        }));
        return
      }
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('user.email', '==', state.email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('User does not exist');
        setState((prevState) => ({
          ...prevState,
          error: "User does not exist"
        }));
      } else {
        const noteRef = doc(db, 'notes', noteId);
        const noteSnapshot = await getDoc(noteRef);
        const noteData = noteSnapshot.data();
        console.log("noteData", noteData?.note)
        const sharedNoteData = {
          note: {
            id: noteId,
            text: noteData?.note?.title,
            description: noteData?.note?.description
          },
          recipientUserId: state.email,
        };
        console.log("sharedNoteData", sharedNoteData)
        await addDoc(collection(db, 'SharedNote'), sharedNoteData);
        onRequestClose();
        console.log('Note shared successfully.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }
  
  


  console.log("isOpen.....", isOpen)
  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 4,
        }}
      >
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
          onClick={onRequestClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          { 'Share Note' }
        </Typography>
        <TextField
          value={state.email}
          onChange={handleEmail}
          placeholder="Enter email.."
          style={{ width: '100%'}}
          sx={{ paddingBottom: 2, margin: '5px 0'}}
        />
        <Typography style={errorStyle}>{state.error}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleShareNote}
        >
          { 'Share' }
        </Button>
      </Box>
    </Modal>
  );
};

export default ShareModal;
