from proyecto.proyecto.Builder import PedidoBuilder
from proyecto.proyecto.Factory import NotificadorFactory
from proyecto.proyecto.models import Usuario


class PedidoService:

    def __init__(self, notificador=None):
        self.notificador = notificador or NotificadorFactory.crear()

    def crear_pedido(self, usuario_id, productos_data):

        usuario = Usuario.objects.get(id=usuario_id)

        pedido = (
            PedidoBuilder()
            .para_usuario(usuario)
            .con_productos(productos_data)
            .calcular_total()
            .build()
        )

        self.notificador.enviar_confirmacion(pedido)

        return pedido
