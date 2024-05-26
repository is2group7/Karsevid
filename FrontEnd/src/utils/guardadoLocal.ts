import { IntefazTablero } from "../types/tablero";
import { InterfazTarea } from "../types/tarea";
import { InterfazTarjeta } from "../types/tarjeta";

export const getState = () => {
	try {
		const stateCollection = localStorage.getItem("boardsCollection");

		if (stateCollection === null) {
			return undefined;
		}

		return JSON.parse(stateCollection);
	} catch (e) {
		return undefined;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setState = ({
	tableros,
	tarjetas,
	tareas,
}: {
	tableros: { [tableroID: string]: IntefazTablero };
	tarjetas: { [tarjetaID: string]: InterfazTarjeta };
	tareas: { [tareaID: string]: InterfazTarea };
}) => {
	try {
		const localStorageCollection = {
            tableros,
            tarjetas,
            tareas,
		};
		localStorage.setItem(
			"boardsCollection",
			JSON.stringify(localStorageCollection)
		);
	} catch (e) {
		throw e;
	}
};
