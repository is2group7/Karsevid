import React, { FC, FormEvent, useState, useEffect } from "react";
import { Draggable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { InterfazTarea } from "../../types/tarea";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import { MdDone, MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import cl from "./Tarea.module.scss";
import classNames from "classnames";
import { useActions } from "../../hooks/useActions";
import MyInput from "../InterfazGrafica/input/MyInput";
import { validate } from "../../utils/validacion";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MiniTareaList from "../../componentes/MiniTarea/MiniTareaList";
import MiniTareaForm from "../MiniTarea/MiniTareaForm";
import toast from 'react-hot-toast';

interface TareaProps {
    tarea: InterfazTarea;
    index: number;
}

const Tarea: FC<TareaProps> = ({ tarea, index }) => {
    const { finalizarTarea, eliminarTarea, cambiarNombreTarea } = useActions();
    const [editMode, setEditMode] = useState(false);
    const [nombre_tarea, setCardTitle] = useState(tarea.nombre_tarea);
    const [showDetails, setShowDetails] = useState(false);
    const usuarios = useTypedSelector(state => state.usuario.usuarios);

    const toggleDetails = () => setShowDetails(!showDetails);

    const getStyle = (style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot) => {
        return !snapshot.isDropAnimating ? style : {...style, transitionDuration: `0.02s`};
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES');

    const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate(nombre_tarea)) {
            cambiarNombreTarea({ id: tarea.id, nombre_tarea: nombre_tarea });
            setEditMode(false);
        }
    };

    const handleEditOpen = () => {
        if (!tarea.tareaFinalizada) setEditMode(true);
    };

    const handleEditClose = () => {
        setEditMode(false);
        setCardTitle(tarea.nombre_tarea);
    };

    
    const isOverdue = new Date(tarea.fechaVencimiento) < new Date();

    
    useEffect(() => {
        if (isOverdue) {
            toast.error(`La tarea "${tarea.nombre_tarea}" está vencida.`);
        }
    }, [isOverdue, tarea.nombre_tarea]);

    const renderActionButtons = () => (
        <div className={cl.actionContainer}>
            <BotonPrincipal onClick={() => finalizarTarea({ id: tarea.id })} className={cl.tarea_btn}>
                {tarea.tareaFinalizada ? <TiArrowBack /> : <MdDone />}
            </BotonPrincipal>
            <BotonPrincipal onClick={() => eliminarTarea({ id: tarea.id, tarjetaID: tarea.tarjetaID })}>
                <MdDelete />
            </BotonPrincipal>
        </div>
    );

    const renderTitleContainer = () => (
        <div className={cl.titleContainer}>
            <h3 onClick={handleEditOpen} className={classNames(cl.tarea__title, tarea.tareaFinalizada ? "" : cl.tarea_title_hover)}>
                {tarea.nombre_tarea}
            </h3>
            <BotonPrincipal onClick={toggleDetails} className={cl.detailsToggle}>
                {showDetails ? <MdExpandLess /> : <MdExpandMore />}
            </BotonPrincipal>
        </div>
    );

    return (
        <Draggable draggableId={tarea.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={classNames(
                        cl.tarea,
                        tarea.tareaFinalizada ? cl.complete : "",
                        isOverdue ? cl.overdue : ""
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                >
                    <div className={cl.tarea__inner}>
                        {editMode ? (
                            <form className={cl.tarea__form} onSubmit={handleChangeTitle}>
                                <MyInput autoFocus={true} value={nombre_tarea} onBlur={handleEditClose} onChange={setCardTitle} className={cl.tarea__input}/>
                            </form>
                        ) : (
                            <>
                                {renderTitleContainer()}
                                {showDetails && (
                                    <div className={cl.tarea__details}>
                                        <p>Descripción: {tarea.descripcion}</p>
                                        <p>Fecha de Vencimiento: {tarea.fechaVencimiento ? formatDate(String(tarea.fechaVencimiento)) : 'No definida'}</p>
                                        <div>
                                            <h4>Usuarios Asignados:</h4>
                                            <ul>
                                                {tarea.usuariosAsignado.map(id => (
                                                    <li key={id}>{usuarios[id]?.nombre}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <h4>MiniTareas:</h4>
                                        <MiniTareaList miniTareaIDs={tarea.miniTareas} />
                                        <MiniTareaForm tareaID={tarea.id} /> 
                                    </div>
                                )}
                                {renderActionButtons()}
                            </>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Tarea;
