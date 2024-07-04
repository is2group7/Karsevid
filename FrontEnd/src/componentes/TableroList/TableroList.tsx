import React, { FC } from "react";
import { IntefazTablero } from "../../types/tablero";
import Tablero from "../Tablero/Tablero"; 
import cl from "./TableroList.module.scss";

interface TableroListProps {
  tableros: [tableroID: string, tablero: IntefazTablero][];
}

const TableroList: FC<TableroListProps> = ({ tableros }) => {
  return (
    <div className={cl.tableroList}>
      <h2 className={cl.tableroList__title}>Tus tableros</h2>
      <div className={cl.container}>
        {tableros.map(([tableroID, tablero]) => (
          <Tablero key={tableroID} id={tablero.id} tablero_nombre={tablero.nombre_tablero} />
        ))}
      </div>
    </div>
  );
};

export default TableroList;

