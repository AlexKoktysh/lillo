import { useState, useEffect } from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import DatePickerControl from "../../components/DatePicker/date-picker.js";
import "./text-field-control.scss";

function TextFieldControl(props) {
    const [value, setValue] = useState(props.item.value);

    const changeInput = (event) => {
        setValue(event.target.value);
        props.change(props.item.label, event.target.value);
    };
    const changeDate = (value) => {
        setValue(value);
    };
    useEffect(() => {
        setValue(props.item.value);
    }, [props]);

    return (
        <FormControl className="field">
            {!props.item.date
                ?
                <TextField
                    label={props.item.label}
                    select={props.item.select}
                    key={props.item.index}
                    size="small"
                    onChange={changeInput}
                    value={value}
                >
                    {props.item.select && props.item.currencies.map((option) => (
                        <MenuItem key={option.index} value={option.index}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                : <DatePickerControl item={props} change={changeDate} />
            }
        </FormControl>
    );
}

export default TextFieldControl;