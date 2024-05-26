import React, { FC, FormEvent, useState } from "react";
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { InterfazTarea } from "../../types/tarea";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import { MdDone, MdDelete } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import cl from "./Tarea.module.scss";
import classNames from "classnames";
import { useActions } from "../../hooks/useActions";
import MyInput from "../InterfazGrafica/input/MyInput";
import { validate } from "../../utils/validacion";

interface TareaProps {
	tarea: InterfazTarea;
	index: number;
}

const Tarea: FC<TareaProps> = ({ tarea, index }) => {
	const { finalizarTarea, eliminarTarea, cambiarNombreTarea } = useActions();
	const [editMode, setEditMode] = useState(false);
	const [nombre_tarea, setCardTitle] = useState(tarea.nombre_tarea);

	const getStyle = (
		style: DraggingStyle | NotDraggingStyle | undefined,
		snapshot: DraggableStateSnapshot
	) => {
		if (!snapshot.isDropAnimating) {
			return style;
		}
		return {
			...style,
			transitionDuration: `0.02s`,
		};
	};

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(nombre_tarea)) {
			cambiarNombreTarea({ id: tarea.id, nombre_tarea: nombre_tarea });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditOpen = () => {
		if (!tarea.tareaFinalizada) setEditMode(true);
	};

	const handleEditClose = () => {
		setEditMode(false);
		setCardTitle(tarea.nombre_tarea);
	};

	const renderIconContainer = (): React.ReactNode => {
		return (
			<div className={cl.iconContainer}>
				<TiArrowBack className={classNames(cl.icon, cl.icon_return)} />
				<BotonPrincipal
					onClick={() =>
						eliminarTarea({
							id: tarea.id,
							tarjetaID: tarea.tarjetaID,
						})
					}
				>
					<MdDelete className={classNames(cl.icon, cl.icon_remove)} />
				</BotonPrincipal>
			</div>
		);
	};

	const renderTitleContainer = (): React.ReactNode => {
		return (
			<div className={cl.titleContainer}>
				<h3
					onClick={handleEditOpen}
					className={classNames(
						cl.tarea__title,
						tarea.tareaFinalizada ? "" : cl.tarea__title_hover
					)}
				>
					{tarea.nombre_tarea} 
				</h3>
				<BotonPrincipal
					className={cl.tarea__btn}
					onClick={() => finalizarTarea({ id: tarea.id })}
				>
					{tarea.tareaFinalizada ? (
						renderIconContainer()
					) : (
						<MdDone
							className={classNames(cl.icon, cl.icon_complete)}
						/>
					)}
				</BotonPrincipal>
			</div>
		);
	};

	return (
		<Draggable draggableId={tarea.id} index={index}>
			{(provided, snapshot) => (
				<div
					className={classNames(
						cl.tarea,
						tarea.tareaFinalizada ? cl.complete : ""
					)}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<div className={cl.tarea__inner}>
						{editMode ? (
							<form
								className={cl.tarea__form}
								onSubmit={handleChangeTitle}
							>
								<MyInput
									value={nombre_tarea}
									// eslint-disable-next-line jsx-a11y/no-autofocus
									autoFocus={true}
									onBlur={handleEditClose}
									onChange={setCardTitle}
									className={cl.tarea__input}
								/>
							</form>
						) : (
							renderTitleContainer()
						)}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Tarea;