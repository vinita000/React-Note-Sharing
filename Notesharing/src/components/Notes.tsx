import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { remove } from 'firebase/database';
// import { database } from '../utils/firebase';
import NoteModal from './NoteModal';
import { db } from '../utils/firestore';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import ShareModal from './shareModal';


const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  title: "",
  description: '',
  error: '',
  loading: true,
  isShared: false,
  updatedId: "",
  updatedText: "",
  updatedDescription: "",
  sharedId: ""
};

const defaultType: SortingNote = {
  id: '',
  createdAt: { seconds: 0, nanoseconds: 0 },
  note: {
    title: '',
    description: ''
  }
}

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

const Notes: React.FC<NoteAppProps> = ({ noteList, loading, fetchUpdatedList }) => {
  const [state, setState] = useState(defaultValues);
  console.log("notes1........", loading);
  
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

  const handleUpdateModal = async (noteId: string) => {
    console.log("noteId", noteId);
    const noteRef = doc(db, 'notes', noteId);
    const sharedNoteRef = doc(db, 'SharedNote', noteId);
    console.log("sharedNoteRef", sharedNoteRef);
  
    const [noteSnapshot, sharedNoteSnapshot] = await Promise.all([
      getDoc(noteRef),
      getDoc(sharedNoteRef),
    ]);
  
    const noteData = noteSnapshot.data();
    const sharedNoteData = sharedNoteSnapshot.data();


    console.log("noteData", noteData?.note?.title)
    console.log("NoteDatadescription", noteData?.note?.description)
    console.log("SharednoteData", sharedNoteData?.note?.title)
    console.log("SharedNoteDatadescription", sharedNoteData?.note?.description)

    // let updatedText:string;
    // let updatedDescription:string;

    // if (sharedNoteData) {
    //   updatedText = sharedNoteData.note?.title;
    //   updatedDescription = sharedNoteData.note?.description;
    // } else {
      const updatedText = noteData?.note?.title;
      const updatedDescription = noteData?.note?.description;
    // }


    setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      updatedId: noteId,
      updatedText,
      updatedDescription,
    }));

  }
  


  const deleteNote = async (id: string) => {
    // alert(id)
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  };

  const handleShareModal = async (noteId: string) => {
    console.log("shareid", noteId)
    setState((prevSate) => ({
      ...prevSate,
      isShared: true,
      sharedId: noteId
    }));
  }

  const handleShareCloseModal = () => {
    setState((prevSate) => ({
      ...prevSate,
      isShared: false
    }));
  }
  
  console.log("result...........1", noteList)
  // console.log("result............2", noteList.sort())
  return (
    <div>
      <h1>Notes</h1>
      {noteList.sort((a: SortingNote, b: SortingNote) => b?.createdAt?.seconds - a?.createdAt?.seconds).map((note: Note, index: number) => {
        const colorfulBackgrounds = ['#FF5733', '#33FF57', '#5733FF', '#FF33F0', '#33E5FF'];

        const backgroundColor = colorfulBackgrounds[index % colorfulBackgrounds.length];

        const noteStyle = {
          backgroundColor,
          padding: '16px',
          width: '50%'
        };

        console.log("note.......", note.id)
        return (
          <div style={divstyle} key={note.id}>
            <Paper sx={noteStyle}>
              <Typography variant="h4" component="div">
                {note.note.title}
              </Typography>
              <Typography variant="body1">
                {note.note.description}
              </Typography>
              <Typography variant="body1">
                {note.sharedBy && `Shared By: ${note.sharedBy}`}
              </Typography>
              <div style={buttonStyle}>
              { !note.sharedBy && <button style={button} onClick={()=>handleUpdateModal(note.id)}>Update</button> }
              { !note.sharedBy && <button style={button} onClick={() => deleteNote(note.id)}>Delete</button> }
              { !note.sharedBy && <button style={button} onClick={()=>handleShareModal(note.id)}>Share</button> }
                <NoteModal 
                isOpen={state.isModalOpen}
                onRequestClose={handleCloseModal}
                isCreate={false}
                updateId = {state.updatedId}
                updateTitle={state.updatedText}
                updateDescription={state.updatedDescription}
              />
              { state.isShared && <ShareModal  noteId= {state.sharedId} isOpen={state.isShared} onRequestClose={handleShareCloseModal}/> }
              </div>
            </Paper>
          </div>
        );
      })}
    </div>
  );
}

export default Notes;
