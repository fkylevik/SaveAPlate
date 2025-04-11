from django.urls import path
from . import views

urlpatterns = [
    # Recipe URLs
    path('recipes/', views.RecipeListCreateView.as_view(), name='recipe-list'),
    path('recipes/<int:pk>', views.RecipeDetailView.as_view(), name='edit-recipe'),
    path('recipes/search/', views.RecipeSearchView.as_view(), name="recipe-search"),

    # Ingredient URLs
    path('ingredients/', views.IngredientListCreateView.as_view(), name='ingredient-list'),
    path('ingredients/<int:pk>', views.IngredientDetailView.as_view(), name='edit-ingredient'),
]