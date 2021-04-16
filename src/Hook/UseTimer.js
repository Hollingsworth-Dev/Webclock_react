import { useState, useRef } from 'react';

const UseTimer = (initialState = 0) => {
	const [clock, setClock] = useState(initialState);
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
	return {
		clock,
		isActive,
		isPaused,
		handleStart,
		handlePause,
		handleResume,
		handleReset,
	};
};

export default UseTimer;
