import { UsuarioActionTypes, UsuarioAction, UsuarioState } from "../../types/usuario";

const initialState: UsuarioState = {
  usuarios: {},
  currentUser: null,
};

export const usuarioReducer = (
  state = initialState,
  action: UsuarioAction
): UsuarioState => {
  switch (action.type) {
    case UsuarioActionTypes.ADD_USUARIO: {
      const { usuarioID, nombre, email, password } = action.payload;
      const nuevoUsuario = {
        id: usuarioID,
        nombre,
        email,
        password,
      };

      return {
        ...state,
        usuarios: { ...state.usuarios, [usuarioID]: nuevoUsuario },
      };
    }
    case UsuarioActionTypes.ELIMINAR_USUARIO: {
      const { usuarioID } = action.payload;
      const usuarios = { ...state.usuarios };

      delete usuarios[usuarioID];

      return { ...state, usuarios };
    }

    case UsuarioActionTypes.CAMBIAR_NOMBRE_USUARIO: {
      const { usuarioID, nombre } = action.payload;
      const usuario = state.usuarios[usuarioID];

      usuario.nombre = nombre;

      return { ...state, usuarios: { ...state.usuarios, [usuarioID]: usuario } };
    }

    case UsuarioActionTypes.SET_USUARIO: {
      return { ...state, usuarios: action.payload };
    }

    case UsuarioActionTypes.LOGIN_USUARIO: {
      const { email, password } = action.payload;
      const usuario = Object.values(state.usuarios).find(
        (user) => user.email === email && user.password === password
      );

      if (usuario) {
        return { ...state, currentUser: usuario.id };
      } else {
        return state;
      }
    }

    case UsuarioActionTypes.LOGOUT_USUARIO: {
      return { ...state, currentUser: null };
    }

    default:
      return state;
  }
};
