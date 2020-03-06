import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Strawberry' },
    { value: '3', label: 'Vanilla' },
    { value: '4', label: 'Promphet' },
    { value: '5', label: 'Rohu' },
    { value: 'katla', label: 'Katla' }
];

function ReactSelect(props) {
    const [selectedOption, setSelectedOption] = useState();

    const handleChange = selectedOption => {
        //this.setState({ selectedOption });
        setSelectedOption(selectedOption);
        console.log(`Option selected: child : `, selectedOption);
        props.onClassChange(selectedOption);
    };

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isMulti={true}
                autoFocus={false}
                placeholder="Please select options"
            />
            <pre>
                {JSON.stringify(selectedOption, null, 4)}
            </pre>
        </div>
    );
}

export default ReactSelect;