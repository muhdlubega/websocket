import React from "react";
import Carousel from "./Carousel";

const useStyles = () => ({
  banner: {
    backgroundImage: "url(./matrixpurple.gif)",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    paddingTop: "25px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "15px",
    fontFamily: "Montserrat",
    fontSize: "600%",
    color: "white",
    textShadow: "5px 5px rgb(179,71,252)",
    paddingTop: "30px"
  },
  tagline: {
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontWeight: "bold",
    color: "rgb(237,211,252)",
    textTransform: "capitalize",
    padding: "20px"
  },
});

const Banner = () => {
  const classes = useStyles();

  return (
    <div style={classes.banner}>
      <div style={{ margin: "0 auto", maxWidth: "960px" }}>
        <h2 style={classes.title}>Crypto King</h2>
        <p style={classes.tagline}>
          The future of crypto. Right here. Right now.
        </p>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
