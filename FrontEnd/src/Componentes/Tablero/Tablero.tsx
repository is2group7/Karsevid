import classNames from "classnames";
import React, { FC, useState, FormEvent } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./Tablero.module.scss";

interface TableroProps {
	id: string;
	tablero_nombre: string;
}

const Tablero: FC<TableroProps> = ({ id, tablero_nombre }) => {
	const { eliminarTablero, submitFormCancel, cambiarNombreTablero } = useActions();
	const [editMode, setEditMode] = useState(false);
	const [nombreTablero, setBoardTitle] = useState(tablero_nombre);

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(nombreTablero)) {
			cambiarNombreTablero({ id, nombre_tablero: nombreTablero });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditClose = () => {
		setEditMode(false);
		setBoardTitle(tablero_nombre);
	};

	const renderBoardContainer = (): React.ReactNode => {
		return (
			<div className={cl.boardContainer}>
				<BotonPrincipal
					className={classNames(cl.tablero__btn, cl.tablero__btn_edit)}
					onClick={() => setEditMode(true)}
				>
					<VscEdit className={cl.tablero__icon} />
				</BotonPrincipal>
				<NavLink
					className={cl.tablero__link}
					to={`/${id}`}
					onClick={() => submitFormCancel()}
				>
					<h2 className={cl.tablero__title}>{tablero_nombre}</h2>
				</NavLink>
				<BotonPrincipal
					className={classNames(cl.tablero__btn, cl.tablero__btn_remove)}
					onClick={() => eliminarTablero({ tableroID: id })}
				>
					<RiDeleteBin2Line className={cl.tablero__icon} />
				</BotonPrincipal>
			</div>
		);
	};

	return (
		<div className={cl.tablero}>
			<div className={cl.tablero__inner}>
				{editMode ? (
					<form
						className={cl.tablero__form}
						onSubmit={handleChangeTitle}
					>
						<MyInput
							value={nombreTablero}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							onBlur={handleEditClose}
							onChange={setBoardTitle}
							className={cl.tablero__input}
						/>
					</form>
				) : (
					renderBoardContainer()
				)}
			</div>
		</div>
	);
};

export default Tablero;
