/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Submit button input Form Component
 *
 */

import React from 'react';
import propTypes from "prop-types";

function SubmitButton(props){
    const { label, onClick } = props;
    return(
        <label>
            {props.label}
            <input type="submit" value="Submit" onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    label: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired
}

export default SubmitButton;
