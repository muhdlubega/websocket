import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { AiFillDelete } from "react-icons/ai";

function numbersWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Sidebar() {
  const [state, setState] = useState({
    right: false,
  });

  const { user, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    toggleDrawer();
  }

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <button style={{marginLeft: 10, backgroundColor: "rgb(45, 44, 45)", border: "none"}} onClick={toggleDrawer('right', true)}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'darkorchid',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img alt='profile-photo' style={{height: 40, width: 40, borderRadius: "50%"}} src='https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg'></img>
      </div>
    </div>
      </button>
      {state.right && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={toggleDrawer('right', false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '25%',
              height: '100%',
              background: '#fff',
              padding: '16px',
              backgroundColor: '#111012'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
            <img alt='profile-photo' style={{height: '10vw', width: '10vw', borderRadius: "50%", margin: 20}} src='https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg'></img>
            </div>
            <span style={{
              width: '100%',
              fontSize: 25,
              textAlign: 'center',
              fontWeight: 'bolder',
              wordWrap: 'break-word'}}>
            {user.displayName || user.email}
            </span>
            <div style={{flex: 1, margin: '20px 0',width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    // overflowY: "scroll",
    }}>
                <span style={{fontSize: 15, textShadow: '0 0 5px black'}}>Watchlist</span>
                {coins.map((coin) => {
                  if(watchlist.includes(coin.id)){
                    return(
                      <div>
                        <span>{coin.name}</span>
                        <span>
                          {symbol}
                          {coin.current_price.toFixed(2)}
                          <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                        </span>
                      </div>
                    )
                  } else return<></>
                })}
            </div>
            <button style={{height: 30, width: '100%', borderRadius: 10, backgroundColor:'darkorchid', color: 'white', fontWeight: 'bold'}} onClick={logOut}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}
