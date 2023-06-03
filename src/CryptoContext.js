import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      console.log(user)
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    else if (currency === 'JPY') setSymbol('¥');
  }, [currency]);

  useEffect(() => {
    if(user){
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if(coin.exists()){
          setWatchlist(coin.data().coins);
        } else {
          console.log("no items in watchlist")
        }
      })

    return()=>{
      unsubscribe();
    }
    }
  }, [user])

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist }}>{children}</Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}

// import { makeAutoObservable } from 'mobx';
// import { create } from 'mobx-persist';
// import { createContext, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { CoinList } from './config/api';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from './firebase';
// import { doc, onSnapshot } from 'firebase/firestore';

// class CryptoStore {
//   currency = 'USD';
//   symbol = '$';
//   coins = [];
//   loading = false;
//   user = null;
//   watchlist = [];
//   alert = {
//     open: false,
//     message: '',
//     type: 'success',
//   };

//   constructor() {
//     makeAutoObservable(this);
//   }

//   fetchCoins = async () => {
//     this.loading = true;
//     try {
//       const { data } = await axios.get(CoinList(this.currency));
//       this.coins = data;
//     } catch (error) {
//       console.error(error);
//     } finally {
//       this.loading = false;
//     }
//   };

//   setCurrency = (currency) => {
//     this.currency = currency;
//     if (currency === 'USD') this.symbol = '$';
//     else if (currency === 'EUR') this.symbol = '€';
//     else if (currency === 'JPY') this.symbol = '¥';
//   };

//   setUser = (user) => {
//     this.user = user;
//   };

//   fetchWatchlist = (uid) => {
//     const coinRef = doc(db, 'watchlist', uid);
//     const unsubscribe = onSnapshot(coinRef, (coin) => {
//       if (coin.exists()) {
//         this.watchlist = coin.data().coins;
//       } else {
//         console.log('no items in watchlist');
//       }
//     });
//     return unsubscribe;
//   };
// }

// const cryptoStore = new CryptoStore();
// const hydrate = create({ storage: localStorage });
// hydrate('cryptoStore', cryptoStore);

// const CryptoContext = createContext(cryptoStore);

// export const CryptoProvider = ({ children }) => {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         cryptoStore.setUser(user);
//       } else {
//         cryptoStore.setUser(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (cryptoStore.user) {
//       const unsubscribe = cryptoStore.fetchWatchlist(cryptoStore.user.uid);
//       return () => unsubscribe();
//     }
//   }, [cryptoStore.user]);

//   return <CryptoContext.Provider value={cryptoStore}>{children}</CryptoContext.Provider>;
// };

// export const CryptoState = () => {
//   return useContext(CryptoContext);
// };
