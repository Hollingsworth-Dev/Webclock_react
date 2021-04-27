import React, { useState, useEffect } from 'react';
import './Clock.css';
import UseTimer from '../Hooks/UseTimer';
import { formatTimer, formatStopwatch } from '../Utils/index';
import SetTime from '../Modal/SetTime';

const soundUrl = new Audio(
	'https://mytimesounds.s3.amazonaws.com/myTimeSynthAlarm.m4a'
);

//creating a loop for the audio file
soundUrl.addEventListener(
	'ended',
	function () {
		soundUrl.currentTime = 0;
		soundUrl.play();
	},
	false
);

const Stopwatch = (props) => {
	useEffect(() => {
		if (clock === -1) {
			timeIsUp();
		}
	});

	const [showModal, setShowModal] = useState(false);
	const [placeholder, setPlaceholder] = useState('00 : 00 : 00');
	const [restart, setRestart] = useState(false);
	const [saveTime, setSaveTime] = useState(0);
	const [playAlarm, setPlayAlarm] = useState(false);

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
		soundUrl.play();

		setPlaceholder("Time's Up!");
		setPlayAlarm(true);
	};
	const stopAlarm = () => {
		setPlayAlarm(false);
		soundUrl.pause();
		soundUrl.currentTime = 0;
		handleReset();
		setTimeout(() => {
			setShowModal(true);
			setPlaceholder('00 : 00 : 00');
		}, 2000);
	};
	const handleTheStart = () => {
		handleStart();
	};
	const handleTheClear = () => {
		handleReset();
		setPlaceholder('00 : 00 : 00');
	};

	return (
		<div className='clock'>
			<div className='main'>
				<div className='type-container'>
					{!playAlarm && <h2 className='type'>{type}</h2>}
					{playAlarm && (
						<div className='stop-alarm' onClick={() => stopAlarm()}>
							<p>Stop Alarm</p>
						</div>
					)}
					{type === 'Timer' && !playAlarm && (
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
					<div className='clear-button' onClick={handleTheClear}>
						<p>Clear</p>
					</div>
				</div>
			</div>
			{showModal && (
				<SetTime
					setTheClock={setTheClock}
					setShowModal={setShowModal}
					restart={restart}
					saveTime={saveTime}
					setSaveTime={setSaveTime}
					setRestart={setRestart}
					playAlarm={playAlarm}
					setPlayAlarm={setPlayAlarm}
				/>
			)}
		</div>
	);
};

export default Stopwatch;
