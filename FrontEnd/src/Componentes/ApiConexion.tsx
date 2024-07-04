import React, { useEffect, useState } from 'react';

interface ResApi {
  codigo: number;
  mensaje: string;
}

interface ApiConexionProps {
  session_uuid?: string | null;
  method: string;
  endpoint: string;
  requestBody: Record<string, unknown>;
}

const api_url = "http://127.0.0.1:8000/api/";

const ApiConexion: React.FC<ApiConexionProps> = ({ session_uuid, method, endpoint, requestBody }) => {
  const [res, setResApi] = useState<ResApi | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      if (session_uuid) {
        headers.append('X-SESSION-UUID', session_uuid);
      }

      const body = JSON.stringify(requestBody);

      const requestOptions: RequestInit = {
        method: method,
        headers: headers,
        body: body
      };

      try {
        const response = await fetch(api_url + endpoint, requestOptions);
        if (!response.ok) {
          throw new Error('Ocurrió un error inesperado con la conexión.');
        }
        const result: ResApi = await response.json();
        setResApi(result);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [session_uuid, method, endpoint, requestBody]);

  // Aquí podrías devolver algún elemento JSX si necesitas que ApiConexion renderice algo

  return (
    <div>
      {/* Ejemplo de cómo podrías mostrar información */}
      <p>Resultado: {res ? `${res.codigo} - ${res.mensaje}` : 'Sin datos'}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ApiConexion;