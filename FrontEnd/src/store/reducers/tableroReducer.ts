import { table } from "console";
import { TableroAction, TableroActionTypes, TableroState } from "../../types/tablero";

const initialState: TableroState = {
	tableros: {},
};

export const tableroReducer = (
	estado = initialState,
	action: TableroAction
): TableroState => {
	switch (action.type) {
		case TableroActionTypes.ADD_TABLERO: {
			const { tableroID, nombre_tablero, espacioID } = action.payload;
			const nuevoTablero = {
			  id: tableroID,
			  nombre_tablero,
			  tarjeta: [],
			  espacioID, 
			};
	  
			return {
			  ...estado,
			  tableros: { ...estado.tableros, [tableroID]: nuevoTablero },
			};
		  }

		case TableroActionTypes.ELIMINAR_TABLERO: {
			const { tableroID } = action.payload;
			const tableros = { ...estado.tableros };

			delete tableros[tableroID];

			return { ...estado, tableros };
		}

		case TableroActionTypes.CAMBIAR_NOMBRE_TABLERO: {
			const { tableroID, nombre_tablero } = action.payload;
			const tableros = estado.tableros[tableroID];

			tableros.nombre_tablero = nombre_tablero;

			return { ...estado, tableros: { ...estado.tableros, [tableroID]: tableros } };
		}

		case TableroActionTypes.SET_TABLERO: {
			return { ...estado, tableros: action.payload };
		}

		case TableroActionTypes.ADD_TARJETA: {
			const { tableroID, tarjetaID } = action.payload;
			const tablero = estado.tableros[tableroID];

			tablero.tarjeta.push(tarjetaID);

			return {
				...estado,
				tableros: {
					...estado.tableros,
					[tableroID]: tablero,
				},
			};
		}

		case TableroActionTypes.ELIMINAR_TARJETA: {
			const { tableroID, tarjetaID } = action.payload;
			const tablero = estado.tableros[tableroID];
			const nuevaTarjeta = tablero.tarjeta.filter((tarjeta) => tarjeta !== tarjetaID);
			tablero.tarjeta = nuevaTarjeta;

			return { ...estado, tableros: { ...estado.tableros, [tableroID]: tablero } };
		}
		case TableroActionTypes.DRAG_DROP: {
			const { tableroID, type, droppableIndexStart, droppableIndexEnd } =
				action.payload;

			if (type !== "tarjeta") return estado;

			const tablero = estado.tableros[tableroID];
			const tarjetas = tablero.tarjeta;
			const [TarjetaAjustada] = tarjetas.splice(droppableIndexStart, 1);

			tarjetas.splice(droppableIndexEnd, 0, TarjetaAjustada);
			tablero.tarjeta = tarjetas;

			return { ...estado, tableros: { ...estado.tableros, [tableroID]: tablero } };
		}
		default:
			return estado;
	}
};