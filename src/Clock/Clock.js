import React, { useEffect, useState, useRef } from 'react';
import './Clock.css';
const Clock = (props) => {
	const [clock, setClock] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [clockSwitch, setClockSwitch] = useState('Timer');
	const [showModal, setShowModal] = useState(false);
	const countRef = useRef(null);

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setClock((timer) => timer + 1);
		}, 1000);
	};

	const handlePause = () => {
		clearInterval(countRef.current);
		setIsPaused(false);
	};

	const handleResume = () => {
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setClock((timer) => timer + 1);
		}, 1000);
	};

	const handleReset = () => {
		clearInterval(countRef.current);
		setIsActive(false);
		setIsPaused(false);
		setClock(0);
	};
	const formatTime = () => {
		const getSeconds = `0${clock % 60}`.slice(-2);
		const minutes = `${Math.floor(clock / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(clock / 3600)}`.slice(-2);

		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};
	const handleClockSwitch = () => {
		handleReset();
	};
	return (
		<div className='clock'>
			<div className='main'>
				<div className='timer'>
					<p>{formatTime()}</p>
				</div>
				<div className='timer-buttons'>
					{!isActive && !isPaused ? (
						<div className='start-button' onClick={handleStart}>
							<p>Start</p>
						</div>
					) : isPaused ? (
						<div className='start-button' onClick={handlePause}>
							<p>Pause</p>
						</div>
					) : (
						<div className='start-button' onClick={handleResume}>
							<p>Resume</p>
						</div>
					)}
					<div className='clock-switch' onClick={handleClockSwitch}>
						<p>{clockSwitch}</p>
					</div>
					<div className='clear-button' onClick={handleReset}>
						<p>Clear</p>
					</div>
				</div>
			</div>
			{/* <div>
				<p>Set your timer</p>
			</div> */}
		</div>
	);
};

export default Clock;
