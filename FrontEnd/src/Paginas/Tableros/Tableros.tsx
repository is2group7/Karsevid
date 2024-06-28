import React, { FC } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import TableroForm from "../../componentes/TableroForm/TableroForm";
import TableroList from "../../componentes/TableroList/TableroList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import cl from "./Tableros.module.scss";
import ReturnButton from "../../componentes/InterfazGrafica/boton/BotonVolver/BotonVolver.module";

const TablerosDelEspacio: FC = () => {
  const { id: espacioID } = useParams<{ id: string }>(); // Obtén el ID del espacio desde los parámetros de la URL
  const { tableros } = useTypedSelector((state) => state.tablero);
  const espacio = useTypedSelector((state) => state.espacio.espacios[espacioID]);
  const { submitFormCancel } = useActions();

  if (!espacio) {
    return <div>Espacio no encontrado</div>;
  }

  const tablerosDelEspacio = Object.entries(tableros).filter(([tableroID]) =>
    espacio.tableros.includes(tableroID)
  );

  return (
    <div className={cl.container}>
      <ReturnButton url="/espacios" onClick={() => submitFormCancel()}>
        Volver a tus espacios
      </ReturnButton>
      <h1>Estás en el espacio {espacio.nombre}</h1>
      <div className={cl.tableros}>
        <div className={classNames(cl.row, cl.row_form)}>
          <TableroForm espacioID={espacioID} />
        </div>

        {tablerosDelEspacio.length > 0 && (
          <div className={classNames(cl.row, cl.row_list)}>
            <TableroList tableros={tablerosDelEspacio} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TablerosDelEspacio;
