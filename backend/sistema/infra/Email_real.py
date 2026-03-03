"""
infra/Email_real.py
-------------------
Implementación real del notificador. Usada en entorno PROD.
Utiliza smtplib para enviar correos reales.
"""
import smtplib
import os
from email.mime.text import MIMEText


class EmailReal:
    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.smtp_user = os.getenv("SMTP_USER", "")
        self.smtp_pass = os.getenv("SMTP_PASS", "")

    def _enviar(self, destinatario: str, asunto: str, cuerpo: str):
        msg = MIMEText(cuerpo)
        msg["Subject"] = asunto
        msg["From"] = self.smtp_user
        msg["To"] = destinatario
        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_pass)
                server.sendmail(self.smtp_user, [destinatario], msg.as_string())
        except Exception as e:
            print(f"[EMAIL ERROR] No se pudo enviar el correo: {e}")

    def enviar_confirmacion(self, pedido):
        destinatario = pedido.usuario.email
        asunto = f"Punto Tech - Confirmación de pedido #{pedido.id}"
        cuerpo = (
            f"Hola {pedido.usuario.nombre},\n\n"
            f"Tu pedido #{pedido.id} ha sido confirmado.\n"
            f"Total: ${pedido.total}\n\n"
            f"¡Gracias por comprar en Punto Tech!"
        )
        self._enviar(destinatario, asunto, cuerpo)

    def enviar_notificacion_stock(self, producto):
        admin_email = os.getenv("ADMIN_EMAIL", "admin@puntotech.com")
        asunto = f"Punto Tech - Stock bajo: {producto.nombre}"
        cuerpo = f"El producto '{producto.nombre}' está por debajo del punto de reposición."
        self._enviar(admin_email, asunto, cuerpo)