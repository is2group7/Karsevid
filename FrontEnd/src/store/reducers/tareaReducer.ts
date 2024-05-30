import { TareaAction, TareaActionTypes, EstadoTarea } from "../../types/tarea";

const initialState: EstadoTarea = {
	tareas: {},
};

export const tareaReducer = (
	state = initialState,
	action: TareaAction
): EstadoTarea => {
	switch (action.type) {
		case TareaActionTypes.ADD_TAREA: {
			const { tableroID, tarjetaID, tareaID, nombre_tarea } = action.payload;
			const nuevaTarea = {
				tableroID,
				tarjetaID,
				id: tareaID,
				nombre_tarea,
				tareaFinalizada: false,
			};

			return {
				...state,
				tareas: { ...state.tareas, [tareaID]: nuevaTarea },
			};
		}
		case TareaActionTypes.ELIMINAR_TAREA: {
			const { tarjetaID, tareaID } = action.payload;
			const tareas = { ...state.tareas };

			if (tareas[tareaID].tarjetaID === tarjetaID) delete tareas[tareaID];

			return { ...state, tareas };
		}
		case TareaActionTypes.FINALIZAR_TAREA: {
			const { tareaID } = action.payload;
			const tarea = state.tareas[tareaID];

			if (!tarea) return state;

			if (tarea.tareaFinalizada) tarea.tareaFinalizada = false;
			else tarea.tareaFinalizada = true;

			return { ...state, tareas: { ...state.tareas, [tareaID]: tarea } };
		}
		case TareaActionTypes.CAMBIAR_NOMBRE_TAREA: {
			const { tareaID, nombre_tarea } = action.payload;
			const tarea = state.tareas[tareaID];

			tarea.nombre_tarea = nombre_tarea;

			return {
				...state,
				tareas: {
					...state.tareas,
					[tareaID]: tarea,
				},
			};
		}

		case TareaActionTypes.SET_TAREA: {
			return { ...state, tareas: action.payload };
		}

		case TareaActionTypes.ELIMINAR_TARJETA: {
			const { tarjetaID } = action.payload;
			const nuevaTarea = Object.entries(state.tareas).filter(
				([tareaID, tarea]) => {
					if (tarea.tarjetaID !== tarjetaID) return [tareaID, tarea];
				}
			);

			return { ...state, tareas: Object.fromEntries(nuevaTarea) };
		}


		case TareaActionTypes.ELIMINAR_TABLERO: {
			const { tableroID } = action.payload;
			const nuevaTarea = Object.entries(state.tareas).filter(
				([tareaID, tarea]) => {
					if (tarea.tableroID !== tableroID) return [tareaID, tarea];
				}
			);

			return { ...state, tareas: Object.fromEntries(nuevaTarea) };
		}

		case TareaActionTypes.DRAG_DROP: {
			const { droppableIdStart, droppableIdEnd, draggableId, type } =
				action.payload;

			if (type !== "tarea") return state;
			if (droppableIdStart === droppableIdEnd) return state;

			const TareaAjustada = state.tareas[draggableId];
			TareaAjustada.tarjetaID = droppableIdEnd;

			return {
				...state,
				tareas: { ...state.tareas, [draggableId]: TareaAjustada },
			};
		}
		default:
			return state;
	}
};