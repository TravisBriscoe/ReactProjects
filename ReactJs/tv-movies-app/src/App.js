import React from "react";

import { useSelector } from "react-redux";
import { Container } from "@mui/material";

import { myMedia } from "./redux/slices/media";

import TmdbLogo from "./assets/tmdb.svg";

import "./App.scss";

function Header() {
	return (
		<header>
			<div>
				<h1>Movies and TV</h1>
				<h4>
					Search for Movies and TV Series via <img src={TmdbLogo} />
				</h4>
			</div>
			<div>
				<input type="text" placeholder="Search Here" />
			</div>
		</header>
	);
}

function Card(props) {
	return (
		<div className="card">
			<div className="card-background">
				<p>Picture Placeholder{props.picture}</p>
			</div>
			<p>{props.title}</p>
		</div>
	);
}

function Carousel({ data }) {
	return (
		<div className="carousel">
			{data.map((el) => {
				return <Card title={el.title} picture={el.img} />;
			})}
		</div>
	);
}

function App() {
	const media = useSelector(myMedia);

	const allMedia = [...media.media.movies, ...media.media.tvshows];

	return (
		<div>
			<Header />
			<div className="App">
				<Container>
					<Carousel data={allMedia} />
				</Container>
			</div>
		</div>
	);
}

export default App;

