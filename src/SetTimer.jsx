import React from "react";

const SetTimer = (props) => {
  const title = props.title.toLowerCase();
  return (
    <div className="timer-container">
      <span id={`${title}-label`}>{props.title}</span>
      <div className="timer-utils">
        <i
          onClick={props.handleIncrease}
          id={`${title}-increment`}
          className="fa-sharp fa-solid fa-caret-up"
        ></i>
        <span id={`${title}-length`} className="break-length-count">
          {props.count}
        </span>
        <i
          onClick={props.handleDecrease}
          id={`${title}-decrement`}
          className="fa-sharp fa-solid fa-caret-down"
        ></i>
      </div>
    </div>
  );
};

export default SetTimer;
