import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './barchat.module.css';

function Barchart(props) {
  const { chartData } = props;

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
