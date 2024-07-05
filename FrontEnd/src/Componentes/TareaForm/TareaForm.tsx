import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import MyPointer from "../InterfazGrafica/pointer/MyPointer";
import { validate } from "../../utils/validacion";
import cl from "./TareaForm.module.scss";

interface TareaFormProps {
    tableroID: string;
    tarjetaID: string;
}

const TareaForm: FC<TareaFormProps> = ({ tableroID, tarjetaID }) => {
    const [isOpen, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [descripcionValue, setDescripcionValue] = useState("");
	const [fechaVencimiento, setFechaVencimientoLocal] = useState("");
    const [maxMiniTareas, setMaxMiniTareas] = useState(5); 
    const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>([]);
    const { addTarea, submitFormSuccess, submitFormCancel, submitFormError } = useActions();
    const { isError } = useTypedSelector(state => state.form);

    const tablero = useTypedSelector(state => state.tablero.tableros[tableroID]);
    const espacioUsuariosIDs = useTypedSelector(state => state.espacio.espacios[tablero.espacioID]?.usuarios || []);
    const usuariosDetalles = useTypedSelector(state => state.usuario.usuarios);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate(inputValue) || !validate(descripcionValue)) {
            submitFormError();
            return;
        }

        addTarea({
            tableroID,
            tarjetaID,
            id: String(Date.now()),
            nombre_tarea: inputValue,
            descripcion: descripcionValue,
            fechaCreacion: new Date(),
            fechaVencimiento: new Date(fechaVencimiento),
            usuariosAsignado: selectedUsuarios,
            miniTareas: [],
            tareaFinalizada: false,
            maxMiniTareas,
        });

        submitFormSuccess();
        setInputValue("");
        setDescripcionValue("");
        setFechaVencimientoLocal("");
        setOpen(false);
    };

    const handleUsuarioChange = (usuarioID: string) => {
        setSelectedUsuarios(prev =>
            prev.includes(usuarioID) ? prev.filter(id => id !== usuarioID) : [...prev, usuarioID]
        );
    };

    return (
        <div className={cl.container}>
            {isOpen ? (
                <form className={cl.tareaForm} onSubmit={handleFormSubmit}>
                    <div className={cl.tareaForm__header}>
                        <MyPointer isError={isError}>Completa todos los campos</MyPointer>
                    </div>
                    <div className={cl.tareaForm__body}>
						<h5>Nombre Tarjeta</h5>
                        <MyInput
                            value={inputValue}
                            onChange={setInputValue}
                        />
						<h5>Descripcion</h5>
                        <MyInput
                            value={descripcionValue}
                            onChange={setDescripcionValue}
                        />
                        <label>
                            Fecha de Vencimiento
                            <input
                                type="date"
                                value={fechaVencimiento}
                                onChange={e => setFechaVencimientoLocal(e.target.value)}
                            />
                        </label>
                        <label>
                            Máximo de Mini Tareas
                            <input
                                type="number"
                                value={maxMiniTareas}
                                onChange={(e) => setMaxMiniTareas(Number(e.target.value))}
                                min="1"
                            />
                        </label>
                        <h3>Selecciona los usuarios asignados a la tarea:</h3>
                        {espacioUsuariosIDs.map(usuarioID => (
                            <label key={usuarioID}>
                                <input
                                    type="checkbox"
                                    value={usuarioID}
                                    checked={selectedUsuarios.includes(usuarioID)}
                                    onChange={() => handleUsuarioChange(usuarioID)}
                                />
                                {usuariosDetalles[usuarioID]?.nombre}
                            </label>
                        ))}
                    </div>
                    <div className={cl.tareaForm__footer}>
                        <BotonPrincipal type="submit">Aceptar</BotonPrincipal>
                        <BotonPrincipal onClick={() => setOpen(false)}>Cancelar</BotonPrincipal>
                    </div>
                </form>
            ) : (
                <BotonPrincipal onClick={() => setOpen(true)}>Agregar Nueva Tarea</BotonPrincipal>
            )}
        </div>
    );
};

export default TareaForm;
