from django.views.generic import TemplateView
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')


class HomeView(TemplateView):
    template_name = 'pages/home.html'
