import os
from proyecto.infra.Email_real import EmailReal
from proyecto.infra.Email_mock import EmailMock


class NotificadorFactory:

    @staticmethod
    def crear():
        env = os.getenv("ENV_TYPE", "DEV")

        if env == "PROD":
            return EmailReal()
        else:
            return EmailMock()
