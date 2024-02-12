// import React, { useState, useEffect } from 'react';
// import { Grid, Button } from '@material-ui/core';
// import NoteModal from '../components/NoteModal';
// import Notes from '../components/Notes';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RootState } from '../utils/appStore';
// import { removeUser } from '../utils/appSlice';
// import { signOut } from 'firebase/auth';
// import { auth } from '../utils/firebase';
// import { db } from '../utils/firestore';
// import handleAuthStateChanges from '../utils/handleAuthStateChanges';

// const buttonStyle = {
//   width: '15%',
// };

// const defaultNoteState: ISTATE =  {
//   isModalOpen: false,
//   notes: [],
//   loading: true,
// };

// const NoteApp = () => {
//   const [state, setState] = useState(defaultNoteState);
//   const { isModalOpen, notes, loading } = state;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useSelector((store: RootState) => store.user);
//   const { login } = location?.state || false;

//   const fetchData = async () => {
//     try {
//       const currentUser = auth?.currentUser;
//       if (currentUser) {
//         const notesCollection = collection(db, 'notes');
//         const shareNoteCollection = collection(db, 'SharedNote');

//         const filteredQuery = query(notesCollection, where('userId', '==', currentUser?.uid));
//         const sharedFilteredQuery = query(shareNoteCollection, where('recipientUserId', '==', currentUser?.email));

//         const [notesSnapshot, sharedNotesSnapshot] = await Promise.all([
//           getDocs(filteredQuery),
//           getDocs(sharedFilteredQuery),
//         ]);

//         const notesArray = notesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         const sharedNotesArray = sharedNotesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         const combinedArray = [...notesArray, ...sharedNotesArray];

//         setState((prevState) => ({
//           ...prevState,
//           notes: combinedArray,
//           loading: false,
//         }));

//       }
//     } catch (error) {
//       console.error("Error fetching notes: ", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribeAuth = handleAuthStateChanges(navigate, dispatch, location);
//     fetchData();
//     return () => {
//       unsubscribeAuth();
//     };
//   }, [state]);

//   const handleModal = () => {
//     setState((prevState) => ({
//       ...prevState,
//       isModalOpen: true,
//     }));
//   };

//   const handleCloseModal = () => {
//     setState((prevState) => ({
//       ...prevState,
//       isModalOpen: false,
//     }));
//   };

//   const handleSignOutSubmit = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {
//         console.error('Error signing out: ', error);
//       });

//     navigate('/', { state: { login: false } });
//     dispatch(removeUser());
//   };

//   console.log("nnnnotes", notes)
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           style={buttonStyle}
//           onClick={handleSignOutSubmit}
//         >
//           Sign Out
//         </Button>
//       </div>
//       <Grid align="center">
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           onClick={handleModal}
//           style={buttonStyle}
//           fullWidth
//         >
//           Create Note
//         </Button>
//         <NoteModal isOpen={isModalOpen} onRequestClose={handleCloseModal} isCreate={true} />
//         <Notes noteList={notes} loading={loading} fetchUpdatedList={fetchData} />
//       </Grid>
//     </div>
//   );
// };

// export default NoteApp;
