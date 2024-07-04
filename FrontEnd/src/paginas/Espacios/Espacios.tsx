import classNames from "classnames";
import React, { FC } from "react";
import EspacioForm from "../../componentes/EspacioForm/EspacioForm";
import EspacioList from "../../componentes/EspacioList/EspacioList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import cl from "./Espacios.module.scss";
import BotonVolver from "../../componentes/InterfazGrafica/boton/BotonVolver/BotonVolver.module";

const Espacios: FC = () => {
  const { espacios } = useTypedSelector((state) => state.espacio);
  const { currentUser } = useTypedSelector((state) => state.usuario);
  const { submitFormCancel } = useActions();

  const filteredEspacios = Object.entries(espacios).filter(
    ([_, espacio]) => espacio.usuarios.includes(currentUser ?? '')
  );

  return (
    <div className={cl.container}>
      <div className={cl.espacios}>
        <div className={classNames(cl.row, cl.row_form)}>
          <EspacioForm />
        </div>

        {filteredEspacios.length > 0 && (
          <div className={classNames(cl.row, cl.row_list)}>
            <EspacioList espacios={filteredEspacios} />
          </div>
        )}        
      </div>
    </div>
  );
};

export default Espacios;
