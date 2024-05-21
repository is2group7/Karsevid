import classNames from "classnames";
import React, { FC } from "react";
import BoardForm from "../../components/BoardForm/BoardForm";
import BoardList from "../../components/BoardList/BoardList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import cl from "../Tablero/Tableros.module.scss";

const Tableros: FC = () => {
	const { tableros } = useTypedSelector((state) => state.tableros);

	return (
		<div className={cl.container}>
			<div className={cl.tableros}>
				<div className={classNames(cl.row, cl.row_form)}>
					<BoardForm />
				</div>

				{Object.keys(tableros).length > 0 && (
					<div className={classNames(cl.row, cl.row_list)}>
						<BoardList tableros={Object.entries(tableros)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Tableros;
