import React, { useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyInput from '../../componentes/InterfazGrafica/input/MyInput';
import MyLabel from '../../componentes/InterfazGrafica/label/MyLabel';
import MyPointer from '../../componentes/InterfazGrafica/pointer/MyPointer';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && email && password) {
      const usuarioID = Date.now().toString();
      addUsuario({ id: usuarioID, nombre: inputValue, email, password });
      submitFormSuccess();
      setEmail('');
      setPassword('');
    } else {
      submitFormError();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MyLabel id="nombre">Nombre</MyLabel>
      <MyInput id="nombre" value={inputValue} onChange={setInputValue} />
      <MyLabel id="email">Email</MyLabel>
      <MyInput id="email" value={email} onChange={setEmail} />
      <MyLabel id="password">Password</MyLabel>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MyPointer isError={isError}>Todos los campos son obligatorios</MyPointer>
      <BotonPrincipal type="submit">Registrar</BotonPrincipal>
    </form>
  );
};

export default Register;
