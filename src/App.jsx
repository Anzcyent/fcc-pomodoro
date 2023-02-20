import React, { Component } from "react";
import SetTimer from "./SetTimer";

const audio = document.getElementById("beep");

export class App extends Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
  }

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    interval: undefined,
    isPaused: true,
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  convertTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${minutes}:${seconds}`;
  };

  start_stop = () => {
    const { isPaused } = this.state;

    if (!isPaused) {
      clearInterval(this.interval);
      this.setState({
        isPaused: true,
      });
    } else {
      this.setState({ isPaused: false });
      this.interval = setInterval(() => {
        const { clockCount, currentTimer, breakCount, sessionCount } =
          this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });

          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };

  pause = () => {
    this.setState({
      isPaused: true,
    });

    clearInterval(this.interval);
  };

  reset = () => {
    clearInterval(this.interval);

    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      interval: undefined,
      isPaused: true,
    });

    audio.pause();
    audio.currentTime = 0;
  };

  handleBreakDecrease = () => {
    const { breakCount } = this.state;

    if (breakCount > 1) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };
  handleBreakIncrease = () => {
    const { breakCount } = this.state;

    if (breakCount < 60) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount, isPaused, currentTimer } = this.state;

    if (sessionCount > 1) {
      if (isPaused && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60
        })
      }
      this.setState({
        sessionCount: sessionCount - 1,
      });
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount, isPaused, currentTimer } = this.state;

    if (sessionCount < 60) {
      if (isPaused && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60
        })
      }
      this.setState({
        sessionCount: sessionCount + 1,
      });
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer, isPaused } =
      this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };

    return (
      <div className="app">
        <h1>Pomodoro App</h1>
        <div className="lengths">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="session">
          <h4 id="timer-label">{currentTimer}</h4>
          <span id="time-left">{this.convertTime(clockCount)}</span>
        </div>
        <div className="app-utils">
          <i
            onClick={this.start_stop}
            id="start_stop"
            className="fa-solid fa-play"
            style={{ color: `${isPaused ? "#fff" : "green"}` }}
          ></i>
          <i
            style={{ color: `${!isPaused ? "#fff" : "red"}` }}
            onClick={this.pause}
            className="fa-solid fa-pause"
          ></i>
          <i
            onClick={this.reset}
            id="reset"
            className="fa-solid fa-arrows-rotate"
          ></i>
        </div>
      </div>
    );
  }
}

export default App;
