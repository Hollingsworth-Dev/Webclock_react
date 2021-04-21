import React, { useEffect, useState } from 'react';
import './SetTime.css';

const SetTime = (props) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		if (props.restart) {
			return formatTimer(props.saveTime);
		}
	});

	const timeChangeHandler = (event) => {
		event.preventDefault();
		let time = hours + minutes + seconds;
		props.setSaveTime(time);
		props.setTheClock(time);
		props.setShowModal(false);
		props.setRestart(true);
	};
	const formatTimer = (secs) => {
		const getHours = `${Math.floor(secs / (60 * 60))}`;
		const getMinutes = secs % (60 * 60);
		const minutes = `${Math.floor(getMinutes / 60)}`;
		const getSeconds = getMinutes % 60;
		const seconds = `${Math.ceil(getSeconds)}`;
		return [setHours(getHours), setMinutes(minutes), setSeconds(seconds)];
	};
	return (
		<div className='set-time-container'>
			<div className='form-title'>
				<h2>{props.restart ? 'Restart with same Time?' : 'Set your Time'}</h2>
			</div>
			<form
				className='set-time-form'
				onSubmit={(e) => {
					timeChangeHandler(e);
				}}>
				<div className='set-time-inputs'>
					<div className='set-time-hours'>
						<p>Hours</p>
						<input
							type='number'
							name='hours'
							value={props.restart ? hours : hours / 3600}
							min={0}
							onChange={(e) => setHours(e.target.value * 3600)}
						/>
					</div>
					<div className='set-time-minutes'>
						<p>Minutes</p>
						<input
							type='number'
							min={0}
							value={props.restart ? minutes : minutes / 60}
							name='minutes'
							onChange={(e) => setMinutes(e.target.value * 60)}
						/>
					</div>
					<div className='set-time-seconds'>
						<p>Seconds</p>
						<input
							type='number'
							name='seconds'
							min={0}
							onChange={(e) => setSeconds(e.target.value * 1)}
						/>
					</div>
				</div>
				<div className='set-time-submit'>
					<input
						type='submit'
						onSubmit={(e) => {
							timeChangeHandler(e);
						}}
						value={props.restart ? 'Yes' : 'Submit'}
					/>
					{props.restart && (
						<input
							type='submit'
							onSubmit={(e) => {
								timeChangeHandler(e);
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
