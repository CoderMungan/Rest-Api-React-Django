from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Todos
from .serializer import TodosSerializers
# Create your views here.

routes = [

    {
        "route": "notes",
        "description": "tüm notları döndürür",
        "methods": "GET" 
    }
]


@api_view(["GET"])
def send_routes(request):
 

    return Response(routes)


@api_view(["GET"])
def get_notes(request):

    notes = Todos.objects.all()
    serialize = TodosSerializers(notes, many=True)
    
    print("isteği aldım")
    return Response(serialize.data)

@api_view(["GET"])
def get_single_note(request, id):
    
    note = Todos.objects.filter(id = int(id)).first()

    if note:
        serialize = TodosSerializers(note, many=False)
        return Response(serialize.data)
    
    else:
        errorMessage = {"type": "error", "message": "Böyle bir not bulunamadı"}
        return Response(errorMessage)
    

@api_view(["PUT"])
def updateNote(request, id):

    # eğer view POST ise request.body
    # eğer view PUT veya PATCH ise request.data kullanılır
    note = Todos.objects.filter(id = int(id)).first()

    if note:
        serialize = TodosSerializers(instance=note, data=request.data)

        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data)
        
        else:
            print("serialize errorrs:", serialize.errors)
            return Response({"message": "Birşeyler ters gitti"})
    
    else:
        errorMessage = {"type": "error", "message": "Böyle bir not bulunamadı"}
        return Response(errorMessage)



@api_view(["DELETE"])
def deleteNote(request, id):
        note = Todos.objects.filter(id = int(id)).first()

        if note:
            note.delete()
            return Response({"type": "deleted", "message": "Not silindi anasayfaya yönlendiriliyorsunuz."})
        
        else:
            errorMessage = {"type": "error", "message": "Böyle bir not bulunamadı"}
            return Response(errorMessage)


@api_view(["POST"])
def createNote(request):

    print("data:", request.data)
    task = TodosSerializers(data = request.data)

    if task.is_valid():

        task.save()
        return Response(task.data)
    else:
        print("form errors:", task.errors)
        return Response({"message": "bir hata meydana geldi"})