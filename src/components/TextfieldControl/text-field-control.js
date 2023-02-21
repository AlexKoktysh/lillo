import { useState, useEffect } from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import DatePickerControl from "../../components/DatePicker/date-picker.js";
import "./text-field-control.scss";
import Autocomplete from "../Autocomplete/autocomplete.js";

function TextFieldControl(props) {
    const [value, setValue] = useState(props.item.value);

    const changeInput = (event) => {
        setValue(event.target.value);
        props.change(props.item, event.target.value);
    };
    const changeDate = (label, value) => {
        setValue(value);
        props.changeDate(label, value);
    };
    useEffect(() => {
        setValue(props.item.value);
    }, [props.item.value]);
    const saveCar = (value) => {
        switch(props.item.label) {
            case "Наименование товара":
                return props.addProduct(props.item, value);
            case "Транспорт":
                return props.addCar(props.item, value);
            default:
                return;
        }
    };

    return (
        <FormControl className="field">
            {!props.item.date
                ?
                (
                    !props.item.autocomplete
                        ? (
                            <TextField
                                label={props.item.label}
                                select={props.item.select}
                                key={props.item.index}
                                size="small"
                                onChange={changeInput}
                                value={value}
                                disabled={props.item.disabled}
                            >
                                {props.item.select && props.item.currencies.map((option) => (
                                    <MenuItem key={option.index} value={option.index}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )
                        : (<Autocomplete item={props.item} key={props.item.index} saveCar={saveCar} />)
                )
                : <DatePickerControl item={props.item} change={changeDate} />
            }
        </FormControl>
    );
}

export default TextFieldControl;