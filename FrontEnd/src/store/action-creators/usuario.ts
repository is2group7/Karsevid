import { UsuarioAction, UsuarioActionTypes, InterfazUsuario } from "../../types/usuario";

export const addUsuario = ({
  id: usuarioID,
  nombre,
  email,
  password,
}: {
  id: string;
  nombre: string;
  email: string;
  password: string;
}): UsuarioAction => {
  return {
    type: UsuarioActionTypes.ADD_USUARIO,
    payload: { usuarioID, nombre, email, password },
  };
};

export const eliminarUsuario = ({
  id: usuarioID,
}: {
  id: string;
}): UsuarioAction => {
  return { type: UsuarioActionTypes.ELIMINAR_USUARIO, payload: { usuarioID } };
};

export const cambiarNombreUsuario = ({
  id: usuarioID,
  nombre,
}: {
  id: string;
  nombre: string;
}): UsuarioAction => {
  return {
    type: UsuarioActionTypes.CAMBIAR_NOMBRE_USUARIO,
    payload: { usuarioID, nombre },
  };
};

export const setUsuario = (usuarios: { [usuarioID: string]: InterfazUsuario }): UsuarioAction => {
  return { type: UsuarioActionTypes.SET_USUARIO, payload: usuarios };
};

export const loginUsuario = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): UsuarioAction => {
  return {
    type: UsuarioActionTypes.LOGIN_USUARIO,
    payload: { email, password },
  };
};

export const logoutUsuario = (): UsuarioAction => {
  return { type: UsuarioActionTypes.LOGOUT_USUARIO };
};
