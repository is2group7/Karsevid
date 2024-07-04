// paginas/TableroActual/TableroActual.tsx
import React, { FC } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import cl from "./TableroActual.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IntefazTablero } from "../../types/tablero";
import ReturnButton from "../../componentes/InterfazGrafica/boton/BotonVolver/BotonVolver.module";
import { useActions } from "../../hooks/useActions";
import TarjetaForm from "../../componentes/TarjetasForm/FormTarjeta";
import Tarjetas from "../../componentes/Tarjetas/Tarjetas";

interface initTableroActual {
    id: string;
}

const TableroActual: FC = () => {
    const { id } = useParams<initTableroActual>();
    const { tableros } = useTypedSelector((state) => state.tablero);
    const { submitFormCancel } = useActions();
    const tableroActual: IntefazTablero = tableros[id];
    const history = useHistory();

    if (!tableroActual) {
        return (
            <h1 className={cl.error_en_titulo} onClick={() => history.push("/")}>
                No se ha encontrado un tablero
            </h1>
        );
    }

    const espacioID = tableroActual.espacioID;

    return (
        <div className={cl.container}>
            <div className={cl.TableroActual}>
                <div className={cl.TableroActual__columna}>
                    <ReturnButton url={`/espacio/${espacioID}`} onClick={() => submitFormCancel()}>
                        {tableroActual.nombre_tablero}
                    </ReturnButton>
                </div>
                <div className={cl.TableroActual__columna}>
                    <Tarjetas
                        tarjetaIDs={tableroActual.tarjeta}
                        tableroID={tableroActual.id}
                    />
                    <TarjetaForm tableroID={tableroActual.id} />
                </div>
            </div>
        </div>
    );
};

export default TableroActual;
