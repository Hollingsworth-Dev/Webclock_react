import React, { Component } from 'react';
import UseTimer from '../Hook/UseTimer';
import { formatTime } from '../Utils/index';
class Timer extends Component {
	constructor() {
		super();
		this.state = { time: '00 : 00 : 00', seconds: 120 };
		this.timer = 0;
	}

	formatTime(secs) {
		const getHours = `0${Math.floor(secs / (60 * 60))}`.slice(-2);

		const getMinutes = secs % (60 * 60);
		const minutes = `0${Math.floor(getMinutes / 60)}`.slice(-2);

		const getSeconds = getMinutes % 60;
		const seconds = `0${Math.ceil(getSeconds)}`.slice(-2);

		return `${getHours} : ${minutes} : ${seconds}`;
	}

	componentDidMount() {
		let timeLeftVar = this.formatTime(this.state.seconds);
		this.setState({ time: timeLeftVar });
	}

	startTimer = () => {
		if (this.timer === 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	};

	countDown = () => {
		// Remove one second, set state so a re-render happens.
		let seconds = this.state.seconds - 1;
		this.setState({
			time: this.formatTime(seconds),
			seconds: seconds,
		});

		// Check if we're at zero.
		if (seconds === 0) {
			clearInterval(this.timer);
		}
	};

	render() {
		return (
			<div>
				<button onClick={this.startTimer}>Start</button>
				{this.state.time}
			</div>
		);
	}
}

export default Timer;
