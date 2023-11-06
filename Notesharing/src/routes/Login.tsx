import React, { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/appSlice'
import handleAuthStateChanges from '../utils/handleAuthStateChanges'

const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }
const errorStyle = { color: 'red' }
const textBoxStyle = { margin: "5px auto" }

const defaultValues: ISTATE = {
  isModalOpen: false,
  notes: [],
  title: "",
  description: '',
  error: '',
  loading: false,
  login: true,
  name: '',
  email: '',
  password: '',
  errorMessage: ''
};

const Login: React.FC = () => {
  const [state, setState] = useState(defaultValues)
  const { login, email, password, name, errorMessage } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLinkClick = () => {
    setState((prevState) => ({
      ...prevState,
      login: !prevState.login,
    }));
  };


  const handleSubmitForm = () => {
    console.log("login", login)
    if (!login) {
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              const user = auth.currentUser;
              console.log("displayName", user?.displayName);
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
              navigate(`/user/${user?.uid}/NoteApp`, { state: { login: true } });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("errorCode", errorCode)
              console.log("errorMessage", errorMessage)
              setState((prevSate) => ({
                ...prevSate,
                errorMessage: `${errorCode} - ${errorMessage}`,
              }));
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode)
          console.log("errorMessage", errorMessage)
          setState((prevSate) => ({
            ...prevSate,
            errorMessage: `${errorCode} - ${errorMessage}`,
          }));
        });

    }
    else {
      signInWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate(`/user/${user?.uid}/NoteApp/`, { state: { login: true } });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode)
          console.log("errorMessage", errorMessage)
          setState((prevSate) => ({
            ...prevSate,
            errorMessage: `${errorCode} - ${errorMessage}`,
          }));
        });
    }
  }

  useEffect(() => {
    const unsubscribe = handleAuthStateChanges(navigate, dispatch, location);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result", result)
        const user = result.user;
        const { uid, email, displayName } = auth.currentUser;
        if (user) {
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
            })
          );
          navigate(`/user/${user?.uid}/NoteApp`, { state: { login: login } });
        }
      })
      .catch((error) => {
        console.error(`Error signing in: ${error.message}`);
      });
  }


  console.log("name...", login)
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          {!login ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
        </Grid>
        {
          !login &&
          <TextField
            label='Username'
            placeholder='Enter username'
            variant="outlined"
            fullWidth required
            name="name"
            value={name}
            style={textBoxStyle}
            onChange={handleInputChange} />
        }
        <TextField
          label='Email'
          placeholder='Enter email'
          variant="outlined"
          fullWidth required
          name="email"
          value={email}
          style={textBoxStyle}
          onChange={handleInputChange}
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          type='password'
          variant="outlined"
          fullWidth required
          name="password"
          value={password}
          style={textBoxStyle}
          onChange={handleInputChange}
        />
        <Typography style={errorStyle}>{errorMessage}</Typography>
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleSubmitForm}> {!login ? "Sign Up" : "Sign In"}</Button>
        <Typography >
          <Link href="#" onClick={handleGoogleLogin}>
            Continue with Google?
          </Link>
        </Typography>
        {login ?
          (<Typography > Do you have an account ?
            <Link href="#" onClick={handleLinkClick}>
              Sign Up
            </Link>
          </Typography>)
          : (
            <Typography > Already Registered ?
              <Link href="#" onClick={handleLinkClick}>
                Sign In
              </Link>
            </Typography>
          )
        }
      </Paper>
    </Grid>
  )
}

export default Login