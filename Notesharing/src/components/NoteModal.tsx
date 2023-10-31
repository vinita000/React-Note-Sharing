import React, { useEffect, useState } from 'react';
import { notesRef, database } from '../utils/firebase';
import { push, set } from 'firebase/database';
import { update, ref } from 'firebase/database';

import {
  Modal,
  Box,
  TextareaAutosize,
  Button,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  title: "",
  description: "",
  error: '',
  loading: true
};

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onRequestClose, isCreate, updateTitle, updateDescription, updateId  }) => {
  const [state, setState] = useState(defaultValues);
  const { title, description } = state;


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      title: updateTitle || '',
      description: updateDescription || '',
    }));
  }, [updateTitle, updateDescription]);

  const addNote = () => {
    const newNoteRef = push(notesRef);
    const newNote = {
      title: title,
      description: description,
    };
    set(newNoteRef, newNote)
    .then(() => {
      setState((prevState) => ({
        ...prevState,
        title: '',
        description: '',
      }));
      onRequestClose();
    })
    .catch((error: string) => {
      console.error('Error adding note: ', error);
      setState((prevState) => ({
        ...prevState,
        error: error,
      }));
    });
  }

  const upDateNote = (id: string) => {
    const noteRef = ref(database, `notes/${id}`)
    // const noteRef = ref(notesRef, id);
    console.log("noteRef", noteRef)
    const updatedNoteData = {
      title: title,
      description: description,
    };


    console.log("updatedNoteData", updatedNoteData)
    update(noteRef, updatedNoteData)
      .then(() => {
        console.log('Note updated successfully');
        setState((prevState) => ({
          ...prevState,
        }));
        onRequestClose();
      })
      .catch((error: string) => {
        console.error('Error updating note: ', error);
        // Handle the error here, e.g., display an error message
      });
  }

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      title: e.target.value
    }));
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      description: e.target.value
    }));
  }

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
          { isCreate ? 'Create Note' : 'Update Note' }
        </Typography>
        <TextField
          value={title}
          onChange={handleText}
          placeholder="Enter title.."
          style={{ width: '100%'}}
          sx={{ paddingBottom: 2, margin: '5px 0'}}
        />
        <TextareaAutosize
          value={description}
          onChange={handleDescription}
          placeholder="Enter your note..."
          minRows={4}
          style={{ width: '100%', height: 90 }}
          sx={{
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: 1,
            '&:focus': {
              border: '1px solid #000'
            },
          }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={isCreate ? addNote : () => upDateNote(updateId)}
          >
          { isCreate ? 'Create Note' : 'Update Note' }
        </Button>
      </Box>
    </Modal>
  );
};

export default NoteModal;
