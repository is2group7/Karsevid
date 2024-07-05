import React, { FC } from "react";
import { InterfazEspacio } from "../../types/espacios";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Espacio from "../Espacio/Espacio";
import cl from "./EspacioList.module.scss";

interface EspacioListProps {
  espacios: [espacioID: string, espacio: InterfazEspacio][];
}

const EspacioList: FC<EspacioListProps> = ({ espacios }) => {
  const { currentUser } = useTypedSelector((state) => state.usuario);
  const usuario = useTypedSelector((state) => state.usuario.usuarios)

  return (
    <div className={cl.espacioList}>
      <h2 className={cl.espacioList__title}>Bienvenidx, {usuario[String(currentUser)].nombre}  disfruta de tus espacios</h2>
      <div className={cl.container}>
        {espacios.map(([espacioID, espacio]) => (
          <Espacio key={espacioID} id={espacio.id} nombre={espacio.nombre} />
        ))}
      </div>
    </div>
  );
};

export default EspacioList;
