from django.db import models
from django.http import JsonResponse
import uuid
from .Utilitarios import log

# Modelo respuesta genérica
class Respuesta(models.Model):
    cod_respuesta = models.IntegerField()
    mensaje       = models.CharField(max_length=255)
    det_mensaje   = models.CharField(max_length=1024, blank=True, null=True)

    def __init__(self, cod_respuesta, mensaje):
        self.cod_respuesta = cod_respuesta
        self.mensaje = mensaje

    def __init__(self, cod_respuesta, mensaje, det_mensaje):
        self.cod_respuesta = cod_respuesta
        self.mensaje = mensaje
        self.det_mensaje = det_mensaje

    def __str__(self):
        return f"Cod.: {self.cod_respuesta}, Mensaje: {self.mensaje} , Det_mensaje: {self.det_mensaje}"
    
    def toJson(self):
        return JsonResponse({
                                'codigo':self.cod_respuesta,
                                'mensaje': self.mensaje
                            })

class UsuarioRegistro(models.Model):
    cod_usuario  = models.IntegerField(primary_key=True)
    nom_usuario  = models.CharField(max_length=30)
    nombres      = models.CharField(max_length=60)
    apellidos    = models.CharField(max_length=60)
    dir_correo   = models.CharField(max_length=100)
    password      = models.CharField(max_length=300, db_column='pass_usuario')

    class Meta: 
        db_table = 'usuarios'

# Modelo para login
class AuthUsuario(models.Model):
    nom_usuario = models.CharField(max_length=30)
    password    = models.CharField(max_length=300)

    def __init__(self, nom_usuario,password):
        self.nom_usuario = nom_usuario
        self.password = password

    #def validarUsuario(self):


class Sesion(models.Model):
    id_sesion = models.CharField(max_length=30)
    cod_usuario = models.IntegerField()


        