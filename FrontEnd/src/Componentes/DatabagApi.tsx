import ApiConexion from "./ApiConexion";

interface ResApi {
    codigo: number;
    mensaje: string;
  }

const obtenerDatabag = async (): Promise<ResApi | null> => {
    const method = 'GET';
    const endpoint = 'databag/obtener';

    console.log('Obtenemos el databag');
    return ApiConexion({ method, endpoint});
};

const guardarDatabag = async (): Promise<ResApi | null> => {
    const localStorageData = { ...localStorage };
    const jsonString = JSON.stringify(localStorageData, null, 2);
    
    const method = 'POST';
    const endpoint = 'databag/guardar';
    const requestBody = {
        databag_storage: jsonString
    };

    console.log('Guardamos el databag');
    return ApiConexion({ method, endpoint, requestBody});
};

export {obtenerDatabag, guardarDatabag};