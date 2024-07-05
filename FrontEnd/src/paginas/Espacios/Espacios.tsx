import classNames from "classnames";
import React, { FC } from "react";
import { VscDebugDisconnect  } from "react-icons/vsc";
import EspacioForm from "../../componentes/EspacioForm/EspacioForm";
import EspacioList from "../../componentes/EspacioList/EspacioList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import BotonPrincipal from "../../componentes/InterfazGrafica/boton/BotonPrincipal/BotonPrincipal";
import cl from "./Espacios.module.scss";
import { useHistory, Link } from 'react-router-dom';


const Espacios: FC = () => {
  const { espacios } = useTypedSelector((state) => state.espacio);
  const { currentUser } = useTypedSelector((state) => state.usuario);
  const { submitFormCancel, logoutUsuario } = useActions();
  const history = useHistory();

  const handleLogout = () => {
    logoutUsuario();
    history.push('/'); 
  };

  const filteredEspacios = Object.entries(espacios).filter(
    ([_, espacio]) => espacio.usuarios.includes(currentUser ?? '')
  );

  return (
    <div className={cl.container}>      
      <BotonPrincipal type="button" onClick={handleLogout} className={cl.icon}>
          <VscDebugDisconnect
            className={cl.espacioForm__icon}
          />
      </BotonPrincipal>
      {filteredEspacios.length > 0 && (
        <div className={classNames(cl.row, cl.row_list)}>
          <EspacioList espacios={filteredEspacios} />
        </div>
      )}    
      <div className={classNames(cl.row, cl.row_form)}>
        <EspacioForm />
      </div>
    </div>
  );
};

export default Espacios;
