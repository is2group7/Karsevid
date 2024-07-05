import React, { FC, useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import BotonPrincipal from '../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal';
import MyInput from '../../componentes/InterfazGrafica/input/MyInput';
import cl from './CrudUsuarios.module.scss';

const Usuarios: FC = () => {
    const { fetchUsuarios, addUsuario, updateUsuario, deleteUsuario } = useActions();
    const { usuarios } = useTypedSelector((state) => state.usuario);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [editingUserId, setEditingUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchUsuarios();
    }, [fetchUsuarios]);

    const handleAddOrUpdateUser = () => {
        if (editingUserId) {
            updateUsuario({ id: editingUserId, nombre, email });
        } else {
            addUsuario({ id: String(Date.now()), nombre, email });
        }
        setNombre('');
        setEmail('');
        setEditingUserId(null);
    };

    const handleEditUser = (userId: string) => {
        const user = usuarios[userId];
        setNombre(user.nombre);
        setEmail(user.email);
        setEditingUserId(userId);
    };

    const handleDeleteUser = (userId: string) => {
        deleteUsuario(userId);
    };

    return (
        <div className={cl.container}>
            <h1>Gestión de Usuarios</h1>
            <div className={cl.form}>
                <MyInput value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                <MyInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <BotonPrincipal onClick={handleAddOrUpdateUser}>
                    {editingUserId ? 'Actualizar Usuario' : 'Agregar Usuario'}
                </BotonPrincipal>
            </div>
            <div className={cl.list}>
                {Object.entries(usuarios).map(([userId, user]) => (
                    <div key={userId} className={cl.userItem}>
                        <span>{user.nombre}</span>
                        <span>{user.email}</span>
                        <BotonPrincipal onClick={() => handleEditUser(userId)}>Editar</BotonPrincipal>
                        <BotonPrincipal onClick={() => handleDeleteUser(userId)}>Eliminar</BotonPrincipal>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Usuarios;
