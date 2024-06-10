from django.db import models
from django.http import JsonResponse
import uuid
from .Utilitarios import log, django_con

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

class Sesion(models.Model):
    id_sesion = models.CharField(max_length=30,primary_key=True)
    cod_usuario = models.IntegerField()
    estado = models.CharField(max_length=30)
    inicio_sesion = models.DateField()
    fin_sesion = models.DateField()

    def obtenerSesionActiva(self):
        sql = f"select a.id_sesion, a.inicio_sesion from usuarios_sesiones a where a.cod_usuario = '{self.cod_usuario}' and a.estado = 'ACTIVO'"
        res = django_con.consultaSQL(sql, 1)
        if res:
            self.id_sesion = res[0]
            self.inicio_sesion = res[1]
            self.estado = 'ACTIVO'
            return True
        else:
            return False

    def obtenerDatosSesion(self):
        sql = f"select a.cod_usuario, a.estado, a.inicio_sesion from usuarios_sesiones a where a.id_sesion = '{self.id_sesion}'"
        res = django_con.consultaSQL(sql, 1)
        if res:
            self.cod_usuario = res[0]
            self.estado = res[1]
            self.inicio_sesion = res[2]
            return True
        else:
            return False
        
    class Meta:
        db_table = 'usuarios_sesiones'


class UsuarioRegistro(models.Model):
    cod_usuario  = models.IntegerField(primary_key=True)
    nom_usuario  = models.CharField(max_length=30)
    nombres      = models.CharField(max_length=60)
    apellidos    = models.CharField(max_length=60)
    dir_correo   = models.CharField(max_length=100)
    password     = models.CharField(max_length=300, db_column='pass_usuario')

    class Meta: 
        db_table = 'usuarios'

# Modelo para login
class AuthUsuario(models.Model):
    cod_usuario = models.IntegerField()
    nom_usuario = models.CharField(max_length=30)
    password    = models.CharField(max_length=300)

    def __init__(self, nom_usuario,password):
        self.nom_usuario = nom_usuario
        self.password = password

    def validarUsuario(self):
        sql = f"select a.cod_usuario from usuarios a where a.nom_usuario = '{self.nom_usuario}' and a.pass_usuario = '{self.password}'"
        res = django_con.consultaSQL(sql,1)
        print(res)
        if res:
            self.cod_usuario = res[0]
            return True
        else:
            return False

    def iniciarSesion(self):
        if self.validarUsuario():
            sesionUsu = Sesion(None, self.cod_usuario, None, None)
            if sesionUsu.obtenerSesionActiva() == False:
                sesionUsu = Sesion(id_sesion = uuid.uuid4(), cod_usuario = self.cod_usuario, 
                                   estado = 'ACTIVO', inicio_sesion = None, fin_sesion = None)
                sesionUsu.save()

            return sesionUsu.id_sesion
        else:
            return None
    
# Modelo para Espacio de trabajo
class EspacioTrabajo(models.Model):
    cod_espacio  = models.IntegerField()
    nom_espacio  = models.CharField(max_length=50)
    desc_espacio = models.CharField(max_length=200)
    usu_creador  = models.IntegerField()
    estado       = models.CharField(max_length=1)

    def __init__(self, nom_usuario,password):
        self.nom_usuario = nom_usuario
        self.password = password

    def validarUsuario(self):
        sql = f"select a.cod_usuario from usuarios a where a.nom_usuario = '{self.nom_usuario}' and a.pass_usuario = '{self.password}'"
        res = django_con.consultaSQL(sql,1)
        print(res)
        if res:
            self.cod_usuario = res[0]
            return True
        else:
            return False


        