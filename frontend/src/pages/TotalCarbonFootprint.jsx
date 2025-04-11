import {useState, useEffect} from "react"
import api from "../api";


function TotalCarbonFootprint () {
    const [recipes, setRecipes] = useState([]);
    const [totalFootprint, setTotalFootprint] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get("/api/recipes/");
                setRecipes(response.data);

                const total = response.data.reduce(
                    (sum, recipe) => sum + Number(recipe.carbon_footprint_kg_co2e || 0), 0
                );
                setTotalFootprint(total);
            } catch (error) {
                console.error("Failed to fetch recipes", error)
            }
        };
    }, []);

    return (
        <div>
            <h2>Total Carbon Footprint</h2>
            <p>{totalFootprint} kg CO₂e</p>

            <h3>Recipe List</h3>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        {recipe.name} — {recipe.carbon_footprint_kg_co2e} kg CO₂e
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TotalCarbonFootprint;
