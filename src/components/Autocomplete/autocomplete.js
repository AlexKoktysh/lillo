import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

function AutocompleteField(props) {
    const [label, setLabel] = useState("");
    const save = (event) => {
        const val = props.item.label === "Транспорт" ? event.target.value : event.currentTarget.innerText;
        props.saveCar(val)
    };
    const newCar = (event) => {
        if (props.item.label === "Транспорт") {
            props.saveCar(event.target.value)
        };
    };
    useEffect(() => {
        switch (props.item.label) {
            case "Транспорт":
                const car = props.item.value !== "" ? props.item.currencies.find((item) => item.index === props.item.value) : "";
                setLabel(car);
                break;
            case "Наименование товара":
                const obj = Object.values(props.item.controlValue);
                const product = props.item.value !== "" ? obj.find((el) => el.product_name === props.item.value) : "";
                const res = {index: product?.id || "", label: product?.product_name || ""};
                setLabel(res);
                break;
            default:
                break;
        }
    }, [props.item]);
    
    return (
        <Autocomplete
            id="free-solo-demo"
            size="small"
            freeSolo
            value={label}
            onChange={save}
            options={props.item.currencies?.map((option) => option)}
            renderInput={(params) => {
                return <TextField {...params} label={props.item.label} onChange={newCar} />
            }}
        />
    );
}

export default AutocompleteField;