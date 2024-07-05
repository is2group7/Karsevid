import apiConexion from "./ApiConexion";
import { getState } from "./guardadoLocal";

interface ResApi {
    codigo: number;
    mensaje: string;
}

const obtenerDatabag = async (): Promise<ResApi | null> => {
    const method = 'GET';
    const endpoint = 'databag/obtener';

    console.log('Obtenemos el databag');
    return apiConexion({ method, endpoint });
};

const guardarDatabag = async (): Promise<ResApi | null> => {
    const state = getState();

    if (!state) {
        console.error('No hay estado disponible para guardar');
        return null;
    }

    const jsonString = JSON.stringify(state, null, 2);

    const method = 'POST';
    const endpoint = 'databag/guardar';
    const requestBody = {
        databag_storage: jsonString,
    };

    console.log('Guardamos el databag');
    return apiConexion({ method, endpoint, requestBody });
};

export { obtenerDatabag, guardarDatabag };
