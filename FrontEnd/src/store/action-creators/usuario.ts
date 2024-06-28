import { UsuarioAction, UsuarioActionTypes, InterfazUsuario } from "../../types/usuario";
import api from '../../utils/api';

export const addUsuario = ({
  id: usuarioID,
  nombre,
  email,
  password,
}) => async (dispatch) => {
  const response = await api.post('/registro', {
    usuario: nombre,
    nombres: nombre,
    apellidos: nombre, 
    correo: email,
    password: password,
  });

  if (response.status === 200){
    console.log("No hubo error", response.data);
  }else{
    console.error("Hay error", response.data);
  }

  dispatch({
    type: UsuarioActionTypes.ADD_USUARIO,
    payload: { usuarioID: response.data.id, nombre, email, password },
  });
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
  usuario,
  password,
}) => async (dispatch) => {
  const response = await api.post('/autenticar', {
    usuario: usuario,
    password: password,
  });

  if (response.status === 200){
    if (response.data.codigo === 0){
      localStorage.setItem('session_id', response.data.mensaje);
      dispatch({
        type: UsuarioActionTypes.LOGIN_USUARIO,
        payload: { usuario, password },
      });
    }else{
      console.log("Credenciales inválidas!!");
    }
  }else{
    console.error("Hay error", response.data);
  }
};

export const logoutUsuario = (): UsuarioAction => {
  return { type: UsuarioActionTypes.LOGOUT_USUARIO };
};
