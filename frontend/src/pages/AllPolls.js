import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetAllPolls } from '../api';
import AllPollsCard from '../components/AllPollsCard/AllPollsCard';

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

  return (
    <div className={styles.main_container} style={{ paddingBottom: '1rem' }}>
      {loading ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '4rem',
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
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: '1rem',
                width: '100%',
              }}
            >
              {allPolls.map((item, i) => (
                <AllPollsCard />
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
