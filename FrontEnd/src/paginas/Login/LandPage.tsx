import React, { useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useHistory } from 'react-router-dom';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyInput from '../../componentes/InterfazGrafica/input/MyInput';
import MyLabel from '../../componentes/InterfazGrafica/label/MyLabel';
import MyPointer from '../../componentes/InterfazGrafica/pointer/MyPointer';

const PaginaPrincipal: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const { loginUsuario } = useActions();
  const currentUser = useTypedSelector((state) => state.usuario.currentUser);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario && password) {
      loginUsuario({ usuario, password });
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/tablero');
    }
  }, [currentUser, history]);

  return (
    <form onSubmit={handleSubmit}>
      <MyLabel id="usuario">Usuario</MyLabel>
      <MyInput id="usuario" value={usuario} onChange={setUsuario} />
      <MyLabel id="password">Password</MyLabel>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <MyPointer isError={isError}>Todos los campos son obligatorios</MyPointer>
      <BotonPrincipal type="submit">Login</BotonPrincipal>
    </form>
  );
};

export default PaginaPrincipal;
