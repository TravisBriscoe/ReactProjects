import React from "react";
import ReactDOM from "react-dom/client";

import NoteApp from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<NoteApp />
	</React.StrictMode>
);