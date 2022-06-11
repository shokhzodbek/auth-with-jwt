
from django.urls import path
from .views import UserLoginView,RegesterUser,UserViewSet,CustomTokenRefreshView
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('user/login',UserLoginView.as_view(),name='login'),
    path('user/register',RegesterUser.as_view(),name='register'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]+ router.urls
