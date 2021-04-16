export const formatStopwatch = (clock) => {
	const getSeconds = `0${clock % 60}`.slice(-2);
	const minutes = `${Math.floor(clock / 60)}`;
	const getMinutes = `0${minutes % 60}`.slice(-2);
	const getHours = `0${Math.floor(clock / 3600)}`.slice(-2);

	return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const formatTimer = (secs) => {
	const getHours = `0${Math.floor(secs / (60 * 60))}`.slice(-2);
	const getMinutes = secs % (60 * 60);
	const minutes = `0${Math.floor(getMinutes / 60)}`.slice(-2);
	const getSeconds = getMinutes % 60;
	const seconds = `0${Math.ceil(getSeconds)}`.slice(-2);

	return `${getHours} : ${minutes} : ${seconds}`;
};
