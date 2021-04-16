import { useState, useRef } from 'react';
import { formatTimer } from '../Utils/index';

const UseTimer = (initialState) => {
	const [clock, setClock] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [type, setType] = useState('Timer');
	const countRef = useRef(null);

	const handleStart = () => {
		if (type === 'Stopwatch') {
			setIsActive(true);
			setIsPaused(true);
			countRef.current = setInterval(() => {
				setClock((timer) => timer + 1);
			}, 1000);
		} else {
			if (clock > 0) {
				setIsActive(true);
				setIsPaused(true);
				countRef.current = setInterval(() => {
					setClock((timer) => timer - 1);
				}, 1000);
			}
		}
	};

	const handlePause = () => {
		clearInterval(countRef.current);
		setIsPaused(false);
	};

	const handleResume = () => {
		setIsPaused(true);
		if (type === 'Stopwatch') {
			countRef.current = setInterval(() => {
				setClock((timer) => timer + 1);
			}, 1000);
		} else {
			countRef.current = setInterval(() => {
				setClock((timer) => timer - 1);
			}, 1000);
		}
	};

	const handleReset = () => {
		clearInterval(countRef.current);
		setIsActive(false);
		setIsPaused(false);
		setClock(0);
	};

	return {
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
	};
};

export default UseTimer;
