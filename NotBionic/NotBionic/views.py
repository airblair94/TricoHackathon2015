from django.shortcuts import render
from django.http import HttpResponse

def explore(request):
	return HttpResponse("Hello world! This is the explore page")

def profile(request):
	return render(request,"profile.html",{'classes':{'eight':['on','off','on','off','on'],'nine':['on','off','on','off','on'],'ten':['on','off','on','off','on'],'eleven':['on','off','on','off','on'],'twelve':['on','off','on','off','on']},'user':{'name':'Brandon'}})
