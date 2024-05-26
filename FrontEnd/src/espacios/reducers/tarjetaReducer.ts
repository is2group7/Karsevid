import { TarjetaActionTypes, TarjetaAction, TarjetaState } from "../../types/tarjeta";

const initialState: TarjetaState = {
	tarjetas: {},
};

export const tarjetaReducer = (
	state = initialState,
	action: TarjetaAction
): TarjetaState => {
	switch (action.type) {
		case TarjetaActionTypes.ADD_TARJETA: {
			const { tableroID, tarjetaID, nombre_tarjeta } = action.payload;
			const nuevaTarjeta = {
				tableroID,
				id: tarjetaID,
				nombre_tarjeta,
				tareas: [],
			};

			return {
				...state,
				tarjetas: { ...state.tarjetas, [tarjetaID]: nuevaTarjeta },
			};
		}
		case TarjetaActionTypes.ELIMINAR_TARJETA: {
			const { tarjetaID } = action.payload;
			const tarjetas = { ...state.tarjetas };

			delete tarjetas [tarjetaID];

			return { ...state, tarjetas };
		}

		case TarjetaActionTypes.CAMBIAR_NOMBRE_TARJETA: {
			const { tarjetaID, nombre_tarjeta } = action.payload;
			const tarjeta = state.tarjetas[tarjetaID];

			tarjeta.nombre_tarjeta = nombre_tarjeta;

			return { ...state, tarjetas: { ...state.tarjetas, [tarjetaID]: tarjeta } };
		}

		case TarjetaActionTypes.SET_TARJETA: {
			return { ...state, tarjetas: action.payload };
		}

		case TarjetaActionTypes.ELIMINAR_TABLERO: {
			const { tableroID } = action.payload;
			const nuevaTarjeta = Object.entries(state.tarjetas).filter(
				([tarjetaID, tarjeta]) => {
					if (tarjeta.tableroID !== tableroID) return [tarjetaID, tarjeta];
				}
			);

			return { ...state, tarjetas: Object.fromEntries(nuevaTarjeta) };
		}

		case TarjetaActionTypes.ADD_TAREA: {
			const { tarjetaID, tareaID } = action.payload;
			const tarjeta = state.tarjetas[tarjetaID];

			 tarjeta.tareas.push(tareaID);

			return { ...state, tarjetas: { ...state.tarjetas, [tarjetaID]: tarjeta } };
		}

		case TarjetaActionTypes.ELIMINAR_TAREA: {
			const { tarjetaID, tareaID } = action.payload;
			const tarjeta = state.tarjetas[tarjetaID];
			const nuevaTarea = tarjeta.tareas.filter((tarea) => tarea !== tareaID);
			tarjeta.tareas = nuevaTarea;

			return { ...state, tarjetas: { ...state.tarjetas, [tarjetaID]: tarjeta } };
		}
		case TarjetaActionTypes.DRAG_DROP: {
			const {
				droppableIdStart,
				droppableIdEnd,
				droppableIndexStart,
				droppableIndexEnd,
				type,
			} = action.payload;

			if (type === "tarjeta") return state;

			if (droppableIdStart === droppableIdEnd) {
				const tarjeta = state.tarjetas[droppableIdStart];
				const [TareaAjustada] = tarjeta.tareas.splice(
					droppableIndexStart,
					1
				);

				tarjeta.tareas.splice(droppableIndexEnd, 0, TareaAjustada);

				return {
					...state,
					tarjetas: { ...state.tarjetas, [droppableIdStart]: tarjeta },
				};
			} else {
				const pos_inicialTarjeta = state.tarjetas[droppableIdStart];
				const pos_finalTarjeta = state.tarjetas[droppableIdEnd];
				const [TareaAjustada] = pos_inicialTarjeta.tareas.splice(
					droppableIndexStart,
					1
				);
				pos_finalTarjeta.tareas.splice(droppableIndexEnd, 0, TareaAjustada);

				return {
					...state,
					tarjetas: {
						...state.tarjetas,
						[droppableIdStart]: pos_inicialTarjeta,
						[droppableIdEnd]: pos_finalTarjeta,
					},
				};
			}
		}
		default:
			return state;
	}
};

