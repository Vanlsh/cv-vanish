import React from "react";
import "./Profile.css";
import Typical from "react-typical";
import ScrollService from "../../../utilities/ScrollService";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-detailes">
          <div className="colz">
            <div className="colz-icon">
              <a href="https://www.instagram.com/lyaroviy/">
                <img
                  className="icon"
                  src="./icon/instagram.png"
                  alt="Log"
                ></img>
              </a>
              <a href="https://t.me/vanlshPetrovich">
                <img className="icon" src="./icon/telegram.png" alt="Log"></img>
              </a>
              <a href="#">
                <img className="icon" src="./icon/facebook.png" alt="Log"></img>
              </a>
            </div>
          </div>
          <div className="profile-ditails-name">
            <span className="primery-text">
              {" "}
              Hello, I'm <span className="highlighted-text">Ivan</span>
            </span>
          </div>
          <div className="profile-ditails-role">
            <span className="primery-text">
              {" "}
              <h1>
                {" "}
                <Typical
                  loop={Infinity}
                  steps={[
                    "JavaScript",
                    1000,
                    "HTML",
                    1000,
                    "CSS",
                    1000,
                    "React.js",
                    1000,
                  ]}
                />
              </h1>
              <span className="profile-role-tagline">
                Knack of building applications with front end back end
                operations.
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button className="btn primary-btn"
            onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              {""}
              Hire me{" "}
            </button>
            <a href="ivan.pdf" download="Ivan ivan.pdf">
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}
