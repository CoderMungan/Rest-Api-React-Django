from .models import Todos
from rest_framework.serializers import ModelSerializer

class TodosSerializers(ModelSerializer):

    class Meta:
        model = Todos
        fields = "__all__"

