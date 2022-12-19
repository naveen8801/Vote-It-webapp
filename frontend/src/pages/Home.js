import React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import svg1 from './../assets/home.svg';
import ReactTypingEffect from 'react-typing-effect';

function Home() {
  return (
    <div className={styles.main_container}>
      <div className={styles.leftDiv}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.main_heading}>
              Welcome To{' '}
              <span style={{ fontSize: '60px' }}>
                <ReactTypingEffect
                  typingDelay="100"
                  cursor="_"
                  speed="300"
                  eraseSpeed="250"
                  eraseDelay="3000"
                  text={['Vote:It']}
                  cursorRenderer={(cursor) => <h1>{cursor}</h1>}
                  displayTextRenderer={(text, i) => {
                    return (
                      <h1>
                        {text.split(':')[0]} <span>{text.split(':')[1]}</span>
                      </h1>
                    );
                  }}
                />
              </span>
            </h2>
          </div>
          <div>
            <p className={styles.p_}>
              A smart tool to create various types of polls and quizes and
              easily generate a small link to share it with participants. Admin
              dashboards supports realtime interective charts for better
              understanding of participants.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-5 my-6">
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
      <div className={styles.rightDiv}>
        <div style={{ width: '80%' }}>
          <img src={svg1} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
