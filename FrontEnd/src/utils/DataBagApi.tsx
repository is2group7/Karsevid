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

    // Verificamos el contenido del state antes de convertirlo a JSON
    console.log('Estado obtenido de localStorage:', state);

    if (!state) {
        console.error('No hay estado disponible para guardar');
        return null;
    }

    const jsonString = JSON.stringify(state, null, 2);

    // Verificamos el JSON generado
    console.log('JSON generado para guardar:', jsonString);

    const method = 'POST';
    const endpoint = 'databag/guardar';
    const requestBody = {
        databag_storage: jsonString,
    };

    console.log('Guardamos el databag');
    return apiConexion({ method, endpoint, requestBody });
};

export { obtenerDatabag, guardarDatabag };
