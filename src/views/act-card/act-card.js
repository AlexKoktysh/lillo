import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import { steps, types } from "../../constants/index.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";

function ActCard(props) {
    const [step, setStep] = useState("1");
    const [type, setType] = useState(props.type);
    const [position, setPosition] = useState("1");

    const pos = [
        { index: "0", value: "1", label: "1" },
        { index: "1", value: "2", label: "2" },
    ];

    const changeStep = (value) => {
        setStep(value);
    };
    const changeType = (value) => {
        setType(value);
    };
    const changePosition = (value) => {
        setPosition(value);
    };
    useEffect(() => {
        type && props.changeType(type);
    });
    useEffect(() => {
        step && props.changeStep(step);
    });
    const change = (changeItem, value) => {
        props.updatedItems(changeItem, value);
    };
    const listItems = props.items.map((item) =>
        !item.header
            ? <TextFieldControl item={item} key={item.index} change={change} />
            : <div key={item.index} className="header">{item.header}</div>
    );

    return (
        <div id="card">
            {step === "1" && <Form label="Выберите вид счета" value={type} items={types} change={changeType} />}
            <div className="form">
                {position.length > 0 && step === "7" && <Form label="Позиция" value={position} items={pos} change={changePosition} />}
                {listItems}
                <Form label="Заполняемая секция" value={step} items={steps} change={changeStep} />
            </div>
        </div>
    );
}

export default ActCard;