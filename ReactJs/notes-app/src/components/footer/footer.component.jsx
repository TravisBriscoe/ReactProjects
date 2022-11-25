import React from "react";

import Button from "../button/button.component";

import "./footer.css";

// Functional footer component receiving props from main App.js

function Footer(props) {
	return (
		<footer className="footer">
			<p>
				&copy; 2022{" "}
				<a href="https://www.travisbriscoe.ca" rel="noreferrer" target="_blank">
					Travis Briscoe
				</a>
			</p>
			<p className="footer-nav">
				<Button
					onClick={() => {
						props.toggleIsNew();
						props.openModal();
					}}
				>
					new note
				</Button>
				<Button onClick={props.deleteAll}>delete all</Button>
			</p>
			<p>
				<a href="https://github.com/travisbriscoe/" rel="noreferrer" target="_blank">
					Github
				</a>
			</p>
		</footer>
	);
}

export default Footer;
