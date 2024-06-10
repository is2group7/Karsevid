import React, { FC, useState, FormEvent } from "react";
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	Droppable,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { TiDelete } from "react-icons/ti";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { InterfazTarea } from "../../types/tarea";
import { InterfazTarjeta } from "../../types/tarjeta";
import { validate } from "../../utils/validacion";
import TareaForm from "../TareaForm/TareaForm"; 
import TareaList from "../TareaList/TareaList"; 
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./TarjetaItem.module.scss";

interface TarjetaItemProps {
	tarjeta: InterfazTarjeta;
	index: number;
}

const TarjetaItem: FC<TarjetaItemProps> = ({ tarjeta, index }) => {
	const { tareas } = useTypedSelector((state) => state.tarea);
	const [editMode, setEditMode] = useState(false);
	const [tarjetaNombre, setListTitle] = useState(tarjeta.nombre_tarjeta);
	const { eliminarTarjeta, eliminarTarea, cambiarNombreTarjeta } = useActions();
	const finalizarTarea = Object.entries(tareas).filter(
		([, tarea]) => tarea.tareaFinalizada && tarea.tarjetaID === tarjeta.id
	);

	const getStyle = (
		style: DraggingStyle | NotDraggingStyle | undefined,
		snapshot: DraggableStateSnapshot
	) => {
		if (!snapshot.isDropAnimating) {
			return style;
		}
		return {
			...style,
			transitionDuration: `0.001s`,
		};
	};

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(tarjetaNombre)) {
			cambiarNombreTarjeta({ id: tarjeta.id, nombre_tarjeta: tarjetaNombre });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditClose = () => {
		setEditMode(false);
		setListTitle(tarjeta.nombre_tarjeta);
	};

	const eliminarTareaFinalizadas = (tareas: [string, InterfazTarea][]) => {
		tareas.forEach(([, tarea]) =>
			eliminarTarea({ tarjetaID: tarea.tarjetaID, id: tarea.id })
		);
	};

	return (
		<div className={cl.tarjetaItem}>
			<Draggable draggableId={tarjeta.id} index={index}>
				{(provided, snapshot) => (
					<div
						className={cl.tarjetaItem__inner}
						{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}
						style={getStyle(
							provided.draggableProps.style,
							snapshot
						)}
					>
						<div className={cl.tarjetaItem__header}>
							<div
								className={cl.titleContainer}
								onClick={() => setEditMode(true)}
							>
								{editMode ? (
									<form
										className={cl.tarjetaItem__form}
										onSubmit={handleChangeTitle}
									>
										<MyInput
											value={tarjetaNombre}
											onBlur={handleEditClose}
											// eslint-disable-next-line jsx-a11y/no-autofocus
											autoFocus={true}
											onChange={setListTitle}
											className={cl.tarjetaItem__input}
										/>
									</form>
								) : (
									<h3 className={cl.tarjetaItem__title}>
										{tarjeta.nombre_tarjeta}																		
									</h3>
								)}
									<h6 className={cl.tarjetaItem__desc}>
										{tarjeta.descripcion}																		
									</h6>
							</div>


							<TiDelete
								className={cl.tarjetaItem__icon}
								onClick={() =>
									eliminarTarjeta({
										tableroID: tarjeta.tableroID,
										tarjetaID: tarjeta.id,
									})
								}
							/>

						</div>
						<Droppable droppableId={tarjeta.id} type="tarea">
							{(provided) => (
								<div
									className={cl.tarjetaItem__body}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{finalizarTarea.length > 0 && (
										<div>
											<BotonPrincipal
												className={cl.tarjetaItem__btn}
												onClick={() =>
													eliminarTareaFinalizadas(
														finalizarTarea
													)
												}
											>
												Eliminar tareas completadas
											</BotonPrincipal>
										</div>
									)}

									<TareaList tareaIDs={tarjeta.tareas} />
									{provided.placeholder}
									<TareaForm
										tableroID={tarjeta.tableroID}
										tarjetaID={tarjeta.id}
									/>
								</div>
							)}
						</Droppable>
					</div>
				)}
			</Draggable>
		</div>
	);
};

export default TarjetaItem;