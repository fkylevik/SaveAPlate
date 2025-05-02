import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import RecipeIngredientItem from "../components/RecipeIngredientItem.jsx";
import SearchableDropdown from "../components/SearchableDropdown.jsx";
import RecipeInstructionItem from "../components/RecipeInstructionItem.jsx";
import '../styles/CreateRecipe.css';

function CreateRecipePage() {
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState('');
    const [servings, setServings] = useState(4);
    const [cookingTime, setCookingTime] = useState(0);
    const [recipeImage, setRecipeImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([{
        ingredient: null,
        amount: "",
        unit: "",
    }]);
    const [recipeInstructions, setRecipeInstructions] = useState([{
        instruction: "",
        step: 1,
        timer: null,
    }]);

    const handleAddIngredient = () => {
        setRecipeIngredients([...recipeIngredients, {
            ingredient: null,
            amount: "",
            unit: "",
        }]);
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(newIngredients);
    };

    const handleChangeIngredient = (index, field, value) => {
        const newIngredients = [...recipeIngredients];
        newIngredients[index][field] = value;
        setRecipeIngredients(newIngredients);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setRecipeImage(file);
          setImagePreview(URL.createObjectURL(file));
        }
      };

    const handleAddInstruction = () => {
        setRecipeInstructions((prev) => [
            ...prev,
            { instruction: "", step: prev.length + 1, timer: null },
        ]);
    };

    const handleDeleteInstruction = (indexToRemove) => {

        const updatedItems = recipeInstructions
            .filter((_, index) => index !== indexToRemove)
            .map((item, index) => ({ ...item, step: index + 1 }));

        setRecipeInstructions(updatedItems);
    };

    const handleChangeInstruction = (index, field, value) => {
        const newInstruction = [...recipeInstructions];
        newInstruction[index][field] = value;
        setRecipeInstructions(newInstruction);
    };

    const handleCreateRecipe = async (e) => {
        e.preventDefault();
        const newRecipe = {
            name: recipeName,
            recipe_instructions: recipeInstructions.map((instruction) => ({
                instruction: instruction.instruction,
                step: instruction.step,
                timer: instruction.timer,
            })),
            total_co2e: recipeIngredients.reduce((sum, ing) => sum + ing.ingredient['co2e_kg']*(ing.amount/1000/servings), 0),
            recipe_ingredients: recipeIngredients.map((ingredient) => ({
                ingredient: ingredient.ingredient.id, // Updated to use `value`
                amount: ingredient.amount / servings,
                unit: ingredient.unit,
            })),
            cooking_time: cookingTime,
        };

        const response = await api.post('api/recipes/', newRecipe);
        navigate("/");


        const recipeId = response.data.id;

        if (recipeImage) {
            const formData = new FormData();
            formData.append('recipe_id', recipeId);
            formData.append('image', recipeImage);

            try {
                const uploadResponse = await api.patch(`api/recipes/${recipeId}/image/`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
                console.log("Image uploaded", uploadResponse);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }

        }
    };


  return (
    <div className="create-recipe-container">
      <div className="create-recipe-header">Create a New Recipe</div>

      <form className="recipe-form" onSubmit={handleCreateRecipe}>
        <input
          type="text"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
          placeholder="Recipe name"
          className="recipe-name-input"
          required
        />
        <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Enter cooking time in minutes"
            required
        />

        <div className="recipe-card-preview">
          <label className="image-upload-container" htmlFor="recipe-image">
            <input
              id="recipe-image"
              type="file"
              accept="image/png"
              onChange={handleImageChange}
              className="image-upload-input"
            />
            {imagePreview ? (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Recipe preview"
                  className="image-preview"
                />
              </div>
            ) : (
              <div className="image-upload-placeholder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Click to upload recipe image</span>
              </div>
            )}
          </label>

          <div className="recipe-content">

            <div className="recipe-ingredients">
                <div className="ingredient-header">
                <h3 className="section-title">Ingredients</h3>
                <div className="portion-control">
                    <label className="portionLabel">Portions</label>
                    <button
                        className="portion-button"
                        onClick={()=>setServings((servings)=> Math.max(2,(servings-2)))}
                    >
                        -
                    </button>
                    <input className="servingSize"
                           type="number"
                           readOnly="readOnly"
                           value={servings}
                           /*onChange={(e) => setServings(e.target.value)}*/
                           required
                    />

                    <button
                        className="portion-button"
                        onClick={() => setServings((servings) => Math.min(16, (servings + 2)))}
                    >
                        +
                    </button>
                </div>
                </div>

              <div className="ingredients-list">
                {recipeIngredients.map((ing, idx) => (
                  <div className="ingredient-item" key={idx}>
                    <RecipeIngredientItem
                      index={idx}
                      ingredient={ing}
                      onChange={(field, val) => handleChangeIngredient(idx, field, val)}
                      onDelete={() => handleDeleteIngredient(idx)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="add-ingredient-button"
                  onClick={handleAddIngredient}
                >
                  + Add Ingredient
                </button>
              </div>
            </div>

            <div className="recipe-instructions">
              <h3 className="section-title-instruction">Instructions</h3>
                <div className="instructions-list">
                    {recipeInstructions.map((instruction, index) => (
                        <div className="instruction-item" key={index}>
                            <RecipeInstructionItem
                                key={index}
                                index={index}
                                instruction={instruction}
                                onChange={(field, value) => handleChangeInstruction(index, field, value)}
                                onDelete={() => handleDeleteInstruction(index)}
                            />
                        </div>
                    ))}
                    <button className="addInstructionsButton" type="button" onClick={handleAddInstruction}>+ Add Instruction</button>
                </div>
            </div>

          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipePage;
