class EmailReal:
    def enviar_confirmacion(self, pedido):
        # Aquí iría integración con SendGrid o SMTP real
        print(f"[EMAIL REAL] Confirmación enviada al usuario {pedido.usuario.email}")

