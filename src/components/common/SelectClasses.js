import React, { useState, useEffect } from 'react';
import Select from 'react-select';


function getUnique(arr, comp) {
    const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
};


function SelectClasses(props) {
    const [selectedOption, setSelectedOption] = useState();
    const [options, setOptions] = useState();

    useEffect(() => {
        var options = props.classSubjects.map(cs => {
            return {
                value: cs.classID,
                label: cs.classDesc
            }
        })
        setOptions(getUnique(options, 'value'));
    }, [props.classSubjects])

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        //console.log(`Option selected: child : `, selectedOption);
        props.onClassChange(selectedOption);
    };

    //console.log('props.classSubjects', props.classSubjects);

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isMulti={true}
                autoFocus={false}
				closeMenuOnSelect={false}
                placeholder="Please select the classes available to the account"
            />
            {/* <pre>
                {JSON.stringify(selectedOption, null, 4)}
            </pre> */}
        </div>
    );
}

export default SelectClasses;