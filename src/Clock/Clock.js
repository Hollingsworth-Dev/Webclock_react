import React, { useEffect, useState, ReactDOM } from 'react';

const Clock = (props) => {
	const [clock, setClock] = useState();
	return (
		<div>
			<div>{props.date.toLocaleTimeString()}</div>
		</div>
	);
};

const Ticker = () => {
	return (
		<div>
			<Clock date={new Date()} />
		</div>
	);
};

export default Ticker;
