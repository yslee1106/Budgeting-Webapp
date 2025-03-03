from django.shortcuts import render

def chatbot_view(request):
    template = 'chatbot.html'
    context = dict()
    return render(request, template)



