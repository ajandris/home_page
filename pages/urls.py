from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('<str:lang>/', views.home_view, name='home'),
    path('<str:lang>/skills/', views.skills_view, name='skills'),
    path('<str:lang>/portfolio/', views.portfolio_view, name='portfolio'),
    path('<str:lang>/sales-funnel/', views.sales_funnel_view, name='sales_funnel'),
    path('<str:lang>/chat/', views.chat_view, name='chat'),
]
