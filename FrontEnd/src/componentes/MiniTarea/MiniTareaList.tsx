import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MiniTarea from "./css/MiniTareaList.scss";
import cl from "./MiniTareaList.module.scss";

interface MiniTareaListProps {
    miniTareaIDs: string[];
}

const MiniTareaList: FC<MiniTareaListProps> = ({ miniTareaIDs }) => {
    const { miniTareas } = useTypedSelector(state => state.miniTarea);

    return (
        <div className={cl.miniTareaList}>
            {miniTareaIDs.map((id, index) => {
                const miniTarea = miniTareas[id];
                return miniTarea ? <MiniTarea key={id} miniTarea={miniTarea} index={index} /> : null;
            })}
        </div>
    );
};

export default MiniTareaList;
