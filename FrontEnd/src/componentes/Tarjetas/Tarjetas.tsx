import React, { FC } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TarjetaItem from "../TarjetaItem/TarjetaItem"; 
import cl from "./Tarjetas.module.scss";


interface TarjetaProps {
	tarjetaIDs: string[];
	tableroID: string;
}

const Tarjetas: FC<TarjetaProps> = ({ tableroID, tarjetaIDs }) => {
	const { tarjetas } = useTypedSelector((state) => state.tarjeta);
	const { dragAndDrop } = useActions();

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { destination, source, draggableId, type } = result;

		dragAndDrop({
			droppableIdStart: source.droppableId,
			droppableIdEnd: destination.droppableId,
			droppableIndexStart: source.index,
			droppableIndexEnd: destination.index,
			draggableId,
			type,
			tableroID,
		});
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="tarjetas" type="tarjeta" direction="horizontal">
				{(provided) => (
					<div
						className={cl.tarjetas}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{tarjetaIDs.length > 0 &&
							tarjetaIDs.map((tarjetaID: string, index: number) => {
								const tarjeta = tarjetas[tarjetaID];
								if (tarjeta)
									return (
										<TarjetaItem
											key={tarjetaID}
											tarjeta={tarjeta}
											index={index}
										/>
									);
							})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Tarjetas;