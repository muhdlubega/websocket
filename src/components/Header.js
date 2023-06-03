import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import Sidebar from "./Authentication/Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <header style={{ backgroundColor: "transparent" }}>
      <div style={{ margin: "0 auto", maxWidth: "960px" }}>
        <nav style={{ display: "flex", alignItems: "center", padding: "16px" }}>
          <h1
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              color: "rgb(199,119,252)",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/241/253/original/glowing-neon-crown-free-png.png"
              alt="logo"
              height={40}
            />
            Crypto King
          </h1>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            style={{
              border: "1px solid #000",
              padding: "8px",
              marginLeft: "16px",
              borderRadius: "4px",
            }}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
          </select>
          {user ? <Sidebar/> : <AuthModal/>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
