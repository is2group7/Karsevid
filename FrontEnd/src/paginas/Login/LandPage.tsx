import React, { useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useHistory, Link } from 'react-router-dom';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyPointer from '../../componentes/InterfazGrafica/pointer/MyPointer';
import cl from './PaginaInicio.module.scss';
import monigoteInicio from '../../../assets/monigoteInicio.svg';
import { NavLink } from "react-router-dom";


const PaginaPrincipal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const { loginUsuario, submitFormCancel } = useActions();
  const currentUser = useTypedSelector((state) => state.usuario.currentUser);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      loginUsuario({ email, password });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/espacios');
    }
  }, [currentUser, history]);

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
