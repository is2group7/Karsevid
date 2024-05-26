import React from "react";
import { routes } from "../rutas/index" 
import { Switch, Route, Redirect } from "react-router";

const RutasApp = () => {
	return (
		<Switch>
			{routes.map((route) => (
				<Route
					key={route.path}
					component={route.component}
					path={route.path}
					exact={route.correcta}
				/>
			))}
			<Redirect to="/" />
		</Switch>
	);
};

export default RutasApp;