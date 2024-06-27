import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EspacioState } from '../../types/espacios';
import { RootState } from '../../store';
import { useActions } from "../../hooks/useActions";
import TableroList from '../Tablero/TableroList';

interface EspacioProps {
  id: string;
}

const Espacio: React.FC<EspacioProps> = ({ id }) => {
  const { eliminarTablero, submitFormCancel, cambiarNombreTablero } = useActions();
  const dispatch = useDispatch();
  const espacio = useSelector((state: RootState) => state.espacio.espacios[id]);

  const handleDelete = () => {
    dispatch(eliminarEspacio(id));
  };

  const handleChangeName = (newName: string) => {
    dispatch(cambiarNombreEspacio(id, newName));
  };

  if (!espacio) {
    return <div>Espacio no encontrado</div>;
  }

  return (
    <div>
      <h2>{espacio.nombre}</h2>
      <button onClick={handleDelete}>Eliminar Espacio</button>
      <input
        type="text"
        value={espacio.nombre}
        onChange={(e) => handleChangeName(e.target.value)}
      />
      <TableroList tableros={espacio.tableros} />
    </div>
  );
};

export default Espacio;
