import { useEffect, useState } from "react";
import Form from "../../components/FormControl/form-control.js";
import { organizationTypes } from "../../constants/index.js";
import ActCard from "../act-card/act-card.js";
import API from "../../api/api";
import "./main-screen.scss";

function MainScreen() {
    const [value, setValue] = useState("");
    useEffect(() => {
        API.get("organisation_types");
    }, []);

    const handleChange = (value) => {
        setValue(value);
    };

    return (
        <div id="main-screen">
            {!value && <Form label="Выберите вид контрагента" items={organizationTypes} change={handleChange} />}
            {value && <ActCard />}
        </div>
    );
}

export default MainScreen;