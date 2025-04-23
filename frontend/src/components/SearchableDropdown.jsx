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

        console.log("API Response:", response);
        console.log("Response data type:", typeof response.data);

        // Handle various response formats
        let dataArray = [];

        if (Array.isArray(response.data)) {
            dataArray = response.data;
        } else if (response.data && typeof response.data === 'object') {
            if (Array.isArray(response.data.results)) {
                dataArray = response.data.results;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                dataArray = response.data.data;
            } else {
                console.error("Unexpected response format:", response.data);
                dataArray = [];
            }
        }

        console.log("Data array to map:", dataArray);

        const items = dataArray.map((object) => ({
            value: object.id,
            label: object.name,
            data: object,
        }));
        setOptions(items);
    } catch (error) {
        console.error("An error occurred while fetching objects!", error);
        setOptions([]); // Set empty array on error
    }
};

    const handleSelectChange = (option) => {
        if (option) {
            onSelect(option.data); // pass selected object to parent
        } else {
            onSelect(null); // clear selection
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
