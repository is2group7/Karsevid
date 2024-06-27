import { EspacioAction, InterfazEspacio, EspacioActionTypes } from "../../types/espacios";

export const addEspacio = ({
  id: espacioID,
  nombre,
  owner,
  usuarios,
}: {
  id: string;
  nombre: string;
  owner: string;
  usuarios: string[];
}): EspacioAction => {
  return {
    type: EspacioActionTypes.ADD_ESPACIO,
    payload: { espacioID, nombre, owner, usuarios },
  };
};

export const eliminarEspacio = ({
  id: espacioID,
}: {
  id: string;
}): EspacioAction => {
  return { type: EspacioActionTypes.ELIMINAR_ESPACIO, payload: { espacioID } };
};

export const cambiarNombreEspacio = ({
  id: espacioID,
  nombre,
}: {
  id: string;
  nombre: string;
}): EspacioAction => {
  return {
    type: EspacioActionTypes.CAMBIAR_NOMBRE_ESPACIO,
    payload: { espacioID, nombre },
  };
};

export const setEspacio = (espacios: { [espacioID: string]: InterfazEspacio }): EspacioAction => {
  return { type: EspacioActionTypes.SET_ESPACIO, payload: espacios };
};

export const addTableroToEspacio = ({
  espacioID,
  tableroID,
}: {
  espacioID: string;
  tableroID: string;
}): EspacioAction => {
  return { type: EspacioActionTypes.ADD_TABLERO_TO_ESPACIO, payload: { espacioID, tableroID } };
};

export const removeTableroFromEspacio = ({
  espacioID,
  tableroID,
}: {
  espacioID: string;
  tableroID: string;
}): EspacioAction => {
  return { type: EspacioActionTypes.REMOVE_TABLERO_FROM_ESPACIO, payload: { espacioID, tableroID } };
};
