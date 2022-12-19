import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './barchat.module.css';

import { GetPoll } from './../../api/index';

import CircularProgress from '@material-ui/core/CircularProgress';

import Pusher from 'pusher-js';

function Barchart(props) {
  const [poll, setpoll] = useState(null);
  const [chartdata, setchartdata] = useState({});
  const [loading, setloading] = useState(false);

  const pollID = props.id;

  const newFetch = () => {
    setloading(true);
    GetPoll(pollID)
      .then((res) => {
        const newdata = res.data;
        setpoll(newdata);
        const choices = newdata.choices;
        var labels = [];
        const chart_name = newdata.title;
        var data = [];
        var a = 0;
        for (a = 0; a < choices.length; a++) {
          labels[a] = choices[a].name;
          data[a] = choices[a].count;
        }
        const temp = {
          labels: labels,
          datasets: [
            {
              label: chart_name,
              data: data,
              backgroundColor: [
                '#845ec2',
                '#ffc75f',
                '#ff5e78',
                '#6ffc03',
                '#f70240',
                '#e6acbb',
                '#ecfc0a',
              ],
            },
          ],
        };
        setchartdata(temp);
      })
      .catch((error) => {
        console.log(error);
      });
    setloading(false);
  };

  const pusherData = () => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('cc27400a96c16f796300', {
      cluster: 'us3',
    });

    var channel = pusher.subscribe('polling');
    channel.bind('poll_created', function (data) {
      const choices = data.choices;
      var labels = [];
      const chart_name = data.title;
      var data = [];
      var a = 0;
      for (a = 0; a < choices.length; a++) {
        labels[a] = choices[a].name;
        data[a] = choices[a].count;
      }
      const temp = {
        labels: labels,
        datasets: [
          {
            label: chart_name,
            data: data,
            backgroundColor: [
              '#845ec2',
              '#ffc75f',
              '#ff5e78',
              '#6ffc03',
              '#f70240',
              '#e6acbb',
              '#ecfc0a',
            ],
          },
        ],
      };
      setchartdata(temp);
    });
  };

  useEffect(() => {
    newFetch();
    pusherData();
  }, []);

  return (
    <div className={styles.chart}>
      {!loading ? (
        <Bar
          data={chartdata}
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
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Barchart;
