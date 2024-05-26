import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Tarea from "../Tarea/Tarea"; 
import cl from "./TareaList.module.scss"; //trabajando

interface TareaListProps {
	tareaIDs: string[];
}

const TareaList: FC<TareaListProps> = ({ tareaIDs }) => {
	const { tareas } = useTypedSelector((state) => state.tarea);

	return (
		<div className={cl.tareaList}>
			{tareaIDs.length > 0 &&
				tareaIDs.map((tareaID: string, index: number) => {
					const tarea = tareas[tareaID];
					if (tarea)
						return <Tarea key={tarea.id} tarea={tarea} index={index} />;
				})}
		</div>
	);
};

export default TareaList;
