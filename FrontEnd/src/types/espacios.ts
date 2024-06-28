export interface InterfazEspacio {
    id: string;
    nombre: string;
    owner: string;
    usuarios: string[];
    tableros: string[];
    active: boolean;
  }
  
  export interface EspacioState {
    espacios: {
      [espacioID: string]: InterfazEspacio;
    };
  }
  
  export enum EspacioActionTypes {
    ADD_ESPACIO = "ADD_ESPACIO",
    ELIMINAR_ESPACIO = "ELIMINAR_ESPACIO",
    CAMBIAR_NOMBRE_ESPACIO = "CAMBIAR_NOMBRE_ESPACIO",
    SET_ESPACIO = "SET_ESPACIO",
    ADD_TABLERO_TO_ESPACIO = "ADD_TABLERO_TO_ESPACIO",
    REMOVE_TABLERO_FROM_ESPACIO = "REMOVE_TABLERO_FROM_ESPACIO",
  }
  
  interface AddEspacioAction {
    type: EspacioActionTypes.ADD_ESPACIO;
    payload: { espacioID: string; nombre: string; owner: string; usuarios: string[] };
  }
  
  interface EliminarEspacioAction {
    type: EspacioActionTypes.ELIMINAR_ESPACIO;
    payload: { espacioID: string };
  }
  
  interface CambiarNombreEspacioAction {
    type: EspacioActionTypes.CAMBIAR_NOMBRE_ESPACIO;
    payload: { espacioID: string; nombre: string };
  }
  
  interface SetEspacioAction {
    type: EspacioActionTypes.SET_ESPACIO;
    payload: { [espacioID: string]: InterfazEspacio };
  }
  
  interface AddTableroToEspacioAction {
    type: EspacioActionTypes.ADD_TABLERO_TO_ESPACIO;
    payload: { espacioID: string; tableroID: string };
  }
  
  interface RemoveTableroFromEspacioAction {
    type: EspacioActionTypes.REMOVE_TABLERO_FROM_ESPACIO;
    payload: { espacioID: string; tableroID: string };
  }
  
  export type EspacioAction =
    | AddEspacioAction
    | EliminarEspacioAction
    | CambiarNombreEspacioAction
    | SetEspacioAction
    | AddTableroToEspacioAction
    | RemoveTableroFromEspacioAction;
  