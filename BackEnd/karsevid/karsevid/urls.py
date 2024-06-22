"""
URL configuration for karsevid project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views
from front import frontViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prueba', views.call_test, name='call_test'),
    path('api/registro', views.registrarse, name='registrarse'),
    path('api/autenticar', views.autenticar, name='autenticar'),
    
    #Espacios de trabajo
    path('api/espacios/listar', views.listarEspacios, name='listarEspacios'),
    path('api/espacios/crear', views.crearEspacio, name='crearEspacio'),
    path('api/espacios/editar', views.editarEspacio, name='editarEspacio'),

    #Tableros
    path('api/tableros/listar', views.listarTableros, name='listarTableros'),
    path('api/tableros/crear', views.crearTableros, name='crearTableros'),

    #front
    path('login/', frontViews.login, name='login')
]
