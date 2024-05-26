import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { espacio } from "./espacios";
import "./styles/index.scss";

ReactDOM.render(
	<Provider store={espacio}>
		<App />
	</Provider>,

	document.getElementById("root")
);
