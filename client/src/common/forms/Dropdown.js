/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description:  Re-usable Dropdown Component
 *
 */

import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import propTypes from "prop-types";

function Dropdown(props) {
    const {isSearchable, name, placeholder, options, onChange} = props;

    const [selected, setSelected] = useState("");

    // this code is run every time selected changes
    useEffect(() => {
        // this onChange function is the callback from the parent component
        onChange(selected);
        // that can be used to get the value that is inside the dropdown
    }, [selected]);


    const newStyling = {
        control: base => ({
                ...base,
                "margin-top": 8,
                borderColor: "#e2e8f0",
                "margin-bottom": 16,
            }
        ),
        menuPortal: base => ({...base, zIndex: 9999}),
    }


    return (
        <div>
            <Select isSearchable={isSearchable} placeholder={placeholder}
                    options={options} value={options.find(obj => obj.label === selected)}
                    onChange={(e) => setSelected(e)}
                    name={name}
                    menuPortalTarget={document.body}
                    styles={newStyling}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 8,
                        colors: {
                            ...theme.colors,
                            neutral50: '#A0AEBF',  // Placeholder color
                        }
                    })}
            />
        </div>
    );
}

Dropdown.propTypes = {
    options: propTypes.array.isRequired,
    name: propTypes.string,
    isSearchable: propTypes.bool,
    placeholder: propTypes.string,
    onChange: propTypes.func
};

export default Dropdown;
