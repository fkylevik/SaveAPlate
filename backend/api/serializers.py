from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Recipe, Ingredient, RecipeIngredient

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def get_object(self):
        return self.request.user


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'co2e_kg', 'land_use_kg', 'water_kg']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())  # Use PrimaryKeyRelatedField

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'amount', 'unit']


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'total_co2e', 'instructions', 'recipe_ingredients']

    def create(self, validated_data):
        # Extract recipe ingredients data from validated data
        recipe_ingredients_data = validated_data.pop('recipe_ingredients')
        recipe = Recipe.objects.create(**validated_data) # Create the Recipe object

        # Loop through the recipe_ingredients and create associated RecipeIngredient objects
        for recipe_ingredient_data in recipe_ingredients_data:
            RecipeIngredient.objects.create(recipe=recipe, **recipe_ingredient_data)

        return recipe

    def update(self, instance, validated_data):
        # Extract recipe ingredients data from validated data
        recipe_ingredients_data = validated_data.pop('recipe_ingredients', [])

        # Update basic fields
        instance.name = validated_data.get('name', instance.name)
        instance.instructions = validated_data.get('instructions', instance.instructions)
        instance.save()

        # Clear old recipe ingredients
        instance.recipe_ingredients.all().delete()

        # Create new recipe ingredients
        for recipe_ingredient_data in recipe_ingredients_data:
            RecipeIngredient.objects.create(recipe=instance, **recipe_ingredient_data)

        return instance
