import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { chartDays } from '../config/data';
import CryptoButton from './Button';
ChartJS.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricalData(data.prices);
  }

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const destroyChart = () => {
    const charts = document.querySelectorAll('.chartjs-render-monitor');
    charts.forEach((chart) => chart.chart.destroy());
  };

  useEffect(() => {
    destroyChart();
  }, [historicalData]);

  if (!coin) {
    return null;
  }

  return (
    <div className="container" style={{flexGrow: 1, padding: 10}}>
      {historicalData 
      || !flag 
      ? (
        <div>
          <Line
            data={{
              labels: historicalData?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData?.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: 'darkorchid',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <CryptoButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  // setFlag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </CryptoButton>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CoinInfo;
