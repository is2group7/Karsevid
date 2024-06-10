from django.db import connection
from . import log

def consultaSQL(sql, cant_resultados = 0):
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            # Si se pasa 0 como cant_resultados, retorna varias filas
            if cant_resultados == 0:
                resultados = cursor.fetchall()
            # Si se pasa 1, significa que solo retorna una fila
            else:
                resultados = cursor.fetchone()

            return resultados
    except Exception as e:
        log.bdLogger.error('Hubo un error al recuperar los datos ' + str(e))
