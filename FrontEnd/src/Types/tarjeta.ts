import { IDragAndDrop } from "./dragAndDrop";

export interface InterfazTarjeta {
	tableroID: string;
	id: string;
	nombre_tarjeta: string;
	tareas: string[];
}

export interface TarjetaState {
	tarjetas: {
		[tarjetaID: string]: InterfazTarjeta;
	};
}

export enum TarjetaActionTypes {
	ADD_TARJETA = "ADD_TARJETA",
	ELIMINAR_TARJETA = "ELIMINAR_TARJETA",
	CAMBIAR_NOMBRE_TARJETA = "CAMBIAR_NOMBRE_TARJETA",
	SET_TARJETA = "SET_TARJETA",
	ELIMINAR_TABLERO = "ELIMINAR_TABLERO",
	ADD_TAREA = "ADD_TAREA",
	ELIMINAR_TAREA = "ELIMINAR_TAREA",
	DRAG_DROP = "DRAG_DROP",
}

interface AddTarjetaAction {
	type: TarjetaActionTypes.ADD_TARJETA;
	payload: { tableroID: string; tarjetaID: string; nombre_tarjeta: string };
}

interface EliminarTarjetaAction {
	type: TarjetaActionTypes.ELIMINAR_TARJETA;
	payload: { tableroID: string; tarjetaID: string };
}

interface CambiarNombreTarjeta {
	type: TarjetaActionTypes.CAMBIAR_NOMBRE_TARJETA;
	payload: { tarjetaID: string; nombre_tarjeta: string };
}

interface SetTarjetaAction {
	type: TarjetaActionTypes.SET_TARJETA;
	payload: { [tarjetaID: string]: InterfazTarjeta };
}

interface EliminarTableroAction {
	type: TarjetaActionTypes.ELIMINAR_TABLERO;
	payload: { tableroID: string };
}

interface AddTareaAction {
	type: TarjetaActionTypes.ADD_TAREA;
	payload: { tarjetaID: string; tareaID: string };
}

interface EliminarTareaAction {
	type: TarjetaActionTypes.ELIMINAR_TAREA;
	payload: { tarjetaID: string; tareaID: string };
}

interface DragAndDropAction {
	type: TarjetaActionTypes.DRAG_DROP;
	payload: IDragAndDrop;
}

export type TarjetaAction =
	| AddTarjetaAction
	| EliminarTarjetaAction
	| CambiarNombreTarjeta
	| SetTarjetaAction
	| EliminarTableroAction
	| AddTareaAction
	| EliminarTareaAction
	| DragAndDropAction;
