import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RutasApp from "./componentes/AppRutas"; 
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Toaster } from 'react-hot-toast';
import { getState, setState } from "./utils/guardadoLocal"; 
import "./styles/App.scss"; 


const App: FC = () => {
	const { tableros } = useTypedSelector((state) => state.tablero);
	const { tarjetas } = useTypedSelector((state) => state.tarjeta);
	const { tareas } = useTypedSelector((state) => state.tarea);
	const { usuarios } = useTypedSelector((state) => state.usuario);
	const { espacios } = useTypedSelector((state) => state.espacio);
	const { miniTareas } = useTypedSelector((state) => state.miniTarea)
	const { setTablero, setTarjeta, setTarea, setUsuario, setEspacio, setMiniTarea } = useActions();

	useEffect(() => {
		const localStorageCollection = getState();

		if (localStorageCollection) {
			const { tableros, tarjetas, tareas, usuarios, espacios, miniTareas } = localStorageCollection;
			setTablero(tableros);
			setTarjeta(tarjetas);
			setTarea(tareas);
			setUsuario(usuarios);
			setEspacio(espacios);
			setMiniTarea(miniTareas);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setState({ tableros, tarjetas, tareas, usuarios, espacios, miniTareas});
	}, [tableros, tarjetas, tareas, usuarios, espacios, miniTareas]);

	return (
		<div className="app">
			<BrowserRouter>
				<RutasApp/>
			</BrowserRouter>
			<Toaster />
		</div>
	);
};

export default App;
