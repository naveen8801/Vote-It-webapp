import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './barchat.module.css';

import { GetPoll } from './../../api/index';

import CircularProgress from '@material-ui/core/CircularProgress';

import Pusher from 'pusher-js';

function Barchart(props) {
  const { chartData } = props;
  const [loading, setloading] = useState(false);

  return (
    <div className={styles.chart}>
      <Bar
        data={chartData}
        height={300}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default Barchart;
