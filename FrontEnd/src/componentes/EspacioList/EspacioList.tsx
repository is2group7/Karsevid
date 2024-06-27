import React, { FC } from "react";
import { useSelector } from 'react-redux';
import { InterfazEspacio } from "../../types/espacios";
import Espacio from '../Espacio/Espacio';


interface EspacioListProps {
	espacios: [espacioID: string, tablero: InterfazEspacio][];
}


const EspacioList: FC<EspacioListProps> = ({ espacios }) => {
  return (
		<div>
    <h2>Espacios disponibles</h2>
    <div className={cl.container}>
      {tableros.map(([tableroID, tablero]) => (
          <Tablero key={tableroID} id={tablero.id} tablero_nombre={tablero.nombre_tablero} />
        ))}
      </div>
    </div>
  );
};

export default EspacioList;
