"""
infra/Factory.py
----------------
Patrón Factory para gestionar el notificador de email.
Decide en tiempo de ejecución (por variable de entorno) si usa
el email real (producción) o el mock (desarrollo/testing).
"""
import os


class NotificadorFactory:
    """
    Factory que abstrae la creación del notificador.
    Cumple: Open/Closed Principle — agregar nuevos notificadores
    no requiere modificar la lógica existente.
    """

    @staticmethod
    def crear():
        env = os.getenv("ENV_TYPE", "DEV").upper()
        if env == "PROD":
            from proyecto.infra.Email_real import EmailReal
            return EmailReal()
        else:
            from proyecto.infra.Email_mock import EmailMock
            return EmailMock()