from django.http import JsonResponse, HttpRequest
from django.shortcuts import redirect
from .models import *

import json

def call_test(request):
    res = Respuesta(0,'Exitoso','Exitoso!')
    return res.toJson()


# Endpoint: api/login
def autenticar(request):
    if request.method == 'POST':
        usuario = request.POST.get('usuario', '')
        password = request.POST.get('password', '')
        auth = AuthUsuario(usuario, password)
        if auth.validarUsuario():
            return redirect("/workspaces")  # Redirigir a una página de éxito después de crear el objeto
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
            #Obtenemos datos del request
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
