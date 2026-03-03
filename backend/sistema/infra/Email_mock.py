"""
infra/Email_mock.py
-------------------
Implementación Mock del notificador. Usada en entornos DEV/TEST.
Imprime por consola en lugar de enviar emails reales.
"""


class EmailMock:
    def enviar_confirmacion(self, pedido):
        print(f"[MOCK EMAIL] Pedido {pedido.id} confirmado para usuario {pedido.usuario_id}. Total: ${pedido.total}")

    def enviar_notificacion_stock(self, producto):
        print(f"[MOCK EMAIL] Stock bajo para producto: {producto.nombre}")