import { MiniTareaAction, MiniTareaActionTypes, InterfazMiniTarea } from "../../types/minitarea";

export const addMiniTarea = (miniTarea: InterfazMiniTarea): MiniTareaAction => ({
    type: MiniTareaActionTypes.ADD_MINI_TAREA,
    payload: miniTarea
});

export const eliminarMiniTarea = (id: string): MiniTareaAction => ({
    type: MiniTareaActionTypes.ELIMINAR_MINI_TAREA,
    payload: { id }
});

export const finalizarMiniTarea = (id: string): MiniTareaAction => ({
    type: MiniTareaActionTypes.FINALIZAR_MINI_TAREA,
    payload: { id }
});

export const cambiarNombreMiniTarea = ({ id, nombre }: { id: string; nombre: string }): MiniTareaAction => ({
    type: MiniTareaActionTypes.CAMBIAR_NOMBRE_MINI_TAREA,
    payload: { id, nombre }
});

export const setMiniTarea = (miniTareas: { [id: string]: InterfazMiniTarea }): MiniTareaAction => ({
    type: MiniTareaActionTypes.SET_MINI_TAREA,
    payload: miniTareas
});