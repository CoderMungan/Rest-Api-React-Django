from django.db import models

# Create your models here.
class Todos(models.Model):

    task = models.CharField(("Görev"), max_length=50)
    completed = models.BooleanField(("Tamamlandı mı"), default=False)
    createdAt = models.DateTimeField(auto_now=True)


    def __str__(self) -> str:
        return self.task
