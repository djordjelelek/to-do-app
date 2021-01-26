import React from "react";
import classes from "./Main.module.css";

const main = () => (
  <main className={classes.main}>
    <div className={classes.wrap}>
      <div className={classes.itemRow}>
        <label className={classes.checkFlag}>
          <span className={classes.checkFlagLabel}>Pick up drycleaning</span>
          <span className={classes.checkbox}>
            <input className={classes.checkboxNative} type="checkbox" />
            <span className={classes.checkmark}>
              <svg viewBox="0 0 24 24">
                <path
                  className={classes.checkmarkIcon}
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                ></path>
              </svg>
            </span>
          </span>
        </label>
      </div>

      <div className={classes.itemRow}>
        <label className={classes.checkFlag}>
          <span className={classes.checkFlagLabel}>rakija</span>
          <span className={classes.checkbox}>
            <input className={classes.checkboxNative} type="checkbox" />
            <span className={classes.checkmark}>
              <svg viewBox="0 0 24 24">
                <path
                  className={classes.checkmarkIcon}
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                ></path>
              </svg>
            </span>
          </span>
        </label>
      </div>

      <div className={classes.itemRow}>
        <label className={classes.checkFlag}>
          <span className={classes.checkFlagLabel}>danijela</span>
          <span className={classes.checkbox}>
            <input className={classes.checkboxNative} type="checkbox" />
            <span className={classes.checkmark}>
              <svg viewBox="0 0 24 24">
                <path
                  className={classes.checkmarkIcon}
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                ></path>
              </svg>
            </span>
          </span>
        </label>
      </div>
    </div>
  </main>
);

export default main;
