import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { alert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      console.log(alert);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
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
        <input
          type="password"
          value={confirmPassword}
          autoComplete="on"
          placeholder="Enter your password again..."
          style={{
            marginBottom: 10,
            width: "100%",
            padding: "10px",
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2B2B2C",
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            height: 40,
            marginBottom: 40,
            margin: 10,
            padding: 10,
            backgroundColor: "darkorchid",
            borderRadius: 10,
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Sign Up Now!
        </button>
      </div>

    </div>
  );
};

export default SignUp;
