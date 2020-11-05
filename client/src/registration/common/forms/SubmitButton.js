import React from 'react';
import propTypes from "prop-types";

function SubmitButton(props){
    return(
        <label>
            {props.label}
            <input type="submit" value="Submit" />
        </label>
    );
}

SubmitButton.propTypes = {
    label: propTypes.string.isRequired
}

export default SubmitButton