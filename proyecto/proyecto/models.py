from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()


class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    tipo_usuario = models.CharField(max_length=50)
    marcas_preferidas = models.TextField()
    exclusiones_perfil = models.TextField()
    recomendaciones = models.TextField(blank=True, null=True)  # ← integrado


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)


class Pedido(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)


class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)


class EmailReal:
    def enviar_confirmacion(self, pedido):
        # Aquí iría integración con SendGrid o SMTP real
        print(f"[EMAIL REAL] Confirmación enviada al usuario {pedido.usuario.email}")


class EmailMock:

    def enviar_confirmacion(self, pedido):
        print(f"[MOCK] Pedido {pedido.id} confirmado para {pedido.usuario.nombre}")
