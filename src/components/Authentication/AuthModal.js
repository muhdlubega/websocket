import React, { useState } from 'react';
import '../../App.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const TabPanel = ({ value, index, children }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
      handleClose();
    }).catch((error) => {
      console.log(error);
      return;
    })
  }

  return (
    <div>
      <button onClick={handleOpen} style={{width: 85, height: 40, marginLeft: 15, backgroundColor: "darkorchid", borderRadius: 10, cursor: "pointer", color: "white", fontWeight:"bold"}}>Log In</button>
      {open && (
        <div className="modal">
          <div className="modal-content" style={{borderRadius: 20, backgroundColor: "rgb(45, 44, 45)"}}>
            <div style={{
          display: "flex",
          alignItems: 'flex-end',
          justifyContent: 'flex-end'}}>
            <button onClick={handleClose} style={{width: 40, padding: 10, backgroundColor: "transparent", borderRadius: 80, cursor: "pointer", color: "white", fontWeight:"bold"}}>X</button>
            </div>
          <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <button
            style={{ flexGrow: 1, padding: 10, margin: "20px 0px", height: 40, background: value === 0 ? 'darkorchid' : '#2B2B2C', cursor: "pointer", color: "white", fontWeight:"bold", borderTopLeftRadius: 10,  borderBottomLeftRadius: 10 }}
            onClick={() => handleChange(null, 0)}
          >
            Log In
          </button>
          <button
            style={{ flexGrow: 1, padding: 10, margin: "20px 0px", height: 40, background: value === 1 ? 'darkorchid' : '#2B2B2C', cursor: "pointer", color: "white", fontWeight:"bold", borderTopRightRadius: 10,  borderBottomRightRadius: 10}}
            onClick={() => handleChange(null, 1)}
          >
            Sign Up
          </button>
        </div>
      <TabPanel value={value} index={0}>
        <LogIn handleClose={handleClose}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp handleClose={handleClose}/>
      </TabPanel>
      <div>
        <GoogleButton style={{width: '100%', outline: 'none', borderRadius: 10,}}
        onClick={signInWithGoogle}/>
      </div>
    </div>
            </div>
        </div>
      )}
    </div>
  );
}
