"""
domain/Builder.py
-----------------
Patrón Builder para la entidad más compleja del sistema: Pedido.
Implementa Fluent Interface para garantizar que un pedido sea válido
antes de persistirse.
"""
from decimal import Decimal


class PedidoBuilder:
    """
    Construye un Pedido validado paso a paso.
    Cumple: Fluent Interface + Single Responsibility Principle.
    """

    def __init__(self):
        self._usuario_id = None
        self._productos = []       # lista de dicts: {producto, cantidad}
        self._direccion = ""
        self._total = Decimal("0.00")

    def para_usuario(self, usuario_id: str) -> "PedidoBuilder":
        if not usuario_id:
            raise ValueError("El pedido debe tener un usuario asociado.")
        self._usuario_id = usuario_id
        return self

    def con_productos(self, productos: list) -> "PedidoBuilder":
        """
        productos: lista de dicts con claves 'producto' (instancia) y 'cantidad' (int)
        """
        if not productos:
            raise ValueError("El pedido debe contener al menos un producto.")
        self._productos = productos
        return self

    def con_direccion(self, direccion: str) -> "PedidoBuilder":
        if not direccion or len(direccion.strip()) < 5:
            raise ValueError("La dirección de envío no es válida.")
        self._direccion = direccion.strip()
        return self

    def calcular_total(self) -> "PedidoBuilder":
        if not self._productos:
            raise ValueError("No hay productos para calcular el total.")
        self._total = sum(
            p["producto"].precio * p["cantidad"]
            for p in self._productos
        )
        return self

    def build(self):
        """
        Valida el estado final y persiste el Pedido + sus detalles.
        Retorna la instancia de Pedido guardada.
        """
        if self._total <= 0:
            raise ValueError("El total del pedido debe ser mayor a cero.")
        if not self._usuario_id:
            raise ValueError("El pedido no tiene usuario.")
        if not self._direccion:
            raise ValueError("El pedido no tiene dirección de envío.")

        # Importación tardía para evitar dependencia circular con Django
        from proyecto.models import Pedido, DetallePedido

        pedido = Pedido.objects.create(
            usuario_id=self._usuario_id,
            total=self._total,
            direccion_envio=self._direccion,
            estado="pendiente",
        )

        for item in self._productos:
            DetallePedido.objects.create(
                pedido=pedido,
                producto=item["producto"],
                cantidad=item["cantidad"],
                precio_unitario=item["producto"].precio,
            )

        return pedido