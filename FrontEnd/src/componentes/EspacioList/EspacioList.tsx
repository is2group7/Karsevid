import React, { FC } from "react";
import { InterfazEspacio } from "../../types/espacios";
import Espacio from "../Espacio/Espacio"; 
import cl from "./EspacioList.module.scss";

interface EspacioListProps {
  espacios: [espacioID: string, espacio: InterfazEspacio][];
}

const EspacioList: FC<EspacioListProps> = ({ espacios }) => {
  return (
    <div className={cl.espacioList}>
      <h2 className={cl.espacioList__title}>Tus espacios</h2>
      <div className={cl.container}>
        {espacios.map(([espacioID, espacio]) => (
          <Espacio key={espacioID} id={espacio.id} nombre={espacio.nombre} />
        ))}
      </div>
    </div>
  );
};

export default EspacioList;
