import { TareaAction, TareaActionTypes, InterfazTarea } from "../../types/tarea";
import { IDragAndDrop } from "../../types/dragAndDrop";

export const addTarea = ({
	tableroID,
	tarjetaID,
	id: tareaID,
	nombre_tarea,
}: InterfazTarea): TareaAction => {
	return {
		type: TareaActionTypes.ADD_TAREA,
		payload: { tableroID, tarjetaID, tareaID, nombre_tarea },
	};
};

export const eliminarTarea = ({
	tarjetaID,
	id: tareaID,
}: {
	tarjetaID: string;
	id: string;
}): TareaAction => {
	return {
		type: TareaActionTypes.ELIMINAR_TAREA,
		payload: { tarjetaID, tareaID },
	};
};

export const finalizarTarea = ({ id: tareaID }: { id: string }): TareaAction => {
	return { type: TareaActionTypes.FINALIZAR_TAREA, payload: { tareaID } };
};

export const cambiarNombreTarea = ({
	id: tareaID,
	nombre_tarea,
}: {
	id: string;
	nombre_tarea: string;
}): TareaAction => {
	return {
		type: TareaActionTypes.CAMBIAR_NOMBRE_TAREA,
		payload: { tareaID, nombre_tarea },
	};
};

export const setTarea = (tareas: { [tareaID: string]: InterfazTarea }): TareaAction => {
	return { type: TareaActionTypes.SET_TAREA, payload: tareas };
};

export const eliminarTarjeta = ({
	tableroID,
	tarjetaID,
}: {
	tableroID: string;
	tarjetaID: string;
}): TareaAction => {
	return { type: TareaActionTypes.ELIMINAR_TARJETA, payload: { tableroID, tarjetaID } };
};

export const eliminarTablero = ({ tableroID }: { tableroID: string }) => {
	return { type: TareaActionTypes.ELIMINAR_TABLERO, payload: { tableroID } };
};

export const dragAndDrop = ({
	droppableIdStart,
	droppableIdEnd,
	droppableIndexStart,
	droppableIndexEnd,
	draggableId,
	type,
	tableroID,
}: IDragAndDrop): TareaAction => {
	return {
		type: TareaActionTypes.DRAG_DROP,
		payload: {
			droppableIdStart,
			droppableIdEnd,
			droppableIndexStart,
			droppableIndexEnd,
			draggableId,
			type,
			tableroID,
		},
	};
};
