import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RutasApp from "./componentes/AppRutas"; 
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { getState, setState } from "./utils/guardadoLocal"; 
import "./styles/App.scss"; 

const App: FC = () => {
	const { tableros } = useTypedSelector((state) => state.tablero);
	const { tarjetas } = useTypedSelector((state) => state.tarjeta);
	const { tareas } = useTypedSelector((state) => state.tarea);
	const { setTablero, setTarjeta, setTarea } = useActions();

	useEffect(() => {
		const localStorageCollection = getState();

		if (localStorageCollection) {
			const { tableros, tarjetas, tareas } = localStorageCollection;

			setTablero(tableros);
			setTarjeta(tarjetas);
			setTarea(tareas);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setState({ tableros, tarjetas, tareas });
	}, [tableros, tarjetas, tareas]);

	return (
		<div className="app">
			<BrowserRouter>
				<RutasApp/>
			</BrowserRouter>
		</div>
	);
};

export default App;
