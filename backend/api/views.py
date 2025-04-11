from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Recipe, Ingredient
from .serializers import UserSerializer, RecipeSerializer, IngredientSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# List and Create Recipes
# Use GET to get list of all recipes
# Use POST to create a new recipe
class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]  # Permissions for GET requests
        elif self.request.method == 'POST':
            return [IsAuthenticated()]  # Permissions for POST requests
        return super().get_permissions()


# Retrieve, Update, and Delete a Recipe
# Use GET to retrieve a specific recipe based on its id.
# Use PUT/PATCH to update an existing recipe based on its id.
# Use Delete to delete a recipe based on its id.
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class RecipeSearchView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Recipe.objects.all()
        query = self.request.query_params.get('search', None)
        if query is not None:
            queryset = queryset.filter(name__icontains=query)
        return queryset


# List and Create Ingredients
# Use GET to get list of all ingredients
# Use POST to create a new ingredient
class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


# Retrieve, Update, and Delete an Ingredient
# Use GET to retrieve a specific ingredient based on its id.
# Use PUT/PATCH to update an existing ingredient based on its id.
# Use Delete to delete a ingredient based on its id.
class IngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientSearchView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Recipe.objects.all()
        query = self.request.query_params.get('search', None)
        if query is not None:
            queryset = queryset.filter(name__icontains=query)
        return queryset