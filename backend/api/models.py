from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver

class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Unique ingredients
    description = models.TextField(blank=True, null=True)  # Optional description
    co2e_kg = models.FloatField() # Greenhouse gas emissions per kg
    land_use_kg = models.FloatField() # Land usage per kg
    water_kg = models.FloatField() # Water usage per kg
    density_g_ml = models.FloatField(blank=True, null=True)
    average_weight_g = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name

# Verify the file type is PNG.
def validate_file_type(value):
    if not value.name.endswith('.png'):
        raise ValidationError('Invalid file type. Only PNG is allowed.')
    return value

# Define the upload path for recipe images.
def recipe_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"recipes/recipe-{instance.id}.{ext}"


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    total_co2e = models.FloatField(blank=True)
    cooking_time = models.IntegerField()
    image = models.ImageField(upload_to=recipe_image_upload_path, validators=[validate_file_type], blank=True, null=True)

    def __str__(self):
        return self.name

# Delete the recipe image when the recipe is deleted.
@receiver(post_delete, sender=Recipe)
def delete_recipe_image(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(False)


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='recipe_ingredients', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, related_name='ingredient_recipes', on_delete=models.CASCADE)
    amount = models.FloatField()  # Stores the numeric amount
    unit = models.CharField(max_length=50)  # Describes the unit of measurement (e.g., "cups", "grams", "tbsp")

    def __str__(self):
        return f"{self.amount} {self.unit} of {self.ingredient.name} in {self.recipe.name}"


class RecipeInstruction(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='recipe_instructions', on_delete=models.CASCADE)
    instruction = models.TextField()
    step = models.IntegerField()
    timer = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.recipe.name}: Step {self.step}. {self.instruction}"


class UserFavorites(models.Model):
    user = models.ForeignKey(User, related_name='user_favorite_recipes', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='user_favorite_recipes', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'recipe')


class CompletedRecipes(models.Model):
    user = models.ForeignKey(User, related_name='completed_recipe_users', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='completed_recipes', on_delete=models.CASCADE)
    time_completed = models.DateTimeField(auto_now_add=True)
    co2e = models.FloatField()