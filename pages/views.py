from django.shortcuts import render, redirect

def root_redirect(request):
    """Redirect root path '/' to default English language path '/en/'."""
    return redirect('pages:home', lang='en')

def home_view(request, lang='en'):
    """Home landing page view."""
    template_name = f'pages/{lang}/index.html'
    context = {
        'lang': lang,
        'active_page': 'home',
    }
    return render(request, template_name, context)

def skills_view(request, lang='en'):
    """Skills & studies profile view based on profile markdown file."""
    template_name = f'pages/{lang}/skills.html'
    context = {
        'lang': lang,
        'active_page': 'skills',
    }
    return render(request, template_name, context)

def portfolio_view(request, lang='en'):
    """Portfolio showcase view."""
    template_name = f'pages/{lang}/portfolio.html'
    context = {
        'lang': lang,
        'active_page': 'portfolio',
    }
    return render(request, template_name, context)

def sales_funnel_view(request, lang='en'):
    """Service acquisition sales funnel view."""
    template_name = f'pages/{lang}/sales_funnel.html'
    context = {
        'lang': lang,
        'active_page': 'sales_funnel',
    }
    return render(request, template_name, context)

def chat_view(request, lang='en'):
    """Interactive Cyber AI Bot Chat view."""
    template_name = f'pages/{lang}/chat.html'
    context = {
        'lang': lang,
        'active_page': 'chat',
    }
    return render(request, template_name, context)
