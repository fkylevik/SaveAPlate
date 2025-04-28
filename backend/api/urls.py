from django.urls import path
from . import views

urlpatterns = [
    # Recipe URLs
    path("recipes/", views.RecipeListCreateView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", views.RecipeDetailView.as_view(), name="edit-recipe"),
    path("recipes/search/", views.RecipeSearchView.as_view(), name="recipe-search"),
    path("recipes/favorite/", views.FavoriteRecipesListView.as_view(), name="user-favorite-recipe"),
    path("recipes/unfavorite/<int:pk>/", views.FavoriteRecipesDeleteView.as_view(), name="user-favorite-recipe"),

    # Ingredient URLs
    path("ingredients/", views.IngredientListCreateView.as_view(), name="ingredient-list"),
    path("ingredients/<int:pk>/", views.IngredientDetailView.as_view(), name="edit-ingredient"),
    
    # Filtering URLs
    path("recipes/by-ingredients/", views.RecipeIngredientSearchView.as_view(), name="recipes-by-ingredients"),
]