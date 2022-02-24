import React, { useState } from "react";
import { apikey, baseUrl } from "../data/Constants";
import "./searchForm.css";

const SearchForm = ({ onCityExist }) => {
	const [city, setCity] = useState("");

	const getCity = (cityName) => {
		const url = `${baseUrl}/locations/v1/search?apikey=${apikey}&q=${cityName}`;
		if (city) {
			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					if (res.length > 0) {
						const foundCity = res.find(
							(location) => location.Type === "City"
						);
						onCityExist({
							name: foundCity.EnglishName,
							country: foundCity.Country.ID,
							key: foundCity.Key,
						});
					} else {
						onCityExist({ undefined });
					}
				});
			setCity("");
		}
	};

	const handleClick = () => {
		getCity(city);
	};

	return (
		<div className="search_container">
			<input
				required
				placeholder="Please enter the city name!"
				value={city}
				onChange={(e) => setCity(e.target.value)}
			></input>
			<button onClick={handleClick}>Search City</button>
		</div>
	);
};

export default SearchForm;