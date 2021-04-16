import React, { useEffect, useState, useRef } from 'react';
import './Clock.css';
import UseTimer from '../Hooks/UseTimer';
import { formatTimer, formatStopwatch } from '../Utils/index';
import SetTime from '../Modal/SetTime';
const Stopwatch = (props) => {
	const [time, setTime] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const {
		clock,
		setClock,
		isActive,
		isPaused,
		type,
		setType,
		handleStart,
		handlePause,
		handleResume,
		handleReset,
	} = UseTimer();
	const handleClockSwitch = (clock) => {
		props.setClockSwitch(clock);
		handleReset();
	};
	const setTheClock = (event) => {
		event.preventDefault();
		setClock(time);
	};
	const modalHandler = () => {
		setShowModal(!showModal);
	};
	console.log(time);
	return (
		<div className='clock'>
			<div className='main'>
				<div className='type-container'>
					<h2 className='type'>{type}</h2>
					<div className='setTime-container' onClick={modalHandler}>
						<h2 className='setTime'>Set Time</h2>
					</div>
				</div>
				<div className='timer'>
					<p>
						{type === 'stopwatch' ? formatStopwatch(clock) : formatTimer(clock)}
					</p>
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
					<div
						className='clock-switch'
						onClick={
							type === 'Timer'
								? () => setType('Stopwatch')
								: () => setType('Timer')
						}>
						<p>{type === 'Timer' ? 'Stopwatch' : 'Timer'}</p>
					</div>
					<div className='clear-button' onClick={handleReset}>
						<p>Clear</p>
					</div>
				</div>
			</div>
			{showModal && <SetTime />}
			{/* <div>
				<p>Set your timer</p>
				<form onSubmit={setTheClock}>
					<input type='number' onChange={(e) => setTime(e.target.value)} />
				</form>
			</div> */}
		</div>
	);
};

export default Stopwatch;
