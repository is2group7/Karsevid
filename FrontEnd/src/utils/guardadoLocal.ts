import { IntefazTablero } from "../types/tablero";
import { InterfazTarea } from "../types/tarea";
import { InterfazTarjeta } from "../types/tarjeta";
import { InterfazUsuario } from "../types/usuario";

// Modifica la URL de la API según corresponda
const API_URL = 'https://192.168.100.155:8000/api/tableros/listar?cod_espacio=5';

export const obtenerDatos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
	console.log('Datos obtenidos de la API:', datos)
    return datos;
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    throw error;
  }
};

// Aquí puedes usar la función obtenerDatos para obtener datos de tu API
obtenerDatos()
  .then((datos) => {
    console.log('Datos obtenidos de la API:', datos);
  })
  .catch((error) => {
    console.error('Error al obtener datos de la API:', error);
  });




export const getState = () => {
	try {
		const stateCollection = localStorage.getItem("boardsCollection");

		if (stateCollection === null) {
			return undefined;
		}

		return JSON.parse(stateCollection);
	} catch (e) {
		return undefined;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setState = ({
	tableros,
	tarjetas,
	tareas,
	usuarios,
}: {
	tableros: { [tableroID: string]: IntefazTablero };
	tarjetas: { [tarjetaID: string]: InterfazTarjeta };
	tareas: { [tareaID: string]: InterfazTarea };
	usuarios: {[usuarioID: string]: InterfazUsuario}
}) => {
	try {
		const localStorageCollection = {
            tableros,
            tarjetas,
            tareas,
			usuarios,
		};
		localStorage.setItem(
			"boardsCollection",
			JSON.stringify(localStorageCollection)
		);
	} catch (e) {
		throw e;
	}
};


  