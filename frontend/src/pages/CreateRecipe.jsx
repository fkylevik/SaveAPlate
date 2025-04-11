import { useState } from "react";
import api from "../api.js";

function CreateRecipe () {
    const [recipeName, setRecipeName] = useState("")
    const [carbonFootprint, setCarbonFootprint] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instruction, setInstructions] = useState("")

    const handleCreateRecipe = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/recipes/", {
                name: recipeName,
                carbon_footprint_kg_co2e: carbonFootprint,
                instructions: instruction,
                recipe_ingredients: [{ingredient: {name: ingredients}, amount: 1, unit:"liter"}]
            });
        } catch (error) {
            console.log("Error occured", error)
        }

        setRecipeName("");
        setCarbonFootprint("");
        setIngredients("");
        setInstructions("");

    };

    return (
        <>
            <input
                placeholder="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            <input
                placeholder="Carbon Footprint (Integer)"
                value={carbonFootprint}
                onChange={(e) => setCarbonFootprint(e.target.value)}
                type="number"
            />
            <input
                placeholder="Instructions"
                value={instruction}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <input
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={handleCreateRecipe}>SUBMIT</button>
        </>
    )
}

export default CreateRecipe;