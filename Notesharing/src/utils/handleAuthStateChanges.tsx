// import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
import { addUser, removeUser } from './appSlice'
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { NavigateFunction, Location } from 'react-router-dom';
import { Dispatch } from 'redux';


const handleAuthStateChanges = (navigate: NavigateFunction, dispatch: Dispatch, location: Location) => {

  
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    
    // console.log("user.....",user)
    const { login } = location?.state || false


    if (user) {
      const { uid, email, displayName } = user;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
        })
      );

      console.log("login2.........", login)
      navigate(`/user/${user.uid}/NoteApp`, { state: { login: login } });
    } else {
      dispatch(removeUser());
      navigate("/", { state: { login: false } });
      console.log("not login2.........", login)
    }
  });
  return unsubscribe;
}

export default handleAuthStateChanges;