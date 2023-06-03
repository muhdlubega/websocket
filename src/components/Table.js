import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import axios from "axios";
import { numbersWithCommas } from "./Carousel";

const useStyles = () => ({
  row: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Montserrat",
    padding: 20,
    "&:hover": {
      backgroundColor: "grey",
    },
  },
  pagination: {
    color: "rgb(179,71,252)",
  },
});

const Table = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();


  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ margin: 18, fontFamily: "Montserrat" }}>
        Cryptocurrencies Prices by Market Cap
      </h4>
      <input
        type="text"
        placeholder="Search for a Crypto Currency"
        style={{ marginBottom: 20, width: "100%", padding: "10px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table
            style={{
              padding: 20,
              width: "100%",
              backgroundColor: "darkorchid",
            }}
          >
            <tr>
              <th
                style={{
                  paddingLeft: 35,
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  width: "25%",
                }}
              >Coin
              </th>
              <th
                style={{
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  width: "25%",
                }}
              >Price
              </th>
              <th
                style={{
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  width: "25%",
                }}
              >24hr Change
              </th>
              <th
                style={{
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  width: "25%",
                }}
              >Market Cap
              </th>
            </tr>
          </table>
          <table
            style={{
              paddingTop: 20,
              width: "100%",
            }}
          >
            <tr>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <tr
                        onClick={() => navigate(`/coins/${row.id}`)}
                        style={{ display: "flex", height: "50%",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontFamily: "Montserrat",
                        padding: 20,
                        "&:hover": {
                          backgroundColor: "grey",
                        },}}
                        key={row.name}
                      >
                        <td width={"25%"}>
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "rgb(237, 211, 252)" }}>
                              {row.name}
                            </span>
                          </div>
                        </td>
                        <td width={"25%"}>
                          {symbol}{" "}
                          {numbersWithCommas(row.current_price.toFixed(2))}
                        </td>
                        <td
                          width={"25%"}
                          style={{ color: profit > 0 ? "green" : "red" }}
                        >
                          {profit && "+"}{" "}
                          {row?.price_change_percentage_24h?.toFixed(2)}%
                        </td>
                        <td width={"25%"}>
                          {symbol}{" "}
                          {numbersWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </td>
                      </tr>
                    );
                  })}
            </tr>
          </table>
        </div>
      )}
      <ul
        className={classes.pagination}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "150%",
          listStyle: "none",
          padding: "80px"
        }}
      >
        {Array.from(
          { length: Math.ceil(handleSearch()?.length / 10) },
          (_, index) => (
            <li
              key={index}
              onClick={() => {
                setPage(index + 1);
                window.scroll(0, 450);
              }}
              style={{"&:hover": {
                backgroundColor: "darkorchid",
                color: "black",
                cursor: "pointer"
              }}}
            >
              {index + 1}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Table;
