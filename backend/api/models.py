from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Unique ingredients
    description = models.TextField(blank=True, null=True)  # Optional description
    co2e_kg = models.FloatField() # Greenhouse gas emissions per kg
    land_use_kg = models.FloatField() # Land usage per kg
    water_kg = models.FloatField() # Water usage per kg

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    total_co2e = models.FloatField()
    instructions = models.TextField()

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='recipe_ingredients', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, related_name='ingredient_recipes', on_delete=models.CASCADE)
    amount = models.FloatField()  # Stores the numeric amount
    unit = models.CharField(max_length=50)  # Describes the unit of measurement (e.g., "cups", "grams", "tbsp")

    def __str__(self):
        return f"{self.amount} {self.unit} of {self.ingredient.name} in {self.recipe.name}"
