import React, { FC, FormEvent, useState } from "react";
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { InterfazMiniTarea } from "../../types/minitarea"; 
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import { MdDone, MdDelete } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import cl from "./css/MiniTarea.module.scss"; 
import classNames from "classnames";
import { useActions } from "../../hooks/useActions";
import MyInput from "../InterfazGrafica/input/MyInput";
import { validate } from "../../utils/validacion";

interface MiniTareaProps {
	miniTarea: InterfazMiniTarea;
	index: number;
}

const MiniTarea: FC<MiniTareaProps> = ({ miniTarea, index }) => {
	const { finalizarMiniTarea, eliminarMiniTarea, cambiarNombreMiniTarea } = useActions();
	const [editMode, setEditMode] = useState(false);
	const [nombre_mt, setNombre] = useState(miniTarea.nombre);


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
		event.preventDefault();
		if (validate(nombre_mt)) {
			cambiarNombreMiniTarea({ id: miniTarea.id, nombre: nombre_mt });
			setEditMode(false);
		}
	};

	const handleEditOpen = () => {
		if (!miniTarea.completada) setEditMode(true);
	};

	const handleEditClose = () => {
		setEditMode(false);
		setNombre(miniTarea.nombre);
	};

	const renderIconContainer = (): React.ReactNode => {
		return (
			<div className={cl.iconContainer}>
				<TiArrowBack className={classNames(cl.icon, cl.icon_return)} />
				<BotonPrincipal onClick={() => eliminarMiniTarea(miniTarea.id)}>
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
						cl.miniTarea__title,
						miniTarea.completada ? "" : cl.miniTarea__title_hover
					)}
				>
					{nombre_mt} 
				</h3>
				<BotonPrincipal
					className={cl.miniTarea__btn}
					onClick={() => finalizarMiniTarea(miniTarea.id)}
				>
					{miniTarea.completada ? (
						renderIconContainer()
					) : (
						<MdDone className={classNames(cl.icon, cl.icon_complete)}
						/>
					)}
				</BotonPrincipal>
			</div>
		);
	};

	return (
		<Draggable draggableId={miniTarea.id} index={index}>
			{(provided, snapshot) => (
				<div
					className={classNames(
						cl.miniTarea,
						miniTarea.completada ? cl.complete : ""
					)}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<div className={cl.miniTarea__inner}>
						{editMode ? (
							<form onSubmit={handleChangeTitle} className={cl.miniTarea__form}>
								<MyInput
									value={nombre_mt}
									autoFocus={true}
									onBlur={handleEditClose}
									onChange={setNombre}
									className={cl.miniTarea__input}
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

export default MiniTarea;
