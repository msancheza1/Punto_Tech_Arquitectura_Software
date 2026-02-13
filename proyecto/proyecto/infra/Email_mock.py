class EmailMock:

    def enviar_confirmacion(self, pedido):
        print(f"[MOCK] Pedido {pedido.id} confirmado para {pedido.usuario.nombre}")
