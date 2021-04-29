import React from 'react';
import styles from './style.module.css';
import {Link} from 'react-router-dom';

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
            Create your polls here and share the generated link to start voting
          </p>
        </div>
      </div>
      <div className="container mx-auto px-5 my-6">
        <Link
          to="/"
          className="text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-10"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-10"
        >
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Create Poll
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
