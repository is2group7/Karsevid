import classNames from "classnames";
import React, { FC, useState, FormEvent } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validacion";
import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import cl from "./Espacio.module.scss";

interface EspacioProps {
  id: string;
  nombre: string;
}

const Espacio: FC<EspacioProps> = ({ id, nombre }) => {
  const { eliminarEspacio, submitFormCancel, cambiarNombreEspacio } = useActions();
  const [editMode, setEditMode] = useState(false);
  const [nombreEspacio, setEspacioTitle] = useState(nombre);

  const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
    if (validate(nombreEspacio)) {
      cambiarNombreEspacio({ id, nombre: nombreEspacio });
      setEditMode(false);
    }

    event.preventDefault();
  };

  const handleEditClose = () => {
    setEditMode(false);
    setEspacioTitle(nombre);
  };

  const renderEspacioContainer = (): React.ReactNode => {
    return (
      <div className={cl.espacioContainer}>
        <BotonPrincipal
          className={classNames(cl.espacio__btn, cl.espacio__btn_edit)}
          onClick={() => setEditMode(true)}
        >
          <VscEdit className={cl.espacio__icon} />
        </BotonPrincipal>
        <NavLink
          className={cl.espacio__link}
          to={`/espacio/${id}`}
          onClick={() => submitFormCancel()}
        >
          <h2 className={cl.espacio__title}>{nombre}</h2>
        </NavLink>
        <BotonPrincipal
          className={classNames(cl.espacio__btn, cl.espacio__btn_remove)}
          onClick={() => eliminarEspacio({ id })}
        >
          <RiDeleteBin2Line className={cl.espacio__icon} />
        </BotonPrincipal>
      </div>
    );
  };

  return (
    <div className={cl.espacio}>
      <div className={cl.espacio__inner}>
        {editMode ? (
          <form
            className={cl.espacio__form}
            onSubmit={handleChangeTitle}
          >
            <MyInput
              value={nombreEspacio}
              autoFocus={true}
              onBlur={handleEditClose}
              onChange={(e) => setEspacioTitle}
              className={cl.espacio__input}
            />
          </form>
        ) : (
          renderEspacioContainer()
        )}
      </div>
    </div>
  );
};

export default Espacio;