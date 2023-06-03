import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { TrendingCoins } from "../config/api";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = () => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    color: "rgb(237,211,252)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
  },
});

export function numbersWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const classes = useStyles();

  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  const fetchTradingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTradingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        style={{
          color: "rgb(237,211,252)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
        }}
        to={`/coins/${coin.id}`}
        key={coin.id}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: "10px" }}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span
            style={{
              fontWeight: "500",
              color: profit > 0 ? "green" : "red",
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: "22px", fontWeight: "500" }}>
          {symbol} {numbersWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div style={{
      height: "50%",
      display: "flex",
      alignItems: "center",
      padding: "40px"
    }} className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={2000}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
