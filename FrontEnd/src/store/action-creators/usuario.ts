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

export const eliminarUsuario = (usuarioID: { usuarioID: string }) => {
  return {
      type: UsuarioActionTypes.ELIMINAR_USUARIO,
      payload: usuarioID
  };
};

export const cambiarNombreUsuario = (usuario: { usuarioID: string; nombre: string }) => {
  return{
      type: UsuarioActionTypes.CAMBIAR_NOMBRE_USUARIO,
      payload: usuario
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

export const cambiarEmailUsuario = (usuario: { usuarioID: string; email: string }) => {
  return  {
      type: UsuarioActionTypes.CAMBIAR_EMAIL_USUARIO,
      payload: usuario
  };
};

export const cambiarPasswordUsuario = (usuario: { usuarioID: string; password: string }) => {
  return {
      type: UsuarioActionTypes.CAMBIAR_PASSWORD_USUARIO,
      payload: usuario
    };
};
