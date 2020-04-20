import React, { useState } from 'react';
import './App.css';

function App() {
	const api = {
		key: 'c930f4568c289f398bc0d05493f32276',
		baseURL: 'https://api.openweathermap.org/data/2.5/'
	};

	const [ query, setQuery ] = useState('');
	const [ weather, setWeather ] = useState({});

	const searchWeather = (evt) => {
		if (evt.key === 'Enter') {
			const url = `${api.baseURL}weather?q=${query}&units=imperial&APPID=${api.key}`;
			fetch(url).then((res) => res.json()).then((result) => {
				setWeather(result);
				setQuery('');
				console.log(result);
			});
		}
	};

	const updateQuery = (e) => {
		setQuery(e.target.value);
	};

	const dateBuilder = (today) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

		let day = days[today.getDay()];
		let date = today.getDate();
		let month = months[today.getMonth()];
		let year = today.getFullYear();

		return `${day} ${month} ${date}, ${year}`;
	};

	return (
		<div className={typeof weather.main != 'undefined' ? weather.main.temp > 75 ? 'App.warm' : 'App' : 'App'}>
			<main>
				<div className='search-box'>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={searchWeather}
						type='text'
						className='search-bar'
						placeholder='Search...'
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className='location-box'>
							<div className='location'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='date'>{dateBuilder(new Date())}</div>
						</div>
						<div className='weather-box'>
							<div className='temp'>{Math.round(weather.main.temp)} °F</div>
							<div className='condition'>Cloudy</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
