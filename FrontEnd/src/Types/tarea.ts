import { IDragAndDrop } from "./dragAndDrop";


export interface InterfazTarea {
    tableroID: string;
    tarjetaID: string;
    id: string;
    nombre_tarea: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaVencimiento: Date;
    usuariosAsignado: string;
    miniTareas: string[];
    tareaFinalizada: boolean;
    maxMiniTareas: number;
}

export interface EstadoTarea {
	tareas: {
		[tareaID: string]: InterfazTarea;
	};
}

export enum TareaActionTypes {
	ADD_TAREA = "ADD_TAREA",
	ADD_MINI_TAREA = "ADD_MINI_TAREA",
	ELIMINAR_MINI_TAREA = "ELIMINAR_MINI_TAREA",
	UPDATE_MAX_MINI_TAREAS = "UPDATE_MAX_MINI_TAREAS",
	ELIMINAR_TAREA = "ELIMINAR_TAREA",
	FINALIZAR_TAREA = "FINALIZAR_TAREA",
	CAMBIAR_NOMBRE_TAREA = "CAMBIAR_NOMBRE_TAREA",
	SET_TAREA = "SET_TAREA",
	ELIMINAR_TARJETA = "ELIMINAR_TARJETA",
	ELIMINAR_TABLERO = "ELIMINAR_TABLERO",
	DRAG_DROP = "DRAG_DROP",
}

interface AddMiniTareaAction {
    type: TareaActionTypes.ADD_MINI_TAREA;
    payload: { tareaID: string; miniTareaID: string };
}

interface EliminarMiniTareaAction {
	type: TareaActionTypes.ELIMINAR_MINI_TAREA;
	payload: { tareaID: string; miniTareaID: string };
}

interface UpdateMaxMiniTareasAction {
    type: TareaActionTypes.UPDATE_MAX_MINI_TAREAS;
    payload: { tareaID: string; maxMiniTareas: number };
}

interface AddTareaAction {
	type: TareaActionTypes.ADD_TAREA;
	payload: {
		tableroID: string;
		tarjetaID: string;
		tareaID: string;
		nombre_tarea: string;
		descripcion: string;
		fechaCreacion: Date;
		fechaVencimiento: Date;
		usuariosAsignado: string;
		miniTareas: string[];
		tareaFinalizada: boolean;
		maxMiniTareas: number;
	};
}

interface EliminarTareaAction {
	type: TareaActionTypes.ELIMINAR_TAREA;
	payload: { tarjetaID: string; tareaID: string };
}

interface FinalizarTareaAction {
	type: TareaActionTypes.FINALIZAR_TAREA;
	payload: { tareaID: string };
}

interface CambiarNombreTareaAction {
	type: TareaActionTypes.CAMBIAR_NOMBRE_TAREA;
	payload: { tareaID: string; nombre_tarea: string };
}

interface SetTareaAction {
	type: TareaActionTypes.SET_TAREA;
	payload: { [tareaID: string]: InterfazTarea};
}

interface EliminarTarjetaAction {
	type: TareaActionTypes.ELIMINAR_TARJETA;
	payload: { tableroID: string; tarjetaID: string };
}

interface EliminarTableroAction {
	type: TareaActionTypes.ELIMINAR_TABLERO;
	payload: { tableroID: string };
}

interface DragAndDropAction {
	type: TareaActionTypes.DRAG_DROP;
	payload: IDragAndDrop;
}

export type TareaAction =
	| AddMiniTareaAction
	| UpdateMaxMiniTareasAction
	| EliminarMiniTareaAction
	| AddTareaAction
	| EliminarTareaAction
	| FinalizarTareaAction
	| CambiarNombreTareaAction
	| SetTareaAction
	| EliminarTarjetaAction
	| EliminarTableroAction
	| DragAndDropAction;