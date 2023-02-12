import { useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment.js";

function DatePickerControl() {
    const [date, setDate] = useState(moment());
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                inputFormat="DD.MM.YYYY"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} size="small" />}
            />
        </LocalizationProvider>
    );
}

export default DatePickerControl;