import React, { useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyInput from '../../componentes/InterfazGrafica/input/MyInput';
import MyLabel from '../../componentes/InterfazGrafica/label/MyLabel';
import MyPointer from '../../componentes/InterfazGrafica/pointer/MyPointer';
import cl from './Register.module.scss';
import { NavLink, useHistory} from "react-router-dom";

import ApiConexion from '../../Componentes/ApiConexion';
import toast, { Toaster } from 'react-hot-toast';

const Register: React.FC = () => {
  const { inputValue, isOpen, isError } = useTypedSelector(
    (state) => state.form
  );
  const {
    submitFormCancel,
    submitFormSuccess,
    openForm,
    setInputValue,
    submitFormError,
    addUsuario,
  } = useActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const requestRegister = async () => {
    const method = 'POST';
    const endpoint = 'registro';
    const requestBody = {
      usuario: inputValue,
      nombres: inputValue, 
      apellidos: inputValue,
      correo: email,
      password: password
    };

    console.log('Llamamos al api');
    return ApiConexion({ method, endpoint, requestBody });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && email && password) {
      try {
        const res = await requestRegister();
        console.log('Obtenemos del api: ' + res?.mensaje);
    
        if(res?.codigo === 0){
          toast('Usuario');
          <Toaster />
          submitFormSuccess();
          setEmail('');
          setPassword('');
          history.push('/');  
        }else{
          console.error('Ocurrió un error al registrar ' + res?.mensaje);
          submitFormError();
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        submitFormError();
      }
    } else {
      submitFormError();
    }
  };

  return (
    <div className={cl.contenedorGeneral}>
      <div className={cl.contenedorHeader}>
        <BotonPrincipal className={cl.header} type="button" onClick={() => submitFormCancel()}>
          <NavLink className={cl.link} to="/"><h2>Karsevid</h2></NavLink>
        </BotonPrincipal>
      </div>
      <div className={cl.contenedorRegistro}>
        <form onSubmit={handleSubmit}>
          <MyLabel id="nombre">Nombre</MyLabel>
          <MyInput id="nombre" value={inputValue} onChange={setInputValue} />
          <MyLabel id="email">Email</MyLabel>
          <MyInput id="email" value={email} onChange={setEmail} />
          <MyLabel id="password">Contraseña</MyLabel>
          <input
            id="password"
            type="password"
            value={password}
            className={cl.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MyPointer isError={isError}>Todos los campos son obligatorios</MyPointer>
          <BotonPrincipal className={cl.botonregistrar} type="submit">Registrar</BotonPrincipal>
        </form>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Register;
