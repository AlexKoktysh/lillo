import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment.js";

function DatePickerControl(props) {
    const defaultDate = props.item.value ? moment(props.item.value, 'YYYY-MM-DD').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    const [date, setDate] = useState(defaultDate);
    const change = (value) => {
        const date = moment(value.$d).format('YYYY-MM-DD');
        setDate(date);
        props.change(date);
    };
    useEffect(() => {
        setDate(defaultDate);
    }, [defaultDate]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                inputFormat="DD.MM.YYYY"
                value={date}
                onChange={(newValue) => change(newValue)}
                renderInput={(params) => <TextField {...params} size="small" />}
            />
        </LocalizationProvider>
    );
}

export default DatePickerControl;