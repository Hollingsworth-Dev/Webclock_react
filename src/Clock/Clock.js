import React, { useState, useEffect } from 'react';
import './Clock.css';
import UseTimer from '../Hooks/UseTimer';
import { formatTimer, formatStopwatch } from '../Utils/index';
import SetTime from '../Modal/SetTime';
const Stopwatch = (props) => {
	useEffect(() => {
		if (clock === -1) {
			timeIsUp();
		}
		console.log(clock);
	});

	const [showModal, setShowModal] = useState(false);
	const [placeholder, setPlaceholder] = useState('00 : 00 : 00');
	const [restart, setRestart] = useState(true);
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

	const setTheClock = (time) => {
		setClock(time);
	};
	const modalHandler = () => {
		setShowModal(!showModal);
	};
	const switchClocks = (clock) => {
		handleReset();
		setType(clock);
	};
	const timeIsUp = () => {
		setPlaceholder("Time's Up!");
		handleReset();
		setTimeout(() => {
			setShowModal(true);
		}, 2000);
	};
	const handleTheStart = () => {
		handleStart();
	};

	return (
		<div className='clock'>
			<div className='main'>
				<div className='type-container'>
					<h2 className='type'>{type}</h2>
					{type === 'Timer' && (
						<div className='setTime-container' onClick={modalHandler}>
							<h2 className='setTime'>Set Time</h2>
						</div>
					)}
				</div>
				<div className='timer'>
					{clock > 0 && (
						<p>
							{type === 'stopwatch'
								? formatStopwatch(clock)
								: formatTimer(clock)}
						</p>
					)}
					{clock <= 0 && <p>{placeholder}</p>}
				</div>
				<div className='timer-buttons'>
					{!isActive && !isPaused ? (
						<div className='start-button' onClick={handleTheStart}>
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
								? () => switchClocks('Stopwatch')
								: () => switchClocks('Timer')
						}>
						<p>{type === 'Timer' ? 'Stopwatch' : 'Timer'}</p>
					</div>
					<div className='clear-button' onClick={handleReset}>
						<p>Clear</p>
					</div>
				</div>
			</div>
			{showModal && (
				<SetTime
					setTheClock={setTheClock}
					setShowModal={setShowModal}
					restart={restart}
				/>
			)}
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
