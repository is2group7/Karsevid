import { TableroAction, TableroActionTypes, IntefazTablero } from "../../types/tablero";


export const addTablero = ({
	id: tableroID,
	nombre_tablero,
	espacioID
  }: {
	id: string;
	nombre_tablero: string;
	espacioID: string;
  }): TableroAction => {
	return { type: TableroActionTypes.ADD_TABLERO, payload: { tableroID, nombre_tablero, espacioID } };
  };


export const eliminarTablero = ({ tableroID }: { tableroID: string }): TableroAction => {
	return { type: TableroActionTypes.ELIMINAR_TABLERO, payload: { tableroID } };
};

export const cambiarNombreTablero = ({
	id: tableroID,
	nombre_tablero,
}: {
	id: string;
	nombre_tablero: string;
}): TableroAction => {
	return {
		type: TableroActionTypes.CAMBIAR_NOMBRE_TABLERO,
		payload: { tableroID, nombre_tablero },
	};
};

export const setTablero = (tableros: {
	[tableroID: string]: IntefazTablero;
}): TableroAction => {
	return { type: TableroActionTypes.SET_TABLERO, payload: tableros };
};

export const addTarjeta = ({
	tableroID,
	tarjetaID,
}: {
	tableroID: string;
	tarjetaID: string;
}): TableroAction => {
	return { type: TableroActionTypes.ADD_TARJETA, payload: { tableroID, tarjetaID } };
};

export const eliminarTarjeta = ({
	tableroID,
	tarjetaID,
}: {
	tableroID: string;
	tarjetaID: string;
}): TableroAction => {
	return { type: TableroActionTypes.ELIMINAR_TARJETA, payload: { tableroID, tarjetaID } };
};
