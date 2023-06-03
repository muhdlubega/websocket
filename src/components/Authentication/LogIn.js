import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LogIn = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password){
        return;
    }
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
  
        handleClose();
      } catch (error) {
        return;
      }
  };

  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <form>
        <input
          type="email"
          value={email}
          autoComplete="on"
          placeholder="Enter your email..."
          style={{
            marginBottom: 10,
            width: "100%",
            padding: "10px",
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2B2B2C",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          autoComplete="on"
          placeholder="Enter your password..."
          style={{
            marginBottom: 10,
            width: "100%",
            padding: "10px",
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2B2B2C",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: 50,
            marginBottom: 20,
            padding: 10,
            backgroundColor: "darkorchid",
            borderRadius: 10,
            cursor: "pointer",
            color: "white",
            fontSize: 16
          }}
        >
          Log Into Your Account!
        </button>
      </div>
    </div>
  );
};

export default LogIn;
