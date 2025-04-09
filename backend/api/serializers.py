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
        fields = ['id', 'name', 'description']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'amount', 'unit']


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'carbon_footprint_kg_co2e', 'instructions', 'recipe_ingredients']

    def create(self, validated_data):
        recipe_ingredients_data = validated_data.pop('recipe_ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for recipe_ingredient_data in recipe_ingredients_data:
            ingredient_data = recipe_ingredient_data.pop('ingredient')
            ingredient, _ = Ingredient.objects.get_or_create(**ingredient_data)
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=ingredient,
                amount=recipe_ingredient_data['amount'],
                unit=recipe_ingredient_data['unit']
            )
        return recipe

    def update(self, instance, validated_data):
        recipe_ingredients_data = validated_data.pop('recipe_ingredients', [])
        instance.name = validated_data.get('name', instance.name)
        instance.carbon_footprint_kg_co2e = validated_data.get('carbon_footprint_kg_co2e', instance.carbon_footprint_kg_co2e)
        instance.instructions = validated_data.get('instructions', instance.instructions)
        instance.save()

        # Clear old RecipeIngredients and update with new ones
        instance.recipe_ingredients.all().delete()
        for recipe_ingredient_data in recipe_ingredients_data:
            ingredient_data = recipe_ingredient_data.pop('ingredient')
            ingredient, _ = Ingredient.objects.get_or_create(**ingredient_data)
            RecipeIngredient.objects.create(
                recipe=instance,
                ingredient=ingredient,
                amount=recipe_ingredient_data['amount'],
                unit=recipe_ingredient_data['unit']
            )
        return instance
