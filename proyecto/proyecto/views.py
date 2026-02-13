from django.views import View
from django.http import JsonResponse
import json
from proyecto.proyecto.services import PedidoService


class CrearPedidoView(View):

    def post(self, request):
        data = json.loads(request.body)

        service = PedidoService()
        pedido = service.crear_pedido(
            usuario_id=data["usuario_id"],
            productos_data=data["productos"]
        )

        return JsonResponse({"pedido_id": pedido.id, "total": pedido.total})
