import React, { useEffect, useState, useRef } from 'react';
import './SetTime.css';
function useOnClickOutside(ref, handler) {
	useEffect(
		() => {
			const listener = (event) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}
				handler(event);
			};
			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler]
	);
}

const SetTime = (props) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		if (props.restart) {
			return formatTimer(props.saveTime);
		}
	});
	const modalRef = useRef();
	useOnClickOutside(modalRef, () => props.setShowModal(false));

	const timeChangeHandler = (event) => {
		console.log(hours, minutes, seconds);
		event.preventDefault();
		let time = hours + minutes + seconds;
		props.setSaveTime(time);
		props.setTheClock(time);
		props.setShowModal(false);
		props.setRestart(true);
	};
	const restartTimeChangeHandler = (event) => {
		event.preventDefault();
		props.setSaveTime(props.saveTime);
		props.setTheClock(props.saveTime);
		props.setShowModal(false);
		props.setRestart(true);
	};
	const setTimeHandler = (event) => {
		if (props.restart) {
			resetRestart();
		}
		if (event.target.name === 'hours') {
			setHours(event.target.value * 3600);
		}
		if (event.target.name === 'minutes') {
			setMinutes(event.target.value * 60);
		}
		if (event.target.name === 'seconds') {
			setSeconds(event.target.value * 1);
		}
	};
	const formatTimer = (secs) => {
		const getHours = `${Math.floor(secs / (60 * 60))}`;
		const getMinutes = secs % (60 * 60);
		const minutes = `${Math.floor(getMinutes / 60)}`;
		const getSeconds = getMinutes % 60;
		const seconds = `${Math.ceil(getSeconds)}`;
		return [setHours(getHours), setMinutes(minutes), setSeconds(seconds)];
	};
	const resetRestart = (event) => {
		props.setRestart(false);
		setHours(0);
		setMinutes(0);
		setSeconds(0);
	};
	return (
		<div className='set-time-container' ref={modalRef}>
			<div className='form-title'>
				<h2>{props.restart ? 'Restart with same Time?' : 'Set your Time'}</h2>
			</div>
			<form
				className='set-time-form'
				onSubmit={(e) => {
					props.restart ? restartTimeChangeHandler(e) : timeChangeHandler(e);
				}}>
				<div className='set-time-inputs'>
					<div className='set-time-hours'>
						<p>Hours</p>
						<input
							type='number'
							name='hours'
							placeholder={props.restart ? hours : hours / 3600}
							min={0}
							onChange={(e) => setTimeHandler(e)}
						/>
					</div>
					<div className='set-time-minutes'>
						<p>Minutes</p>
						<input
							type='number'
							min={0}
							placeholder={props.restart ? minutes : minutes / 60}
							name='minutes'
							onChange={(e) => setTimeHandler(e)}
						/>
					</div>
					<div className='set-time-seconds'>
						<p>Seconds</p>
						<input
							type='number'
							name='seconds'
							min={0}
							placeholder={props.restart ? seconds : seconds}
							onChange={(e) => setTimeHandler(e)}
						/>
					</div>
				</div>
				<div className='set-time-submit'>
					<input
						type='submit'
						onSubmit={(e) => {
							props.restart
								? restartTimeChangeHandler(e)
								: timeChangeHandler(e);
						}}
						value={props.restart ? 'Yes' : 'Submit'}
					/>
					{props.restart && (
						<input
							type='submit'
							onClick={() => {
								resetRestart();
							}}
							value='No'
						/>
					)}
				</div>
			</form>
		</div>
	);
};

export default SetTime;
