import { IDragAndDrop } from "./dragAndDrop";

export interface IntefazTablero{
	id: string;
	nombre_tablero: string;
	tarjeta: string[];
}

export interface TableroState {
	// eslint-disable-next-line @typescript-eslint/ban-types
	tableros: {
		[tableroID: string]: IntefazTablero;
	};
}

export enum TableroActionTypes {
	ADD_TABLERO = "ADD_TABLERO",
	ELIMINAR_TABLERO = "ELIMINAR_TABLERO",
	CAMBIAR_NOMBRE_TABLERO = "CAMBIAR_NOMBRE_TABLERO",
	SET_TABLERO = "SET_TABLERO",
	ADD_TARJETA = "ADD_TARJETA",
	ELIMINAR_TARJETA = "ELIMINAR_TARJETA",
	DRAG_DROP = "DRAG_DROP",
}

interface AddTableroAction {
	type: TableroActionTypes.ADD_TABLERO;
	payload: { tableroID: string; nombre_tablero: string };
}

interface EliminarTableroAction {
	type: TableroActionTypes.ELIMINAR_TABLERO;
	payload: { tableroID: string };
}

interface CambiarNombreTableroAction {
	type: TableroActionTypes.CAMBIAR_NOMBRE_TABLERO;
	payload: { tableroID: string; nombre_tablero: string };
}

interface SetTableroAction {
	type: TableroActionTypes.SET_TABLERO;
	payload: { [tableroID: string]: IntefazTablero };
}

interface AddTarjetaAction {
	type: TableroActionTypes.ADD_TARJETA;
	payload: { tableroID: string; tarjetaID: string };
}

interface EliminarTarjetaAction {
	type: TableroActionTypes.ELIMINAR_TARJETA;
	payload: { tableroID: string; tarjetaID: string };
}

interface DragAndDropAction {
	type: TableroActionTypes.DRAG_DROP;
	payload: IDragAndDrop;
}

export type TableroAction =
	| AddTableroAction
	| EliminarTableroAction
	| CambiarNombreTableroAction
	| SetTableroAction
	| AddTarjetaAction
	| EliminarTarjetaAction
	| DragAndDropAction;