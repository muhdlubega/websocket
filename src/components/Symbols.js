import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089;
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const active_symbols_request = {
  // symbol: "R_50"
  active_symbols: 'brief',
  product_type: 'basic',
};

const Symbols = () => {
  const [activeSymbols, setActiveSymbols] = useState([]);

  const handleActiveSymbolsResponse = async (res) => {
    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      console.log('Error: ', data.error?.message);
      connection.removeEventListener('message', handleActiveSymbolsResponse, false);
      await api.disconnect();
    }

    if (data.msg_type === 'active_symbols') {
      setActiveSymbols(data.active_symbols);
      console.log(data.active_symbols)
      connection.removeEventListener('message', handleActiveSymbolsResponse, false);
    }
  };

  const getActiveSymbols = async () => {
    connection.addEventListener('message', handleActiveSymbolsResponse);
    await api.activeSymbols(active_symbols_request);
  };

  useEffect(() => {
    getActiveSymbols();
  }, []);

  return (
    <div>
      {/* <button id="activeSymbols" onClick={getActiveSymbols}>
        Get Active Symbols
      </button> */}
      <div style={{display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", justifyItems: "center"}}>
        {activeSymbols.map((symbol) => (
          <Link
          to={`/product/${symbol.symbol}`}
          key={symbol.symbol}
          style={{
            border: "1px solid darkorchid",
            borderRadius: 5,
            margin: 10,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: "darkorchid",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "darkorchid",
              color: "black",
            },
            width: "80%",
          }}
        >
          {symbol.display_name}
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Symbols;
