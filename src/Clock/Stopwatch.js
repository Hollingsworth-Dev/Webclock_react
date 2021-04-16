import React, { useEffect, useState, useRef } from 'react';
import './Clock.css';
import UseTimer from '../Hook/UseTimer';
import { formatTime } from '../Utils/index';
const Stopwatch = (props) => {
	const {
		clock,
		isActive,
		isPaused,
		handleStart,
		handlePause,
		handleResume,
		handleReset,
	} = UseTimer(0);
	const [clockSwitch, setClockSwitch] = useState('Timer');
	const [showModal, setShowModal] = useState(false);

	const handleClockSwitch = () => {
		handleReset();
	};
	return (
		<div className='clock'>
			<div className='main'>
				<div className='timer'>
					<p>{formatTime(clock)}</p>
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

export default Stopwatch;
