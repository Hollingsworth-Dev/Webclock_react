import React, { useEffect, useState, useRef } from 'react';

const Clock = (props) => {
	const [clock, setClock] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
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
	return (
		<div>
			<div>
				<div>
					<p>{formatTime()}</p>
				</div>
				<div>
					{!isActive && !isPaused ? (
						<div onClick={handleStart}>Start</div>
					) : isPaused ? (
						<div onClick={handlePause}>Pause</div>
					) : (
						<div onClick={handleResume}>Resume</div>
					)}
					<div onClick={handleReset}>Clear</div>
				</div>
			</div>
		</div>
	);
};

export default Clock;
