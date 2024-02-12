// import React, { useEffect, useState } from 'react';
// import { db } from '../utils/firestore';
// // import { notesRef, database } from '../utils/firebase';
// // import { push, set } from 'firebase/database';
// // import { update, ref } from 'firebase/database';

// import {
//   Modal,
//   Box,
//   TextareaAutosize,
//   Button,
//   IconButton,
//   Typography,
//   TextField,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

// const defaultValues: ISTATE = {
//   isModalOpen: false,
//   notes: [],
//   // title: "",
//   // description: "",
//   error: '',
//   loading: false,
//   login: true,
//   name: '',
//   email: '',
//   password: '',
//   errorMessage: ''
// };
// import { auth } from "../utils/firebase";

// const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onRequestClose, isCreate, updateTitle, updateDescription, updateId  }) => {
//   console.log("isOpen", isOpen)
//   console.log("onRequestClose", onRequestClose)
//   console.log("updateTitle", updateTitle)
//   console.log("updateId", updateId)
//   const [state, setState] = useState(defaultValues);
//   const { title, description } = state;


//   useEffect(() => {
//     setState((prevState) => ({
//       ...prevState,
//       title: updateTitle || '',
//       description: updateDescription || '',
//       loading: false
//     }));
//   }, [updateTitle, updateDescription]);

//   const addNote = async () => {
//     // e.preventDefault();
//     const newNote = {
//       title: title,
//       description: description,
//     };
  
//     try {
//       await addDoc(collection(db, 'notes'), {
//         note: newNote,
//         userId: auth?.currentUser?.uid,
//         createdAt: serverTimestamp(),
//       });
  
//       setState((prevState) => ({
//         ...prevState,
//         title: '',
//         description: '',
//       }));
//       onRequestClose();
//     } catch (error: any) {
//       console.error('Error adding note: ', error);
//       setState((prevState) => ({
//         ...prevState,
//         error: error.message,
//       }));
//     }
//   }
  

//   const upDateNote = async (id: string, title: string, description: string) => {
//     console.log("id..........", id);
//     console.log("title..........", title);
//     console.log("descr..........", description);
//     const noteRef = doc(db, 'notes', id);

//     const updatedNote = {
//       note: {
//         title: title,
//         description: description
//       }
//     };


//     console.log("updatedNote.....", id)
//     try {
//       await setDoc(noteRef, updatedNote, { merge: true });
//       console.log('Document updated successfully.');
//       onRequestClose();
//     } catch (error) {
//       console.error('Error updating document:', error);
//     }
//   };
  

//   const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setState((prevState) => ({
//       ...prevState,
//       title: e.target.value
//     }));
//   }

//   const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setState((prevState) => ({
//       ...prevState,
//       description: e.target.value
//     }));
//   }

//   return (
//     <Modal open={isOpen} onClose={onRequestClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 500,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 3,
//           borderRadius: 4,
//         }}
//       >
//         <IconButton
//           aria-label="close"
//           sx={{
//             position: 'absolute',
//             top: 5,
//             right: 5,
//           }}
//           onClick={onRequestClose}
//         >
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h6" component="div">
//           { isCreate ? 'Create Note' : 'Update Note' }
//         </Typography>
//         <TextField
//           value={title}
//           onChange={handleText}
//           placeholder="Enter title.."
//           style={{ width: '100%'}}
//           sx={{ paddingBottom: 2, margin: '5px 0'}}
//         />
//         <TextareaAutosize
//           value={description}
//           onChange={handleDescription}
//           placeholder="Enter your note..."
//           minRows={4}
//           style={{ width: '100%', height: 90 }}
//           sx={{
//             border: '1px solid #ccc',
//             borderRadius: 4,
//             padding: 1,
//             '&:focus': {
//               border: '1px solid #000'
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           sx={{ mt: 2 }}
//           onClick={isCreate ? addNote : () => upDateNote(updateId, title, description)}
//           >
//           { isCreate ? 'Create Note' : 'Update Note' }
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default NoteModal;
