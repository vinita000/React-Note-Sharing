import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase';
import NoteModal from './NoteModal';

const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  title: "",
  description: '',
  error: '',
  loading: true
};

const LoaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '4px',
});

const divstyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Center both horizontally and vertically
  margin: '20px 0',
}

const buttonStyle = {
  padding: '16px',
  marginTop: '20px',
}

const button = {
  padding: '10px',
  gap: '10px',
  marginRight: '10px'
}

const Notes: React.FC<NoteAppProps> = ({ noteList, loading }) => {
  const [state, setState] = useState(defaultValues);
  console.log("notes1", loading);

  if (noteList.length === 0) {
    return (
      <LoaderContainer>
        {loading && <LoadingIndicator />}
      </LoaderContainer>
    );
  }

  const handleCloseModal = () => {
    setState((prevSate) => ({
      ...prevSate,
      isModalOpen: false,
    }));
  }

  const handleUpdateModal = () => {
    setState((prevSate) => ({
      ...prevSate,
      isModalOpen: true
    }));
  }

  const deleteNote = (id: string) => {
    const noteRef = ref(database, `notes/${id}`);
    remove(noteRef)
      .then(() => {
        console.log(`Document with ID ${id} successfully deleted.`);
      })
      .catch((error: string) => {
        console.error(`Error deleting document: ${error}`);
      });
  };

  const handleShareModal = () => {

  }
  


  return (
    <div>
      <h1>Notes</h1>
      {noteList.map((note: Note, index: number) => {
        const colorfulBackgrounds = ['#FF5733', '#33FF57', '#5733FF', '#FF33F0', '#33E5FF'];

        const backgroundColor = colorfulBackgrounds[index % colorfulBackgrounds.length];

        const noteStyle = {
          backgroundColor,
          padding: '16px',
          width: '50%'
        };

        console.log("isOpen")
        return (
          <div style={divstyle} key={note.id}>
            <Paper sx={noteStyle}>
              <Typography variant="h4" component="div">
                {note.title}
              </Typography>
              <Typography variant="body1">
                {note.description}
              </Typography>
              <div style={buttonStyle}>
                <button style={button} onClick={()=>handleUpdateModal()}>Update</button>
                <button style={button} onClick={() => deleteNote(note.id)}>Delete</button>
                <button style={button} onClick={()=>handleShareModal()}>Share</button>
                <NoteModal 
                isOpen={state.isModalOpen}
                onRequestClose={handleCloseModal}
                isCreate={false}
                updateId = {note.id}
                updateTitle={note.title}
                updateDescription={note.description}
              />
              </div>
            </Paper>
          </div>
        );
      })}
    </div>
  );
}

export default Notes;
