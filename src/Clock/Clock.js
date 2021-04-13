import React, { useEffect, useState, ReactDOM } from 'react';

const Clock = (props) => {
	const [clock, setClock] = useState(false);
	const [start, setStart] = useState('Start');

	return (
		<div>
			<div>
				<div onClick={() => setClock(true)}>{start}</div>
				<div>Clear</div>
			</div>
		</div>
	);
};

export default Clock;
