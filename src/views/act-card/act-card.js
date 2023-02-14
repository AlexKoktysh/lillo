import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import { checkType, steps, twoStepFields, threeStepFields, fourStepFields } from "../../constants/index.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";

function ActCard(props) {
    const [step, setStep] = useState("1");

    const changeStep = (value) => {
        setStep(value);
    };
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
            {/* <Form label="Выберите вид счета" items={checkType} change={handleChange} /> */}
            <div className="form">
                {listItems}
                <Form label="Заполняемая секция" value={step} items={steps} change={changeStep} />
            </div>
        </div>
    );
}

export default ActCard;