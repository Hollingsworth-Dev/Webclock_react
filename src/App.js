import './App.css';
import { useState } from 'react';
import Clock from './Clock/Clock';

function App() {
	const [clockSwitch, setClockSwitch] = useState('Timer');
	const [showModal, setShowModal] = useState(false);
	return (
		<div className='App'>
			<Clock
				clockSwitch={clockSwitch}
				showModal={showModal}
				setClockSwitch={setClockSwitch}
			/>
			{/* <Timer /> */}
		</div>
	);
}

export default App;
