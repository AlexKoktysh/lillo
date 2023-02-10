import { useEffect, useState } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes } from "../../api/api";
import "./main-screen.scss";

function MainScreen() {
    const [value, setValue] = useState("");
    const [organization_types, setTypes] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            setTypes(response);
        };
        fetch();
    }, []);

    const handleChange = (value) => {
        setValue(value);
    };

    return (
        <div id="main-screen">
            {organization_types.length && <Form label="Выберите вид контрагента" items={organization_types} value={value} change={handleChange} />}
            {value && <ActCard />}
        </div>
    );
}

export default MainScreen;