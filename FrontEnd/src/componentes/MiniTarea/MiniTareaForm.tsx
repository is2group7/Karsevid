import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validacion";
import MyInput from "../InterfazGrafica/input/MyInput";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import cl from "./css/MiniTareaForm.module.scss";
import toast from 'react-hot-toast';

interface MiniTareaFormProps {
    tareaID: string; 
}

const MiniTareaForm: FC<MiniTareaFormProps> = ({ tareaID }) => {
    const { addMiniTarea, addMiniTareaToTarea } = useActions();
    const [inputValue, setInputValue] = useState("");
    const tarea = useTypedSelector(state => state.tarea.tareas[tareaID]);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate(inputValue)) {
            if (tarea.miniTareas.length >= tarea.maxMiniTareas) {
                toast.error('No se pueden agregar más miniTareas a esta tarea.');
                return;
            }

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
            <BotonPrincipal type="submit" className={cl.botonAgregar}>
                    Agregar MiniTarea
            </BotonPrincipal>                
        </form>
    );
};

export default MiniTareaForm;
