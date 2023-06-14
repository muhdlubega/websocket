import React, { useEffect } from 'react';
import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import { useParams } from 'react-router-dom';

const app_id = 1089;
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

const api = new DerivAPIBasic({ connection });

const Connection = () => {
    const { id } = useParams();

    const keepAlive = () => {
        api.subscribe({
          proposal: 1,
          subscribe: 1,
          amount: 10,
          basis: 'payout',
          contract_type: 'CALL',
          currency: 'USD',
          duration: 1,
          duration_unit: 'm',
          symbol: id,
          barrier: '+0.1',
        });
      };
      
      const keepAliveRes = async (res) => {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
          console.log('Error: %s ', data.error.message);
          connection.removeEventListener('message', keepAliveRes, false);
          await api.disconnect();
        } else if (data.msg_type === 'proposal') {
          console.log(data.proposal);
        } else if (data.msg_type === 'ping') {
          console.log('ping');
        }
      };
      
      const checkSignal = async () => {
        keepAlive();
        console.log(keepAlive);
        connection.addEventListener('message', keepAliveRes);
      };
      
      const endCall = () => {
        connection.removeEventListener('message', keepAliveRes, false);
        keepAlive().unsubscribe();
      };
    
      useEffect(() => {
        checkSignal();
        const keep_alive_button = document.querySelector('#keep_alive');
      keep_alive_button.addEventListener('click', checkSignal);
      
      const end_call_button = document.querySelector('#end_call');
      end_call_button.addEventListener('click', endCall);

      }, [])
      
  return (
    <div>
    <button hidden id="keep_alive" class="submitBtn">Keep Alive</button>
    <button hidden id="end_call" class="resetBtn">End Call</button>
    </div>
  )
}

export default Connection