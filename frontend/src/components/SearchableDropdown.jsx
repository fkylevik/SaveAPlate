import { useState, useEffect } from "react";
import Select from "react-select";
import api from "../api";

function SearchableDropdown({ endpoint, searchPlaceholder, onSelect, value }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchObjects(""); // fetch objects upon render
    }, []);

    const fetchObjects = async (query) => {
        try {
            const response = await api.get(`api/${endpoint}/?search=${query}`);
            const items = response.data.map((object) => ({
                // Map the entire object into the options
                value: object.id,
                label: object.name,
                data: object, // entire fetched object is stored
            }));
            setOptions(items);
        } catch (error) {
            console.error("An error occurred while fetching objects!", error);
        }
    };

    const handleSelectChange = (option) => {
        if (option) {
            onSelect(option.data); // Pass the entire object stored in `data` to the parent
        } else {
            onSelect(null); // Handle clearing the selection
        }
    };

    const handleInputChange = (inputValue) => {
        fetchObjects(String(inputValue));
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: "300px",
            height: "50px",
            border: "none",
            borderRadius: "8px",
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#764ba2",
        }),
        option: (provided, state) => ({
            ...provided,
            border: "none",
            color: "#023436",
            textAlign: "left",
            backgroundColor: state.isSelected ? "lightgray" : "white",
            zIndex: "1",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#000000",
        }),
    };

    return (
        <Select
            isClearable
            value={value ? { label: value.name, value: value.id, data: value } : null} // Use the object's attributes for rendering
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            options={options}
            placeholder={searchPlaceholder}
            className="searchable-dropdown"
            styles={customStyles}
        />
    );
}

export default SearchableDropdown;
