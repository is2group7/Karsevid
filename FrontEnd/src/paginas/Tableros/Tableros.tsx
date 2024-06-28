import classNames from "classnames";
import React, { FC } from "react";
import TableroForm from "../../componentes/TableroForm/TableroForm"; 
import TableroList from "../../componentes/TableroList/TableroList"; 
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions"; 
import cl from "./Tableros.module.scss";
import ReturnButton from "../../componentes/InterfazGrafica/boton/BotonVolver/BotonVolver.module"; 




const Tableros: FC = () => {
	const { tableros } = useTypedSelector((state) => state.tablero);
	const { espacios } = useTypedSelector((state) => state.espacio);
	const { submitFormCancel } = useActions();

	return (
		<div className={cl.container}>
			<ReturnButton url="/espacios" onClick={() => submitFormCancel()}>
					Volver
			</ReturnButton>
			<div className={cl.tableros}>
				<div className={classNames(cl.row, cl.row_form)}>
					<TableroForm />
				</div>

				{Object.keys(tableros).length > 0 && (
					<div className={classNames(cl.row, cl.row_list)}>
						<TableroList tableros={Object.entries(tableros)} />
					</div>	
				)}
			</div>
		</div>
	);
};

export default Tableros;
