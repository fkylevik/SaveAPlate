import React, { useEffect, useState } from 'react';
import '../styles/CreateRecipe.css';
import Select from "react-select";

function UnitSelector({ ingredient, onSelect }) {
    const massUnits = ['g', 'kg'];
    const volumeUnits = ['L', 'ml', 'tsp', 'tbsp', 'cup'];
    const piecesUnits = ['pieces'];

    const [selectedUnit, setSelectedUnit] = useState("");
    const [availableUnits, setAvailableUnits] = useState([]);

    const determineUnits = () => {
        if (!ingredient) return;
        try {
            let ingredientUnits = [ ...massUnits]
            if (ingredient.density_g_ml !== null) {
                ingredientUnits = [...ingredientUnits, ...volumeUnits];
            }
            if (ingredient.average_weight_g !== null) {
                ingredientUnits = [...ingredientUnits, ...piecesUnits];
            }

            const formattedUnits = ingredientUnits.map(unit => ({
                value: unit,
                label: unit,
            }))
            setSelectedUnit("")

            setAvailableUnits(formattedUnits);

        } catch (error) {
            console.error("Error fetching ingredient units: ", error);
            setAvailableUnits([])
        }

    };

    useEffect(() => {
        determineUnits();
    }, [ingredient])

    const handleUnitChange = (selectedOption) => {
        setSelectedUnit(selectedOption);
        onSelect(selectedOption ? selectedOption.value : null);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: "100%",
            maxHeight: "34px",
            borderRadius: "8px",
            textAlign: "left",
            color: "#764ba2",
            backgroundColor: "#fafafa",
            borderColor: "#679D72",
            borderWidth:"1px",
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "0px 8px",
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "100px",
            overflowY: "auto",
        }),
        option: (provided, state) => ({
            ...provided,
            height: "30px",
            border: "none",
            color: "#023436",
            textAlign: "left",
            backgroundColor: state.isSelected ? "lightgray" : "white",
            zIndex: "1",
        }),
    };

    return (
        <div className="recipe-ingredient-item-unit">
            <Select
                id="unit"
                isClearable
                placeholder="Unit.."
                value={selectedUnit}
                onChange={handleUnitChange}
                options={availableUnits}
                styles={customStyles}
            >
            </Select>
        </div>
  );
}

export default UnitSelector;