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
  
  export type UsuarioAction =
    | AddUsuarioAction
    | EliminarUsuarioAction
    | CambiarNombreUsuarioAction
    | SetUsuarioAction
    | LoginUsuarioAction
    | LogoutUsuarioAction;
  