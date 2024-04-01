from django.db import connection
import log

def consultaSQL(sql):
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            resultados = cursor.fetchall
            return resultados
    except Exception as e:
        log.bdLogger.error('Hubo un error al generar archivo de configuración. ' + str(e))
