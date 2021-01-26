import React from 'react';
import styles from './style.module.css'

function Home() {
    return (
      <div className={styles.main_container}>
        <div className={styles.container}>
          <div>
            <h1 className={styles.main_heading}>
              Welcome To <strong>VoteMe</strong>
            </h1>
          </div>
          <div>
            <p className={styles.p_}>
              Create your polls here and share the generated link to start
              voting
            </p>
          </div>
        </div>
      </div>
    );
}

export default Home
