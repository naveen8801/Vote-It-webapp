import React from "react";
import svg from "./../assets/undraw_engineering_team.svg";
import githubIcon from "./../assets/github.svg";
import styles from "./style.module.css";

function AboutUs() {
  return (
    <div className={styles.main_container}>
      <div className={styles.leftDiv}>
        <div className={styles.container}>
          <h1 className={styles.main_heading}>About Us</h1>
          <p className={styles.p_}>
            We are young team of passionate and hardworking individauls. Always
            trying to make things easier and effective for rest of the world.
            Feel free to contribute to this project 🚀
          </p>
          <div style={{ marginTop: "2rem", fontSize: "18px" }}>
            <p
              onClick={(e) =>
                window.open(
                  "https://github.com/naveen8801/VoteMe-webapp",
                  "_blank"
                )
              }
              style={{ color: "blue" }}
            >
              Github
            </p>
          </div>
        </div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.imgwrapper}>
          <img src={svg} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
