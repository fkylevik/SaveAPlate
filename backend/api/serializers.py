from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Recipe, Ingredient, RecipeIngredient, UserFavorites, CompletedRecipes, RecipeInstruction


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
        fields = ['id', 'name', 'co2e_kg', 'land_use_kg', 'water_kg', 'density_g_ml', 'average_weight_g']
        extra_kwargs = {
            'density_g_ml': {'required': False},
            'average_weight_g': {'required': False},
        }


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())  # Use PrimaryKeyRelatedField

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'amount', 'unit']


class RecipeInstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeInstruction
        fields = ['id', 'instruction', 'step', 'timer']


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)
    recipe_instructions = RecipeInstructionSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'total_co2e', 'recipe_instructions', 'recipe_ingredients', 'cooking_time', 'image']
        extra_kwargs = {
            'image': {'required': False},
            'total_co2e': {'read_only': True},
        }

    def create(self, validated_data):
        recipe_ingredients_data = validated_data.pop('recipe_ingredients')
        recipe_instructions_data = validated_data.pop('recipe_instructions')

        sum_co2e = 0
        for ingredient_data in recipe_ingredients_data:
            if ingredient_data['unit'] == "pieces":
                sum_co2e += ingredient_data['ingredient'].co2e_kg * ingredient_data['amount'] * ingredient_data['ingredient'].average_weight_g / 1000
            else:
                sum_co2e += convert_to_kg(
                    ingredient_data['amount'],
                    ingredient_data['unit'],
                    ingredient_data['ingredient'].density_g_ml
                ) * ingredient_data['ingredient'].co2e_kg

        validated_data['total_co2e'] = sum_co2e

        recipe = Recipe.objects.create(**validated_data)

        for ingredient_data in recipe_ingredients_data:
            RecipeIngredient.objects.create(recipe=recipe, **ingredient_data)

        for instruction_data in recipe_instructions_data:
            RecipeInstruction.objects.create(recipe=recipe, **instruction_data)

        return recipe

    def update(self, instance, validated_data):
        recipe_ingredients_data = validated_data.pop('recipe_ingredients', [])
        recipe_instructions_data = validated_data.pop('recipe_instructions', [])

        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Ensure you're deleting the correct related objects
        instance.recipe_instructions.all().delete()
        instance.recipe_ingredients.all().delete()

        for ingredient_data in recipe_ingredients_data:
            RecipeIngredient.objects.create(recipe=instance, **ingredient_data)

        for instruction_data in recipe_instructions_data:
            RecipeInstruction.objects.create(recipe=instance, **instruction_data)

        return instance

def convert_to_kg(amount, unit, density=None):
    if unit == "g":
        return amount / 1000
    if unit == "kg":
        return amount
    if unit == "ml" and density is not None:
        return (amount * density) / 1000
    if unit == "l" and density is not None:
        return amount * density
    if unit == "cup" and density is not None:
        return (amount * 250 * density) / 1000
    if unit == "tbsp" and density is not None:
        return (amount * 15 * density) / 1000
    if unit == "tsp" and density is not None:
        return (amount * 5 * density) / 1000
    return amount

class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorites
        fields = ['id', 'user', 'recipe']
        extra_kwargs = {'user': {'read_only': True}}


class UserCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedRecipes
        fields = ['id', 'user', 'recipe', 'time_completed', 'co2e']
        extra_kwargs = {'user': {'read_only': True}, 'time_completed': {'read_only': True}}
