import React, { FC, FormEvent } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validacion";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import MyPointer from "../InterfazGrafica/pointer/MyPointer";
import cl from "./FormTarjeta.module.scss";

interface TarjetaFormProps {
	tableroID: string;
}

const TarjetaForm: FC<TarjetaFormProps> = ({ tableroID }) => {
	const { inputValue, descripcionValue, isOpen, isError } = useTypedSelector(
		(state) => state.form
	);
	const {
		submitFormSuccess,
		submitFormCancel,
		openForm,
		setInputValue,
		setDescripcionValue,
		addTarjeta,
		submitFormError,
	} = useActions();

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addTarjeta({
				tableroID,
				id: String(Date.now()),
				nombre_tarjeta: inputValue,
				descripcion: descripcionValue,
			});
			submitFormSuccess();
			setInputValue("");
			setDescripcionValue("");
		} else {
			submitFormError();
		}

		event.preventDefault();
	};

	return (
		<div className={cl.container}>
			{isOpen ? (
				<form className={cl.tarjetaForm} onSubmit={handleFormSubmit}>
					<div className={cl.tarjetaForm__body}>
						<MyPointer isError={isError}>Coloca un nombre a tu tarjeta</MyPointer>
						<p>Nombre Tarjeta</p>
						<MyInput
							className={cl.tarjetaForm__input}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							value={inputValue}
							onChange={setInputValue}
						/>

						<p>Descripción</p>
						<MyInput
							className={cl.tarjetaForm__input}
							value={descripcionValue}
							onChange= {setDescripcionValue}
						/>				
					</div>

					<div className={cl.tarjetaForm__footer}>
						<BotonPrincipal type="submit" className={cl.tarjetaForm__btn}>
							Aceptar
						</BotonPrincipal>
						<BotonPrincipal
							className={cl.tarjetaForm__btn}
							onClick={submitFormCancel}
						>
							Cancelar
						</BotonPrincipal>
					</div>
				</form>
			) : (
				<BotonPrincipal className={cl.btnAbrir} onClick={openForm}>
					Tarjeta Nueva
				</BotonPrincipal>
			)}
		</div>
	);
};

export default TarjetaForm;