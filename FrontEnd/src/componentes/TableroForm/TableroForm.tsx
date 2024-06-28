import React, { FC, FormEvent } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validacion";

import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import MyLabel from "../InterfazGrafica/label/MyLabel";
import MyPointer from "../InterfazGrafica/pointer/MyPointer";
import cl from "./TableroForm.module.scss";

const TableroForm: FC = () => {
	const { inputValue, isOpen, isError } = useTypedSelector(
		(state) => state.form
	);
	const {
		submitFormCancel,
		submitFormSuccess,
		openForm,
		setInputValue,
		submitFormError,
		addTablero,
	} = useActions();

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addTablero({ id: String(Date.now()), nombre_tablero: inputValue });
			submitFormSuccess();
		} else {
			submitFormError();
		}

		event.preventDefault();
	};

	return (
		<div className={cl.container}>
			{isOpen ? (
				<form className={cl.tableroForm} onSubmit={handleFormSubmit}>

					<div className={cl.tableroForm__header}>
						<h2 className={cl.tableroForm__title}>
							Crea un nuevo tablero...
						</h2>
						<BotonPrincipal type="button">
							<VscChromeClose
								className={cl.boardForm__icon}
								onClick={() => submitFormCancel()}
							/>
						</BotonPrincipal>
					</div>
					<div className={cl.tableroForm__body}>

						<MyLabel id="formInput">Crea un nombre para tu tablero</MyLabel>
						<MyPointer isError={isError}>No puedes dejar en blanco, el nombre</MyPointer>
						<MyInput
							id="formInput"
							className={cl.tableroForm__input}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							value={inputValue}
							onChange={setInputValue}
						/>
					</div>
					<div className={cl.tableroForm__footer}>
						<BotonPrincipal className={cl.tableroForm__btn} type="submit">
							Aceptar
						</BotonPrincipal>
					</div>
				</form>
			) : (
				<BotonPrincipal
					className={cl.openBtn}
					type="submit"
					onClick={() => openForm()}
				>
					<h2 className={cl.openBtn__title}>Crea un nuevo tablero</h2>
				</BotonPrincipal>
			)}
		</div>
	);
};

export default TableroForm;
