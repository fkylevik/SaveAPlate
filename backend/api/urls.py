from django.urls import path
from . import views

urlpatterns = [
    # Recipe URLs
    path("recipes/", views.RecipeListCreateView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", views.RecipeDetailView.as_view(), name="edit-recipe"),
    path("recipes/<int:pk>/image/", views.RecipeImageUploadView.as_view(), name="recipe-image-upload"),
    path("recipes/search/", views.RecipeSearchView.as_view(), name="recipe-search"),
    path("recipes/favorite/", views.FavoriteRecipesListView.as_view(), name="user-favorite-recipe"),
    path("recipes/favorite/<int:pk>/", views.FavoriteRecipesDeleteView.as_view(), name="user-favorite-delete"),
    path("recipes/favorites/<int:pk>/", views.FavoriteRecipeStatusView.as_view(), name="user-favorite-status"),

    path("recipes/completed/", views.CompletedRecipesListView.as_view(), name="user-completed-recipe"),

    # Ingredient URLs
    path("ingredients/", views.IngredientListCreateView.as_view(), name="ingredient-list"),
    path("ingredients/<int:pk>/", views.IngredientDetailView.as_view(), name="edit-ingredient"),
    
    # Filtering URLs
    path("recipes/by-ingredients/", views.RecipeIngredientSearchView.as_view(), name="recipes-by-ingredients"),
]