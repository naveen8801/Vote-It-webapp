import React from 'react';
import styles from './AllPollsCard.module.css';

function AllPollsCard({ title, timestamp, votes }) {
  return (
    <div className={styles.root}>
      <div>
        <h2>{title || 'title'}</h2>
        <p>{timestamp || 'test'}</p>
      </div>
      <div></div>
    </div>
  );
}

export default AllPollsCard;
