export const formatTime = (clock) => {
	const getSeconds = `0${clock % 60}`.slice(-2);
	const minutes = `${Math.floor(clock / 60)}`;
	const getMinutes = `0${minutes % 60}`.slice(-2);
	const getHours = `0${Math.floor(clock / 3600)}`.slice(-2);

	return `${getHours} : ${getMinutes} : ${getSeconds}`;
};
