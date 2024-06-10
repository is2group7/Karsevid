import classNames from "classnames";
import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./TareaForm.module.scss";

interface TareaFormProps {
	tableroID: string;
	tarjetaID: string;
}

const TareaForm: FC<TareaFormProps> = ({ tableroID, tarjetaID }) => {
	const { addTarea } = useActions();
	const [inputValue, setInputValue] = useState("");
	const [isError, setIsError] = useState(false);

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addTarea({
				tableroID,
				tarjetaID,
				id: String(Date.now()),
				nombre_tarea: inputValue,
				tareaFinalizada: false,
			});
			setInputValue("");
		} else {
			setIsError(true);
			setTimeout(() => setIsError(false), 1000);
		}

		event.preventDefault();
	};

	return (
		<form className={cl.tareaForm} onSubmit={handleFormSubmit}>
			<MyInput
				className={classNames(
					cl.tareaForm__input,
					isError ? cl.error : ""
				)}
				value={inputValue}
				onChange={setInputValue}
			/>
		</form>
	);
};

export default TareaForm;
