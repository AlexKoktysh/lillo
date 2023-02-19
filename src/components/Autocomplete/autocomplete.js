import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

function AutocompleteField(props) {
    const [label, setLabel] = useState("")
    const save = (event) => {
        props.saveCar(event.target.value)
    };
    useEffect(() => {
        const label = props.value ? props.currencies.find((item) => item.index === props.value) : "";
        const x = label && label.label;
        x && setLabel(x);
    });
    return (
        <Autocomplete
            id="free-solo-demo"
            size="small"
            freeSolo
            onBlur={save}
            options={props.currencies.map((option) => option.label)}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    );
}

export default AutocompleteField;