import React, { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import cl from './CrudUsuarios.module.scss';

const UsuariosCrud: React.FC = () => {
  const { usuarios, currentUser } = useTypedSelector((state) => state.usuario);
  const { addUsuario, eliminarUsuario, cambiarNombreUsuario, cambiarEmailUsuario, cambiarPasswordUsuario } = useActions();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editUsuarioID, setEditUsuarioID] = useState<string | null>(null);

  const handleAddUsuario = () => {
    const usuarioID = Date.now().toString();
    addUsuario({ id: usuarioID, nombre, email, password });
    toast.success('Usuario agregado exitosamente');
    setNombre('');
    setEmail('');
    setPassword('');
  };

  const handleEliminarUsuario = (usuarioID: string) => {
    if (usuarioID !== currentUser) {
      eliminarUsuario({ usuarioID });
      toast.success('Usuario eliminado exitosamente');
    } else {
      toast.error('No puedes eliminar el usuario actual.');
    }
  };

  const handleEditUsuario = (usuario: { id: string; nombre: string; email: string; password: string }) => {
    setEditMode(true);
    setEditUsuarioID(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword(usuario.password);
  };

  const handleSaveEditUsuario = () => {
    if (editUsuarioID) {
      cambiarNombreUsuario({ usuarioID: editUsuarioID, nombre });
      cambiarEmailUsuario({ usuarioID: editUsuarioID, email });
      cambiarPasswordUsuario({ usuarioID: editUsuarioID, password });
      toast.success('Usuario editado exitosamente');
      setEditMode(false);
      setEditUsuarioID(null);
      setNombre('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className={cl.container}>
      <Toaster />
      <h2>Gestión de Usuarios</h2>
      <div className={cl.formContainer}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {editMode ? (
          <button onClick={handleSaveEditUsuario}>Guardar Cambios</button>
        ) : (
          <button onClick={handleAddUsuario}>Agregar Usuario</button>
        )}
      </div>
      <ul className={cl.userList}>
        {Object.values(usuarios).map((usuario) => (
          <li key={usuario.id} className={cl.userListItem}>
            <p>{usuario.nombre}</p>
            <p>{usuario.email}</p>
            <button onClick={() => handleEditUsuario(usuario)}>Editar</button>
            <button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <Link to="/espacio">
        <BotonPrincipal type="button" className={cl.volver}>
          Volver a Espacio
        </BotonPrincipal>
      </Link>
    </div>
  );
};

export default UsuariosCrud;
