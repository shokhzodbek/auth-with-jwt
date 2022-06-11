from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializer import UserSerializer

from .serializer import CustomTokenRefreshSerializer
from .helpers import get_tokens_for_user
from .models import User
# Create your views here.
class UserLoginView(APIView):
    permission_classes=[AllowAny,]
    def post(self, request):
        names = request.data.get('username')
        password = request.data.get('password')
        if (names is None or names == "") or \
                (password is None or password == ""):
            context = {
                "results": {
                    "errors": 'Вы не ввели имя пользователя или пароль'
                }
            }
            print(context)
            return Response(context)
        user = User.objects.filter(username=names).first()
        if (user is None):
            context = {
                "results": {
                    "errors": 'Пользователь не найден'
                }
            }
            print(context)
            return Response(context)
        if (not user.check_password(password)):
            context = {
                "results": {
                    "errors": 'Неправильный пароль'
                }
            }
            print(context)
            return Response(context)
        access_token = get_tokens_for_user(user)
        serialized_user = UserSerializer(user)
        context = {
            "results": {
                'access': access_token,
                'user': serialized_user.data,
                'user_role': user.user_type
            }
        }
        print(context)
        return Response(context)


class RegesterUser(APIView):

    permission_classes=[AllowAny,]
    def post(self, request):
        names = request.data.get('username')
        fullname = request.data.get('fullname')
        password = str(request.data.get('password'))
        usertype = request.data.get('user_type')
        user = User.objects.filter(username=names).count()
        userss = User.objects.filter(user_type="Оператор").count()
        print('user',user)
        if user>0:
            context = {
                     'error':"User should be unique"
                    }
            return Response(context)
        user = User.objects.create(username=names, fullname=fullname,password=make_password(password),user_type=usertype)
        serialized_user = UserSerializer(user)
        context = {
                            'user':serialized_user.data,
                    
                    }
        return Response(context)
    # def get(self, request):
    #     items = User.objects.all()
    #     serializer = UserSerializer(items, many=True)
    #     return Response(serializer.data)


class UserViewSet(ModelViewSet):
    # permission_classes=[AllowAny,]
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()   




class CustomTokenRefreshView(TokenRefreshView):
    permission_classes=[AllowAny,]
    serializer_class = CustomTokenRefreshSerializer