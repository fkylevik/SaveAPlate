// SearchableDropdown.jsx
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
            const items = response.data.map((object) => ({ // map relevant data
                value: object.id,
                label: object.name,
            }));
            setOptions(items);
        } catch (error) {
            console.error("An error occurred while fetching objects!", error);
        }
    };

    const handleSelectChange = (option) => {
        onSelect(option); // pass selected object to parent element
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
            backgroundColor: "white",
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
            color: "black",
        }),
    };

    return (
        <Select
            isClearable
            value={value}
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
