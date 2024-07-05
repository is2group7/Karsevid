export interface InterfazUsuario {
    id: string;
    nombre: string;
    email: string;
    password: string;
  }
  
  export interface UsuarioState {
    usuarios: {
      [usuarioID: string]: InterfazUsuario;
    };
    currentUser: string | null;
  }
  
  export enum UsuarioActionTypes {
    ADD_USUARIO = "ADD_USUARIO",
    ELIMINAR_USUARIO = "ELIMINAR_USUARIO",
    CAMBIAR_NOMBRE_USUARIO = "CAMBIAR_NOMBRE_USUARIO",
    SET_USUARIO = "SET_USUARIO",
    LOGIN_USUARIO = "LOGIN_USUARIO",
    LOGOUT_USUARIO = "LOGOUT_USUARIO",
    CAMBIAR_EMAIL_USUARIO = "CAMBIAR_EMAIL_USUARIO",
    CAMBIAR_PASSWORD_USUARIO = "CAMBIAR_PASSWORD_USUARIO",
  }
  
  interface AddUsuarioAction {
    type: UsuarioActionTypes.ADD_USUARIO;
    payload: { usuarioID: string; nombre: string; email: string; password: string };
  }
  
  interface EliminarUsuarioAction {
    type: UsuarioActionTypes.ELIMINAR_USUARIO;
    payload: { usuarioID: string };
  }
  
  interface CambiarNombreUsuarioAction {
    type: UsuarioActionTypes.CAMBIAR_NOMBRE_USUARIO;
    payload: { usuarioID: string; nombre: string };
  }
  
  interface SetUsuarioAction {
    type: UsuarioActionTypes.SET_USUARIO;
    payload: { [usuarioID: string]: InterfazUsuario };
  }
  
  interface LoginUsuarioAction {
    type: UsuarioActionTypes.LOGIN_USUARIO;
    payload: { email: string; password: string };
  }
  
  interface LogoutUsuarioAction {
    type: UsuarioActionTypes.LOGOUT_USUARIO;
  }

  interface CambiarEmailUsuarioAction {
    type: UsuarioActionTypes.CAMBIAR_EMAIL_USUARIO;
    payload: { usuarioID: string; email: string };
  }
  
  interface CambiarPasswordUsuarioAction {
    type: UsuarioActionTypes.CAMBIAR_PASSWORD_USUARIO;
    payload: { usuarioID: string; password: string };
  }  

  export type UsuarioAction =
    | AddUsuarioAction
    | EliminarUsuarioAction
    | CambiarNombreUsuarioAction
    | SetUsuarioAction
    | CambiarEmailUsuarioAction
    | CambiarPasswordUsuarioAction
    | LoginUsuarioAction
    | LogoutUsuarioAction;
  