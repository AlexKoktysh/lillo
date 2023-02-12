import { useState, useEffect } from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import DatePickerControl from "../../components/DatePicker/date-picker.js";
import "./text-field-control.scss";

function TextFieldControl(props) {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        props.change(props.item.label, value);
    });

    return (
        <FormControl className="field">
            {!props.item.date
                ?
                <TextField
                    label={props.item.label}
                    select={props.item.select}
                    key={props.item.index}
                    size="small"
                    onChange={handleChange}
                    defaultValue=""
                >
                    {props.item.select && props.item.currencies.map((option) => (
                        <MenuItem key={option.index} value={option.index}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                : <DatePickerControl />
            }
        </FormControl>
    );
}

export default TextFieldControl;