import { InterfazEspacio } from "../types/espacios";
import { IntefazTablero } from "../types/tablero";
import { InterfazTarea } from "../types/tarea";
import { InterfazTarjeta } from "../types/tarjeta";
import { InterfazUsuario } from "../types/usuario";
import { InterfazMiniTarea } from "../types/minitarea";

export const getState = () => {
	try {
		const stateCollection = localStorage.getItem("boardsCollection");

		if (stateCollection === null) {
			console.log('No se encontró ninguna colección en localStorage.');
			return undefined;
		}

		const parsedState = JSON.parse(stateCollection);
		console.log('Estado parseado de localStorage:', parsedState);
		return parsedState;
	} catch (e) {
		console.error('Error al obtener el estado de localStorage:', e);
		return undefined;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setState = ({
	tableros,
	tarjetas,
	tareas,
	usuarios,
	espacios,
	miniTareas,
}: {
	tableros: { [tableroID: string]: IntefazTablero };
	tarjetas: { [tarjetaID: string]: InterfazTarjeta };
	tareas: { [tareaID: string]: InterfazTarea };
	usuarios: {[usuarioID: string]: InterfazUsuario}
	espacios: {[espacioID: string]: InterfazEspacio}
	miniTareas: {[miniTareaID: string]: InterfazMiniTarea}
}) => {
	try {
		const localStorageCollection = {
            tableros,
            tarjetas,
            tareas,
			usuarios,
			espacios,
			miniTareas,
		};
		console.log('Estado que se va a guardar en localStorage:', localStorageCollection);
		localStorage.setItem(
			"boardsCollection",
			JSON.stringify(localStorageCollection)
		);
	} catch (e) {
		console.error('Error al guardar el estado en localStorage:', e);
		throw e;
	}
};
