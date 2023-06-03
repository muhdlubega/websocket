import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

const app_id = 1089; // Replace with your app_id or leave the current test app_id.
const connection = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const contracts_for_symbol_request = {
  contracts_for: 'R_50',
  currency: 'USD',
  landing_company: 'svg',
  product_type: 'basic',
};

const contractsForSymbolResponse = async (res) => {
    const data = JSON.parse(res.data);
  
    if (data.error !== undefined) {
      console.log('Error : ', data.error?.message);
      connection.removeEventListener('message', contractsForSymbolResponse, false);
      await api.disconnect();
    }
  
    if (data.msg_type === 'contracts_for') {
      const contractsContainer = document.createElement('div');
  
      const contractElement = document.createElement('p');
      contractElement.textContent = `Contract: ${JSON.stringify(data.contracts_for)}`;
      contractsContainer.appendChild(contractElement);
      console.log(data.contracts_for);
  
      document.body.appendChild(contractsContainer);
    }
  
    connection.removeEventListener('message', contractsForSymbolResponse, false);
  };
  
  


const getContractsForSymbol = async () => {
  connection.addEventListener('message', contractsForSymbolResponse);
  await api.contractsFor(contracts_for_symbol_request);
};

const symbol_button = document.querySelector('#contractsForSymbol');
symbol_button.addEventListener('click', getContractsForSymbol);
