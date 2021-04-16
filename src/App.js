import './App.css';
import { useState } from 'react';
import Stopwatch from './Clock/Stopwatch';
import Timer from './Clock/Timer';
function App() {
	const [clockSwitch, setClockSwitch] = useState('Timer');
	const [showModal, setShowModal] = useState(false);
	return (
		<div className='App'>
			<Stopwatch
				clockSwitch={clockSwitch}
				showModal={showModal}
				setClockSwitch={setClockSwitch}
			/>
			{/* <Timer /> */}
		</div>
	);
}

export default App;
