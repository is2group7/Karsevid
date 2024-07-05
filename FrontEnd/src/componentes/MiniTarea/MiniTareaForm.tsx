import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./css/MiniTareaForm.module.scss";
import MiniTarea from "./MiniTarea";

interface MiniTareaFormProps {
    tareaID: string; 
}

const MiniTareaForm: FC<MiniTareaFormProps> = ({ tareaID }) => {
    const { addMiniTarea, addMiniTareaToTarea} = useActions();
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate(inputValue)) {
            const miniTareaID = String(Date.now());
            addMiniTarea({
                id: miniTareaID,
                tareaID,
                nombre: inputValue,
                descripcion: "",  
                completada: false,
            });
            addMiniTareaToTarea({
                tareaID: tareaID,
                 miniTareaID: miniTareaID
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
