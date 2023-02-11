import { useState, useEffect } from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import "./text-field-control.scss";

function TextFieldControl(props) {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        props.change(props.name, value);
    });

    return (
        <FormControl className="field">
            <TextField
                label={props.name}
                select={props.select}
                id={props.value}
                size="small"
                onChange={handleChange}
                defaultValue=""
            >
                {props.select && props.currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
}

export default TextFieldControl;