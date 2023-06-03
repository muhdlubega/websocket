// const WebSocket = require('ws');

// const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
// const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

// //Asset Index to check list of request indexes
// //Ticks stream to get ticks response
// //Check documentation for example of ticks stream syntax

// const tickStream = () => {
//   const request = { ticks: 'R_100' };
//   if (connection.readyState === WebSocket.OPEN) {
//     connection.send(JSON.stringify(request));
//   } else {
//     console.log('WebSocket connection is not open yet.');
//   }
// };

// const tickResponse = (data) => {
//   const response = JSON.parse(data);
//   if (response.error !== undefined) {
//     console.log('Error:', response.error.message);
//     connection.removeListener('message', tickResponse);
//     connection.close();
//   }
//   if (response.msg_type === 'tick') {
//     console.log(response.tick);
//   }
// };

// const subscribeTicks = () => {
//   connection.on('open', () => {
//     tickStream();
//   });

//   connection.on('message', tickResponse);
// };

// const unsubscribeTicks = () => {
//   connection.removeListener('message', tickResponse);
//   connection.close();
// };

// subscribeTicks();

// unsubscribeTicks();

import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });
const tickStream = () => api.subscribe({ ticks: 'R_100' });

const tickResponse = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    connection.removeEventListener('message', tickResponse, false);
    await api.disconnect();
  }
  if (data.msg_type === 'tick') {
    const tickContainer = document.querySelector('#tickContainer');
    tickContainer.textContent = `Tick: ${JSON.stringify(data.tick)}`;
  }
};

const subscribeTicks = async () => {
  await tickStream();
  connection.addEventListener('message', tickResponse);
};

const unsubscribeTicks = () => {
  connection.removeEventListener('message', tickResponse, false);
  tickStream().unsubscribe();
};

const ticks_button = document.querySelector('#ticks');
ticks_button.addEventListener('click', subscribeTicks);

const unsubscribe_ticks_button = document.querySelector('#ticks-unsubscribe');
unsubscribe_ticks_button.addEventListener('click', unsubscribeTicks);
