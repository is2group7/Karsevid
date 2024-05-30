import { IDragAndDrop } from "../../types/dragAndDrop";
import { InterfazTarjeta, TarjetaAction, TarjetaActionTypes } from "../../types/tarjeta";

export const addTarjeta = ({
	tableroID,
	id: tarjetaID,
	nombre_tarjeta,
}: {
	tableroID: string;
	id: string;
	nombre_tarjeta: string;
}): TarjetaAction => {
	return {
		type: TarjetaActionTypes.ADD_TARJETA,
		payload: { tableroID, tarjetaID, nombre_tarjeta },
	};
};

export const eliminarTarjeta = ({
	tableroID,
	id: tarjetaID,
}: {
	tableroID: string;
	id: string;
}): TarjetaAction => {
	return { type: TarjetaActionTypes.ELIMINAR_TARJETA, payload: { tableroID, tarjetaID } };
};

export const cambiarNombreTarjeta = ({
	id: tarjetaID,
	nombre_tarjeta,
}: {
	id: string;
	nombre_tarjeta: string;
}): TarjetaAction => {
	return {
		type: TarjetaActionTypes.CAMBIAR_NOMBRE_TARJETA,
		payload: { tarjetaID, nombre_tarjeta },
	};
};

export const setTarjeta = (tarjetas: { [tarjetaID: string]: InterfazTarjeta }): TarjetaAction => {
	return { type: TarjetaActionTypes.SET_TARJETA, payload: tarjetas };
};

export const eliminarTablero = ({ tableroID }: { tableroID: string }): TarjetaAction => {
	return { type: TarjetaActionTypes.ELIMINAR_TABLERO, payload: { tableroID } };
};

export const addTarea = ({
	tarjetaID,
	tareaID,
}: {
	tarjetaID: string;
	tareaID: string;
}): TarjetaAction => {
	return { type: TarjetaActionTypes.ADD_TAREA, payload: { tarjetaID, tareaID } };
};

export const eliminarTarea = ({
	tarjetaID,
	tareaID,
}: {
	tarjetaID: string;
	tareaID: string;
}): TarjetaAction => {
	return { type: TarjetaActionTypes.ELIMINAR_TAREA, payload: { tarjetaID, tareaID } };
};

export const dragAndDrop = ({
	droppableIdStart,
	droppableIdEnd,
	droppableIndexStart,
	droppableIndexEnd,
	draggableId,
	type,
	tableroID,
}: IDragAndDrop): TarjetaAction => {
	return {
		type: TarjetaActionTypes.DRAG_DROP,
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


