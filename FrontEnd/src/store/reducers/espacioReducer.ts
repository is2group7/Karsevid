import { EspacioActionTypes, EspacioAction, EspacioState } from "../../types/espacios";

const initialState: EspacioState = {
  espacios: {},
};

export const espacioReducer = (
  state = initialState,
  action: EspacioAction
): EspacioState => {
  switch (action.type) {
    case EspacioActionTypes.ADD_ESPACIO: {
      const { espacioID, nombre, owner, usuarios } = action.payload;
      const nuevoEspacio = {
        id: espacioID,
        nombre,
        owner,
        usuarios,
        tableros: [],
        active: true,
      };

      return {
        ...state,
        espacios: { ...state.espacios, [espacioID]: nuevoEspacio },
      };
    }
    case EspacioActionTypes.ELIMINAR_ESPACIO: {
      const { espacioID } = action.payload;
      const espacios = { ...state.espacios };

      delete espacios[espacioID];

      return { ...state, espacios };
    }

    case EspacioActionTypes.CAMBIAR_NOMBRE_ESPACIO: {
      const { espacioID, nombre } = action.payload;
      const espacio = state.espacios[espacioID];

      espacio.nombre = nombre;

      return { ...state, espacios: { ...state.espacios, [espacioID]: espacio } };
    }

    case EspacioActionTypes.SET_ESPACIO: {
      return { ...state, espacios: action.payload };
    }

    case EspacioActionTypes.ADD_TABLERO_TO_ESPACIO: {
      const { espacioID, tableroID } = action.payload;
      const espacio = state.espacios[espacioID];

      espacio.tableros.push(tableroID);

      return { ...state, espacios: { ...state.espacios, [espacioID]: espacio } };
    }

    case EspacioActionTypes.REMOVE_TABLERO_FROM_ESPACIO: {
      const { espacioID, tableroID } = action.payload;
      const espacio = state.espacios[espacioID];
      const nuevosTableros = espacio.tableros.filter((id) => id !== tableroID);
      espacio.tableros = nuevosTableros;

      return { ...state, espacios: { ...state.espacios, [espacioID]: espacio } };
    }

    default:
      return state;
  }
};
