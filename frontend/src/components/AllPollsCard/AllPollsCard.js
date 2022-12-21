import React from 'react';
import styles from './AllPollsCard.module.css';
import { Link, useHistory } from 'react-router-dom';

function AllPollsCard({ title, timestamp, votes, desc, id }) {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <header className="border-b border-gray-400 px-8 py-5 text-white-800">
        <div className={styles.flexbox}>
          <strong>
            <h1 className={styles.title}>{title || 'title'}</h1>
          </strong>
          <p className={styles.time}>{timestamp || 'test'}</p>
        </div>{' '}
      </header>
      <div className={styles.desc}>
        <p>{desc || 'This is Description'}</p>
      </div>
      <hr />
      <div
        className={styles.flexbox}
        style={{ padding: '0 2rem', marginTop: '0.5rem' }}
      >
        <strong>
          <h1 className={styles.title}>{votes || 'Votes : 0'}</h1>
        </strong>
        <button
          onClick={() => history.push(`/polls/${id}`)}
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default AllPollsCard;
