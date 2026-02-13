from proyecto.proyecto.models import Pedido, DetallePedido, Producto
from django.core.exceptions import ValidationError


class PedidoBuilder:

    def __init__(self):
        self._pedido = Pedido()
        self._productos_data = []

    def para_usuario(self, usuario):
        self._pedido.usuario = usuario
        return self

    def con_productos(self, productos_data):
        """
        productos_data = [
            {"producto_id": 1, "cantidad": 2},
            {"producto_id": 3, "cantidad": 1}
        ]
        """
        if not productos_data:
            raise ValidationError("El pedido debe tener al menos un producto")

        self._productos_data = productos_data
        return self

    def calcular_total(self):
        total = 0

        for item in self._productos_data:
            producto = Producto.objects.get(id=item["producto_id"])
            total += producto.precio * item["cantidad"]

        self._pedido.total = total
        return self

    def build(self):
        if self._pedido.total <= 0:
            raise ValidationError("Total inválido")

        self._pedido.save()

        for item in self._productos_data:
            producto = Producto.objects.get(id=item["producto_id"])

            DetallePedido.objects.create(
                pedido=self._pedido,
                producto=producto,
                cantidad=item["cantidad"],
                precio_unitario=producto.precio
            )

        return self._pedido
