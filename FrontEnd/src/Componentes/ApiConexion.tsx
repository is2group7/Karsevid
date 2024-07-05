interface ResApi {
  codigo: number;
  mensaje: string;
}

interface ApiConexionProps {
  session_uuid?: string | null;
  method: string;
  endpoint: string;
  requestBody?: Record<string, unknown> | null;
}

const api_url = "http://127.0.0.1:8000/api/";

const apiConexion = async ({ session_uuid, method, endpoint, requestBody }: ApiConexionProps): Promise<ResApi | null> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (session_uuid) {
      headers.append('X-SESSION-UUID', session_uuid);
    }
  
    const body = requestBody ? JSON.stringify(requestBody) : undefined;
  
    const requestOptions: RequestInit = {
      method: method,
      headers: headers,
      body: body
    };
  
    try {
      console.log('Realizamos la llamada a: ' + api_url + endpoint);
      const response = await fetch(api_url + endpoint, requestOptions);
      console.log('Obtenemos de respuesta: ' + response);
      if (!response.ok) {
        throw new Error('Ocurrió un error inesperado con la conexión.');
      }
      const result: ResApi = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la conexión:', error);
      throw error;
    }
  };

export default apiConexion;