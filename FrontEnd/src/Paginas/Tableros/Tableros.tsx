import classNames from "classnames";
import React, { FC } from "react";
import TableroForm from "../../componentes/TableroForm/TableroForm"; 
import TableroList from "../../componentes/TableroList/TableroList"; 
import { useTypedSelector } from "../../hooks/useTypedSelector";
import cl from "./Tableros.module.scss";

const Tableros: FC = () => {
	const { tableros } = useTypedSelector((state) => state.tablero);

	return (
		<div className={cl.container}>
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
