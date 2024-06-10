from . import django_con, log

# Bloque de control de uuid
class uuid_not_found(Exception):
    pass

# Bloque de control de uuid
class not_found_session_active(Exception):
    pass

def extractHeaderUUID(request):
    extra_header = request.META.get('HTTP_X_UUID_SESSION')
    if extra_header:
        return str(extra_header)
    else:
        raise uuid_not_found('El parámetro de X-UUID-SESSION es obligatorio.')

def obtUsuariosUUID(uuid_session):
    sql = f"select a.cod_usuario from usuarios_sesiones a where a.id_sesion = '{uuid_session}' and a.estado = 'ACTIVO'"
    res = django_con.consultaSQL(sql, 1)
    if res:
        log.apiLogger.info('Se obtiene codUsuario ' + str(res[0]) + ' en base a uuid')
        return res[0]
    else:
        raise not_found_session_active('No existe sesión activa para este id.')