import { useState } from "react";
import api from "../api.js";
import SearchableDropdown from "../components/SearchableDropdown.jsx";

function CreateRecipe () {
    const [recipeName, setRecipeName] = useState("")
    const [instruction, setInstructions] = useState("")
    const [recipeIngredients, setRecipeIngredients] = useState([{
        ingredient: null,
        amount: "",
        unit: ""
    },]);

     // Add a new ingredient row to the list
    const addIngredientRow = () => {
        setRecipeIngredients( [
                ...recipeIngredients,
                {ingredient: null, amount: "", unit: ""}
            ]);
    };

    // Update a specific ingredient row when an ingredient is selected
    const handleIngredientSelect = (selectedOption, index) => {
        const newIngredients = recipeIngredients.map((ing, idx) =>
            idx === index ? {...ing, ingredient: selectedOption } : ing
    );
        setRecipeIngredients(newIngredients)
    };

    // Update specific ingredient rows amount
    const handleIngredientAmountChange = (e, index) => {
        const { value } = e.target;
        const newIngredients = recipeIngredients.map((ing, idx) =>
            idx === index ? { ...ing, amount: value } : ing
         );
    setRecipeIngredients(newIngredients);
    };

    // Update a specific ingredient row's unit
    const handleIngredientUnitChange = (e, index) => {
        const { value } = e.target;
        const newIngredients = recipeIngredients.map((ing, idx) =>
          idx === index ? { ...ing, unit: value } : ing
        );
        setRecipeIngredients(newIngredients);
      };

    const handleCreateRecipe = async (e) => {
        e.preventDefault();

        const payload = {
            name: recipeName,
            instructions: instruction,
            recipe_ingredients: recipeIngredients.map((ing) => ({
                ingredient: { name: ing.ingredient?.label || ""},
                amount: ing.amount,
                unit: ing.unit
            })),
        };

        try {
            await api.post("/api/recipes/", payload);
        } catch (error) {
            console.log("Error occured", error)
        }

        // Clear the form fields after submission
        setRecipeName("");
        //setCarbonFootprint("");
        //setIngredients("");
        setInstructions("");

    };

    return (
        <form onSubmit={handleCreateRecipe}>
            <div>
                <input
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </div>

            <div>
                <textarea
                    placeholder={"Instructions"}
                    value={instruction}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows="4"
                    cols="50"
                />
            </div>

            <div>
                <h3>Ingredients</h3>
                {recipeIngredients.map((ing, index) => (
                    <div key={index} style={{marginBottom: "10px"}}>
                        <SearchableDropdown
                            endpoint="ingredients"
                            searchPlaceholder="Select Ingredient"
                            onSelect={(e) => handleIngredientSelect(e, index)}
                            value = {ing.ingredient}
                        />

                        <input
                            placeholder="Amount"
                            value = {ing.amount}
                            onChange={(e) => handleIngredientAmountChange(e, index)}
                            type = "number"

                        />

                        <input
                            placeholder="Unit"
                            value = {ing.unit}
                            onChange={(e) => handleIngredientUnitChange(e, index)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addIngredientRow}>
                    Add Ingredient
                </button>
            </div>
            <div>
                <button type="submit">SUBMIT</button>
            </div>



        </form>
    );
}

export default CreateRecipe;