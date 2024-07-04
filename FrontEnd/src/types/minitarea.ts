export interface InterfazMiniTarea {
    id: string;
    tareaID: string;  
    nombre: string;
    descripcion: string;  
    completada: boolean;
}

export interface EstadoMiniTarea {
    miniTareas: {
        [id: string]: InterfazMiniTarea;
    };
}

interface SetMiniTareaAction {
    type: MiniTareaActionTypes.SET_MINI_TAREA;
    payload: { [id: string]: InterfazMiniTarea };
}

interface AddMiniTareaAction {
    type: MiniTareaActionTypes.ADD_MINI_TAREA;
    payload: InterfazMiniTarea;
}

interface EliminarMiniTareaAction {
    type: MiniTareaActionTypes.ELIMINAR_MINI_TAREA;
    payload: { id: string };
}

interface FinalizarMiniTareaAction {
    type: MiniTareaActionTypes.FINALIZAR_MINI_TAREA;
    payload: { id: string };
}

interface CambiarNombreMiniTareaAction {
    type: MiniTareaActionTypes.CAMBIAR_NOMBRE_MINI_TAREA;
    payload: { id: string; nombre: string };
}

export enum MiniTareaActionTypes {
    ADD_MINI_TAREA = "ADD_MINI_TAREA",
    ELIMINAR_MINI_TAREA = "ELIMINAR_MINI_TAREA",
    FINALIZAR_MINI_TAREA = "FINALIZAR_MINI_TAREA",
    CAMBIAR_NOMBRE_MINI_TAREA = "CAMBIAR_NOMBRE_MINI_TAREA",
    SET_MINI_TAREA = "SET_MINI_TAREA"
}

export type MiniTareaAction =
    | AddMiniTareaAction
    | EliminarMiniTareaAction
    | FinalizarMiniTareaAction
    | SetMiniTareaAction
    | CambiarNombreMiniTareaAction;
