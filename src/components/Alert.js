import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";

export default function Alert({}) {
  const { alert, setAlert } = CryptoState();
  const [open, setOpen] = useState(false);

  const Snackbar = ({ open, autoHideDuration, onClose, children }) => (
    <div className={`snackbar ${open ? "open" : ""}`}>
      {children}
      {open && autoHideDuration && (
        <div className="snackbar-overlay" onClick={onClose}></div>
      )}
    </div>
  );

  const SnackbarInfo = ({ severity, children }) => (
    <div className={`alert ${severity}`}>{children}</div>
  );

  const handleClose = () => {
    setAlert({ ...alert, open: false });
    setOpen(false);
  };

  useEffect(() => {
    if (alert.open) {
      setOpen(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 6000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {/* <SnackbarInfo severity={alert.type}> */}
        {alert.message}
        {/* </SnackbarInfo> */}
      </Snackbar>
    </div>
  );
}
