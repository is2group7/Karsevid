import { MiniTareaAction, MiniTareaActionTypes, EstadoMiniTarea } from "../../types/minitarea";

const initialState: EstadoMiniTarea = {
    miniTareas: {}
};

export const miniTareaReducer = (state = initialState, action: MiniTareaAction): EstadoMiniTarea => {
    switch (action.type) {
        case MiniTareaActionTypes.ADD_MINI_TAREA:
            return {
                ...state,
                miniTareas: {
                    ...state.miniTareas,
                    [action.payload.id]: action.payload
                }
            };
           
        case MiniTareaActionTypes.ELIMINAR_MINI_TAREA:
            const newMiniTareas = { ...state.miniTareas };
            delete newMiniTareas[action.payload.id];
            return {
                ...state,
                miniTareas: newMiniTareas
            };
        case MiniTareaActionTypes.FINALIZAR_MINI_TAREA:
            if (!state.miniTareas[action.payload.id]) {
                console.error("Intento de finalizar una miniTarea que no existe:", action.payload.id);
                return state; 
            }
            return {
                ...state,
                miniTareas: {
                    ...state.miniTareas,
                    [action.payload.id]: {
                        ...state.miniTareas[action.payload.id],
                        completada: !state.miniTareas[action.payload.id].completada
                    }
                }
            };
        case MiniTareaActionTypes.CAMBIAR_NOMBRE_MINI_TAREA:
            return {
                ...state,
                miniTareas: {
                    ...state.miniTareas,
                    [action.payload.id]: {
                        ...state.miniTareas[action.payload.id],
                        nombre: action.payload.nombre
                    }
                }
            };
        case MiniTareaActionTypes.SET_MINI_TAREA:
            return {
                ...state,
                miniTareas: action.payload
            };
                
        default:
            return state;
    }
};
