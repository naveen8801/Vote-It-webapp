import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetAllPolls } from '../api';
import AllPollsCard from '../components/AllPollsCard/AllPollsCard';
import moment from 'moment';

function AllPolls() {
  const [loading, setLoading] = useState(false);
  const [allPolls, setAllPolls] = useState([]);

  useEffect(() => {
    fetchAllPolls();
  }, []);

  const fetchAllPolls = async () => {
    setLoading(true);
    try {
      let res = await GetAllPolls();
      if (res.data) {
        setAllPolls(res.data);
      }
    } catch (error) {
      console.log(error);
      setAllPolls([]);
    }
    setLoading(false);
  };

  const getVotesCount = (item) => {
    let sum = 0;
    item?.choices?.map((choice) => (sum += choice.count));
    return sum;
  };

  return (
    <div
      style={{
        paddingBottom: '2rem',
        overflow: 'auto',
        height: 'calc(100vh - 80px)',
      }}
    >
      {loading ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <CircularProgress
              style={{ textAlign: 'center', display: 'inline-block' }}
            />
          </div>
        </>
      ) : (
        <>
          {allPolls.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '1rem',
                width: '100%',
              }}
            >
              {allPolls.map((item, i) => (
                <AllPollsCard
                  key={i}
                  title={item?.title}
                  timestamp={moment(item?.createdAt).fromNow()}
                  votes={`Votes : ${getVotesCount(item)}`}
                  desc={item?.description}
                  id={item?._id}
                />
              ))}
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '4rem',
                  height: '100%',
                }}
              >
                No Polls Found
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AllPolls;
