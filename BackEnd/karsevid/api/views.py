from django.http import JsonResponse, HttpRequest
from django.shortcuts import redirect
from .Utilitarios import util
from .models import *
import json

def call_test(request):
    res = Respuesta(0,'Exitoso','Exitoso!')
    return res.toJson()

# Endpoint: api/login
def autenticar(request):
    if request.method == 'POST':
        # Obtener datos del request
        reqBody = json.loads(request.body) 
        usuario = reqBody.get('usuario','')
        password = reqBody.get('password','')
        
        # Crear objeto en base 
        auth = AuthUsuario(usuario, password)
        uuidSesion = auth.iniciarSesion()
        if uuidSesion != None:
            res = Respuesta(0, uuidSesion, '')
            return res.toJson()
        else:
            res = Respuesta(10, 'Usuario o Contraseña inválidos!','')
            return res.toJson()
    else:
        res = Respuesta(-100, 'Metodo de acceso no es el correcto','')
        return res.toJson()

# Endpoint: api/registro
def registrarse(request):
    try:
        if request.method == 'POST':
            # Obtenemos datos del request
            reqBody = json.loads(request.body)
            usuario = reqBody.get('usuario','')
            nombres = reqBody.get('nombres', '')
            apellidos = reqBody.get('apellidos', '')
            correo = reqBody.get('correo', '')
            password = reqBody.get('password', '')
            
            #Creamos el objeto a partir de los datos recibidos.
            usuRegistro = UsuarioRegistro(nom_usuario=usuario,
                                          nombres=nombres,
                                          apellidos=apellidos,
                                          dir_correo=correo,
                                          password=password)
            usuRegistro.save()

            res = Respuesta(0, 'Usuario Registrado!!','')
            return res.toJson()
        else:
            res = Respuesta(-100, 'Metodo de acceso no es el correcto','')
            return res.toJson()
    except Exception as e:
        res = Respuesta(-1, 'Ha ocurrido un error inesperado',str(e))
        log.apiLogger.error(str(res))
        return res.toJson()

## ESPACIO DE TRABAJO

# Endpoint: api/espacios/listar
def listarEspacios(request):
    if request.method == 'GET':
        #Obtenemos datos del request
        log.apiLogger.info('Se ingresa a servicio /api/espacios/listar')
        try:
            # Lectura de datos del request: HEADER y BODY
            uuidReq= util.extractHeaderUUID(request)
            codUsuarioReq = util.obtUsuariosUUID(uuidReq)

            #Creamos el objeto a partir de los datos recibidos.
            espacios = EspacioTrabajo.listarEspaciosTrabajo(codUsuarioReq)
            return JsonResponse(espacios, safe=False)
        except util.uuid_not_found as e:
            res = Respuesta(-99, str(e),str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
        except Exception as e:
            res = Respuesta(-1, 'Ha ocurrido un error inesperado',str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
    else:
            res = Respuesta(-100, 'Metodo de acceso no es el correcto','')
            return res.toJson()
    
# Endpoint: api/espacios/crear
def crearEspacio(request):
    if request.method == 'PUT':
        #Obtenemos datos del request
        log.apiLogger.info('Se ingresa a servicio /api/espacios/crear')
        try:
            # Lectura de datos del request: HEADER y BODY
            uuidReq= util.extractHeaderUUID(request)
            reqBody = json.loads(request.body)
            codUsuarioReq = util.obtUsuariosUUID(uuidReq)
            
            # Extracción de datos
            nombreReq = reqBody.get('nom_espacio','')
            descripcionReq = reqBody.get('desc_espacio','')
            usu_creadorReq = codUsuarioReq

            #Creamos el objeto a partir de los datos recibidos.
            espacioTrabajo = EspacioTrabajo(nom_espacio  = nombreReq,
                                            desc_espacio = descripcionReq,
                                            usu_creador  = usu_creadorReq,
                                            estado       = 'A')
            espacioTrabajo.save()

            res = Respuesta(0, 'Espacio de trabajo creado correctamente','')
            return res.toJson()
        except util.uuid_not_found as e:
            res = Respuesta(-99, str(e),str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
        except Exception as e:
            res = Respuesta(-1, 'Ha ocurrido un error inesperado',str(e))
            log.apiLogger.error(str(res))
            return res.toJson()

## TABLEROS

# Endpoint: api/tableros/listar
def listarTableros(request):
    if request.method == 'GET':
        #Obtenemos datos del request
        log.apiLogger.info('Se ingresa a servicio /api/tableros/listar')
        try:
            # Lectura de datos del request: HEADER y BODY
            uuidReq = util.extractHeaderUUID(request)
            codUsuarioReq = util.obtUsuariosUUID(uuidReq)
            codEspacio    = request.GET.get('cod_espacio') 

            #Creamos el objeto a partir de los datos recibidos.
            tableros = Tableros.listarTableros(codEspacio)
            return JsonResponse(tableros, safe=False)
        except util.uuid_not_found as e:
            res = Respuesta(-99, str(e),str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
        except util.not_found_session_active as e:
            res = Respuesta(-99, str(e),str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
        except Exception as e:
            res = Respuesta(-1, 'Ha ocurrido un error inesperado',str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
    else:
            res = Respuesta(-100, 'Metodo de acceso no es el correcto','')
            return res.toJson()
    
# Endpoint: api/tableros/crear
def crearTableros(request):
    if request.method == 'PUT':
        #Obtenemos datos del request
        log.apiLogger.info('Se ingresa a servicio /api/tableros/crear')
        try:
            # Lectura de datos del request: HEADER y BODY
            uuidReq= util.extractHeaderUUID(request)
            reqBody = json.loads(request.body)
            codUsuarioReq = util.obtUsuariosUUID(uuidReq)
            
            # Extracción de datos
            nombreReq = reqBody.get('nom_espacio','')
            descripcionReq = reqBody.get('desc_espacio','')
            usu_creadorReq = codUsuarioReq

            #Creamos el objeto a partir de los datos recibidos.
            espacioTrabajo = EspacioTrabajo(nom_espacio  = nombreReq,
                                            desc_espacio = descripcionReq,
                                            usu_creador  = usu_creadorReq,
                                            estado       = 'A')
            espacioTrabajo.save()

            res = Respuesta(0, 'Espacio de trabajo creado correctamente','')
            return res.toJson()
        except util.uuid_not_found as e:
            res = Respuesta(-99, str(e),str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
        except Exception as e:
            res = Respuesta(-1, 'Ha ocurrido un error inesperado',str(e))
            log.apiLogger.error(str(res))
            return res.toJson()
