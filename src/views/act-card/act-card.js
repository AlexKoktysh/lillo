import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
// import { steps } from "../../constants/index.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";
import AccordionControl from "../../components/Accordion/accordion-control.js";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

function ActCard(props) {
    const [step, setStep] = useState("1");
    const [type, setType] = useState("");
    const [delivery, setDelivery] = useState(props.delivery);
    const [position, setPosition] = useState("1");

    const pos = [
        { index: "0", value: "1", label: "1" },
        { index: "1", value: "2", label: "2" },
    ];
    const [entityType, setEntityType] = useState(props.tnOrTtn.find((el) => el.checked)?.value);
    useEffect(() => {
        const x = props.tnOrTtn.find((el) => el.checked)?.value;
        setEntityType(x);
    }, props.tnOrTtn);

    const changeStep = (value) => {
        setStep(value);
    };
    const changeType = (value) => {
        setType(value);
        value && props.changeType(value);
    };
    const changePosition = (value) => {
        setPosition(value);
    };
    const changeDelivery = (value) => {
        setDelivery(value);
    };
    const changeEntityType = () => {};
    // useEffect(() => {
    //     type && props.changeType(type);
    // });
    useEffect(() => {
        delivery && props.changeDelivery(delivery);
    });
    useEffect(() => {
        step && props.changeStep(step);
    });
    const change = (changeItem, value) => {
        props.updatedItems(changeItem, value);
    };
    const addCar = (item, value) => {
        props.addCar(item, value);
    };
    const listItems = step !== "2" && props.items.map((item) =>
        !item.header
            ? <TextFieldControl item={item} key={item.index} change={change} addCar={addCar} />
            : <div key={item.index} className="header">{item.header}</div>
    );

    return (
        <div id="card">
            {step === "1" && <Form label="Выберите вид счета" value={type} items={props.unloadingBasis} change={changeType} />}
            <div className="form">
                {position.length > 0 && step === "5" && <Form label="Позиция" value={position} items={pos} change={changePosition} />}
                {step === "3" && <Form label="Тип накладной" value={entityType} items={props.tnOrTtn} change={(val) => props.changeTnOrTtn(val)} />}
                {listItems}
                {step === "2" && Array.isArray(props.items[0].items) && <AccordionControl items={props.items} />}
                {step === "1" && props.typesDelivery && <Box sx={{ mb: 2 }}><Form label="Выберите вид поставки" value={delivery} items={props.typesDelivery} change={changeDelivery} /></Box>}
                <Form label="Заполняемая секция" value={step} items={props.resSteps} change={changeStep} />
                <Box sx={{ mb: 4, mt: 4 }}>
                    <Button onClick={props.clickSample} disabled={!props.isShowSample} color="secondary" variant="contained">Заполнить шаблон</Button>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Button disabled color="secondary" variant="contained">Создать</Button>
                </Box>
            </div>
        </div>
    );
}

export default ActCard;