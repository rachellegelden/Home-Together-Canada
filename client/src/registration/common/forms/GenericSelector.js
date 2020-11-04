import React from 'react';
import Select from 'react-select';

// takes Nx2 Array as props
function GenericSelector(props) {
    const options = props.options;
    const [option, setOption] = React.useState(options[0]);

    return (
        <Select
            options={options}
            value={option}
            onChange={(value) => {
                console.log(value);
                setOption(value);
            }}
        />
    );
}

export default GenericSelector