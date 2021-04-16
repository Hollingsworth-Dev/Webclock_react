import React, { useState } from 'react';
import './SetTime.css';

const SetTime = (props) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const timeChangeHandler = (event) => {
		event.preventDefault();
		let time = hours + minutes + seconds;
		props.setTheClock(time);
		props.setShowModal(false);
	};
	return (
		<div className='set-time-container'>
			<div className='form-title'>
				<h2>Set your Time</h2>
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
							onChange={(e) => setHours(e.target.value * 3600)}
						/>
					</div>
					<div className='set-time-minutes'>
						<p>Minutes</p>
						<input
							type='number'
							name='minutes'
							onChange={(e) => setMinutes(e.target.value * 60)}
						/>
					</div>
					<div className='set-time-seconds'>
						<p>Seconds</p>
						<input
							type='number'
							name='seconds'
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
						value='Submit'
					/>
				</div>
			</form>
		</div>
	);
};

export default SetTime;
