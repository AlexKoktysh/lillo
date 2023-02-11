import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import { checkType, firstStepFields, steps, twoStepFields, threeStepFields, fourStepFields } from "../../constants/index.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";

function ActCard() {
    const rezultFieldsValue = {};
    const [value, setValue] = useState("");
    const [step, setStep] = useState("1");

    const handleChange = (value) => {
        setValue(value);
    };
    useEffect(() => {
        value && console.log("Запрос на сервер", value);
    });

    const changeStep = (value) => {
        setStep(value);
    };
    useEffect(() => {
        step && console.log("Step", step);
    });

    const change = (field, value) => {
        rezultFieldsValue[field] = value;
        console.log("Инпут измененен", field, value);
    };

    const listFirstStep = firstStepFields.map((item) =>
        !item.header
            ? <TextFieldControl key={item.index} value={item.value} name={item.label} change={change} />
            : <div key={item.index} className="header">{item.header}</div>
    );
    const listTwoStep = twoStepFields.map((item) =>
        <TextFieldControl select={item.select} currencies={item.currencies} key={item.index} value={item.value} name={item.label} change={change} />
    );
    const listThreeStep = threeStepFields.map((item) =>
        <TextFieldControl key={item.index} value={item.value} name={item.label} change={change} />
    );
    const listFourStep = fourStepFields.map((item) =>
        <TextFieldControl key={item.index} value={item.value} name={item.label} change={change} />
    );

    return (
        <div id="card">
            <Form label="Выберите вид счета" items={checkType} change={handleChange} />
            <div className="form">
                {step === "1" && listFirstStep}
                {step === "2" && listTwoStep}
                {step === "3" && listThreeStep}
                {step === "4" && listFourStep}
                <Form label="Заполняемая секция" value={step} items={steps} change={changeStep} />
            </div>
        </div>
    );
}

export default ActCard;