"""
urls.py
-------
Configuración de rutas de la API REST de Punto Tech.
"""
from django.http import JsonResponse
from django.urls import path
from sistema.presentation.views import (
    RegistrarUsuarioView,
    ActualizarPerfilView,
    ListarProductosCategoriaView,
    ListarProductosView,
    DetalleProductoView,
    AgregarProductoCarritoView,
    VerCarritoView,
    EliminarProductoCarritoView,
    CrearPedidoView,
    ListarPedidosView,
    RecomendacionesView,
)

def api_root(request):
    return JsonResponse({"status": "Punto Tech API corriendo ✅"})

urlpatterns = [
    path("", api_root),  # ✅ Ruta raíz — responde en http://127.0.0.1:8000/

    # Usuarios
    path("api/usuarios/registrar/", RegistrarUsuarioView.as_view(), name="registrar-usuario"),
    path("api/usuarios/<str:usuario_id>/perfil/", ActualizarPerfilView.as_view(), name="actualizar-perfil"),

    # Productos
    path("api/productos/", ListarProductosView.as_view(), name="listar-productos-todos"),
    path("api/categorias/<str:categoria_id>/productos/", ListarProductosCategoriaView.as_view(), name="listar-productos"),
    path("api/productos/<str:producto_id>/", DetalleProductoView.as_view(), name="detalle-producto"),

    # Carrito
    path("api/usuarios/<str:usuario_id>/carrito/", VerCarritoView.as_view(), name="ver-carrito"),
    path("api/usuarios/<str:usuario_id>/carrito/agregar/", AgregarProductoCarritoView.as_view(), name="agregar-carrito"),
    path("api/usuarios/<str:usuario_id>/carrito/<str:producto_id>/", EliminarProductoCarritoView.as_view(), name="eliminar-carrito"),

    # Pedidos
    path("api/pedidos/crear/", CrearPedidoView.as_view(), name="crear-pedido"),
    path("api/usuarios/<str:usuario_id>/pedidos/", ListarPedidosView.as_view(), name="listar-pedidos"),

    # Recomendaciones
    path("api/usuarios/<str:usuario_id>/recomendaciones/", RecomendacionesView.as_view(), name="recomendaciones"),
]