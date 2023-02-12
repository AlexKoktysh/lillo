import { useEffect, useState } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes, getDataForCreateTtn } from "../../api/api";
import "./main-screen.scss";

function MainScreen() {
    const [value, setValue] = useState("");
    const [organization_types, setTypes] = useState({});
    const [ttn, setTtn] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            const startValue = response.find((item) => item.checked);
            startValue && setValue(startValue.value);
            setTypes(response);
        };
        fetch();
    }, []);

    const handleChange = async (value) => {
        setValue(value);
        const response = await getDataForCreateTtn();
        setTtn(response);
    };

    return (
        <div id="main-screen">
            {organization_types.length && <Form label="Выберите вид контрагента" items={organization_types} value={value} change={handleChange} />}
            {value && <ActCard ttn={ttn} />}
        </div>
    );
}

export default MainScreen;