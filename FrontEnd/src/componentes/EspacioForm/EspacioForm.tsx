import React, { FC, FormEvent, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validacion";

import BotonPrincipal from "../InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import MyInput from "../InterfazGrafica/input/MyInput";
import MyLabel from "../InterfazGrafica/label/MyLabel";
import MyPointer from "../InterfazGrafica/pointer/MyPointer";
import cl from "./EspacioForm.module.scss";

const EspacioForm: FC = () => {
  const { inputValue, isOpen, isError } = useTypedSelector(
    (state) => state.form
  );
  const { usuarios } = useTypedSelector((state) => state.usuario);
  const [selectedUsuarios, setSelectedUsuarios] = useState<string[]>([]);
  const currentUser = useTypedSelector((state) => state.usuario.currentUser);

  const {
    submitFormCancel,
    submitFormSuccess,
    openForm,
    setInputValue,
    submitFormError,
    addEspacio,
  } = useActions();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate(inputValue)) {
      addEspacio({
        id: String(Date.now()),
        nombre: inputValue,
        owner: String(currentUser), 
        usuarios: [String(currentUser), ...selectedUsuarios]
      });
      submitFormSuccess();
    } else {
      submitFormError();
    }
  };

  const handleUsuarioChange = (usuarioID: string) => {
    setSelectedUsuarios((prevSelected) =>
      prevSelected.includes(usuarioID)
        ? prevSelected.filter((id) => id !== usuarioID)
        : [...prevSelected, usuarioID]
    );
  };

  return (
    <div className={cl.container}>
      {isOpen ? (
        <form className={cl.espacioForm} onSubmit={handleFormSubmit}>
          <div className={cl.espacioForm__header}>
            <h2 className={cl.espacioForm__title}>Crea un nuevo espacio...</h2>
            <BotonPrincipal type="button">
              <VscChromeClose
                className={cl.espacioForm__icon}
                onClick={() => submitFormCancel()}
              />
            </BotonPrincipal>
          </div>
          <div className={cl.espacioForm__body}>
            <MyLabel id="formInput">Crea un nombre para tu espacio</MyLabel>
            <MyPointer isError={isError}>
              No puedes dejar en blanco, el nombre.
            </MyPointer>
            <MyInput
              id="formInput"
              className={cl.espacioForm__input}
              autoFocus={true}
              value={inputValue}
              onChange={setInputValue}
            />
            <div className={cl.espacioForm__usuarios}>
              <h3>Selecciona los usuarios que pertenecen a este espacio:</h3>
              {Object.values(usuarios).map((usuario) => (
                usuario.id !== currentUser && ( // Excluir al usuario principal
                  <label key={usuario.id}>
                    <input
                      type="checkbox"
                      value={usuario.id}
                      checked={selectedUsuarios.includes(usuario.id)}
                      onChange={() => handleUsuarioChange(usuario.id)}
                    />
                    {usuario.nombre}
                  </label>
                )
              ))}
            </div>
          </div>
          <div className={cl.espacioForm__footer}>
            <BotonPrincipal className={cl.espacioForm__btn} type="submit">
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
          <h2 className={cl.openBtn__title}>Crea un nuevo espacio</h2>
        </BotonPrincipal>
      )}
    </div>
  );
};

export default EspacioForm;
