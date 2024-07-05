import React, { useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useHistory, Link } from 'react-router-dom';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyPointer from '../../componentes/InterfazGrafica/pointer/MyPointer';
import cl from './PaginaInicio.module.scss';
import monigoteInicio from '../../../assets/monigoteInicio.svg';
import { NavLink } from "react-router-dom";
import ApiConexion from '../../Componentes/ApiConexion';
import { obtenerDatabag, guardarDatabag } from '../../Componentes/DatabagApi';

const PaginaPrincipal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const { loginUsuario, submitFormCancel } = useActions();
  const currentUser = useTypedSelector((state) => state.usuario.currentUser);
  const history = useHistory();

  const loginUser = async () => {
    const method = 'POST';
    const endpoint = 'autenticar';
    const requestBody = {
      email: email,
      password: password
    };

    console.log('Llamamos al api');
    return ApiConexion({ method, endpoint, requestBody });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      loginUsuario({email, password});
      console.log('Email: ' + email + ' password: ' + password);
      const res = await loginUser();

      if(res?.codigo === 0){
        // OBTENER STORAGE
        const resDatabag = await obtenerDatabag();
        console.log(resDatabag?.mensaje);

        // GUARDAR STORAGE
        const resSaveDatabag = await guardarDatabag();
        console.log(resDatabag?.codigo) // SI DA 0 es que guardó bien
        setIsError(false);
        history.push('/espacios');
      }else{
        setIsError(true);
      }

    } else {
      setIsError(true);
    }
  };

  return (
    <div className={cl.paginaPrincipal}>
      <BotonPrincipal className={cl.header} type="button" onClick={() => submitFormCancel()}>
        <NavLink className={cl.link} to="/"><h2>Karsevid</h2></NavLink>
      </BotonPrincipal>
      <div className={cl.contenedorPrincipal}>
        <div className={cl.container}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cl.MyInput}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cl.MyInput}
            />
          <MyPointer isError={isError}>Todos los campos son obligatorios</MyPointer>
          <button type="submit" className={cl.BotonPrincipal}>Ingresar</button>
          </form>
        </div>
        <div className={cl.mensajeRegistro}>
          <p>¿No tienes cuenta? <BotonPrincipal className={cl.openBtn}><NavLink className={cl.link} to="/registro">Regístrate</NavLink></BotonPrincipal></p>
          <div className={cl.svgContainer}>
              <img src={monigoteInicio} alt="SVG Image" style={{ width: '300px', height: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaginaPrincipal;
