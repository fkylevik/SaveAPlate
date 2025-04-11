import { useState, useEffect } from "react";
import Select from "react-select";
import api from "../api";

function SearchableDropdown({ endpoint, searchPlaceholder }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // No initial object

    useEffect(() => {
        // Fetch all objects initially
        fetchObjects("");
    }, []);

    const fetchObjects = async (query) => {
        try {
            const response = await api.get(`api/${endpoint}/?search=${query}`);
            const items = response.data.map(object => ({
                value: object.id,
                label: object.name
            }));
            setOptions(items);
        } catch (error) {
            console.error("An error occurred while fetching objects!", error);
        }
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option); // Update selected option
    };

    const handleInputChange = (inputValue) => {
        fetchObjects(String(inputValue)); // Fetch objects based on input
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
            color: "#fff",
        })
    }

    return (
        <Select
            value={selectedOption} // No initial value, starts as null
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
