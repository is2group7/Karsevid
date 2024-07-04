import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./css/MiniTareaForm.module.scss";

interface MiniTareaFormProps {
    tareaID: string; 
}

const MiniTareaForm: FC<MiniTareaFormProps> = ({ tareaID }) => {
    const { addMiniTarea } = useActions();
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate(inputValue)) {
            addMiniTarea({
                id: String(Date.now()),
                tareaID,
                nombre: inputValue,
                descripcion: "",  
                completada: false,
            });
            setInputValue("");
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className={cl.miniTareaForm}>
            <MyInput value={inputValue} onChange={setInputValue} />
        </form>
    );
};

export default MiniTareaForm;
