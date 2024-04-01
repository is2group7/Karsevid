import psycopg2, os, log

ARCHIVO_CONF = 'dbconfig.ini'

configuracion = {
    'dbname': 'nombre_de_tu_basededatos',
    'user': 'tu_usuario',
    'password': 'tu_contraseña',
    'host': 'localhost',
    'port': '5432'
}

def verifArchivo():
    if not os.path.exists(ARCHIVO_CONF):
        try:
            with open(ARCHIVO_CONF, 'w') as archivo:
                archivo.write("dbname=karsevid\n")
                archivo.write("user=postgres\n")
                archivo.write("password=postgres\n")
                archivo.write("host=localhost\n")
                archivo.write("port=5432")
        except Exception as error: 
            log.bdLogger.error('Hubo un error al generar archivo de configuración. ' + str(error))

def obtConfiguraciones():
    # Verificar si existe archivo, si no existe se crea con unas configuraciones iniciales
    verifArchivo()

    # Se recorre linea por linea y se van cargando los valores a las configuraciones
    # Si tiene '#' se ignora
    with open(ARCHIVO_CONF, 'r') as archivo:
        for linea in archivo:
            if linea[0] == '#':
                continue
            valores = linea.split('=')
            configuracion[valores[0]] = valores[1].strip()
    
    # Cuando se configura todo se imprime el log de como queda la configuración
    log.bdLogger.info('Configuración BD [bdname=%s, user=%s, host=%s, port=%s]', 
                      configuracion['dbname'], configuracion['user'], configuracion['host'], configuracion['port'])

# Inicio procedimientos a utilizarse en el API.

def abrirConexion():
    try:
        conexion = psycopg2.connect(**configuracion)
        return conexion
    except psycopg2.Error as e:
        log.bdLogger.error("Error al conectar a la base de datos:", e)
        return None

def cerrarConexion(conexion):
    try:
        conexion.close()
    except psycopg2.Error as e:
        log.bdLogger.error("Error al conectar a la base de datos:", e)

def consultaSQL(sql, conexion):
    if conexion == None:
        log.bdLogger.error("La conexión es None, no se puede realizar la consulta SQL.")
        return None

    cursor = conexion.cursor()

    cursor.execute(sql)
    registros = cursor.fetchall()

    cursor.close()
    return registros

obtConfiguraciones()


''' EJEMPLO DE USO
conn = abrirConexion() # PRIMERO ABRIMOS LA CONEXION
regist = consultaSQL('SELECT * FROM public.ejemplo',conn) realizamos la consulta, primer parametro de consultaSQL es el query, segundo la conexión. Se guarda en regist.

for r in regist: se puede recorrer
    print(r)

cerrarConexion(conn) SIEMPRE CERRAR CONEXION

Obs.: Recomendado va ser tener clases que identifiquen a cada modelo de datos que nos puede retornar la base o similar, para que sea más ordenado.
'''

    

