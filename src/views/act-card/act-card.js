import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import { checkType, steps, twoStepFields, threeStepFields, fourStepFields } from "../../constants/index.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";

function ActCard(props) {
    const rezultFieldsValue = {};
    // const [value, setValue] = useState("");
    const [step, setStep] = useState("1");
    // const [first, setFirst] = useState([]);
    // const [doc_start_date, setDocStartDate] = useState("");

    // const handleChange = (value) => {
    //     setValue(value);
    // };
    // useEffect(() => {
    //     value && console.log("Запрос на сервер", value);
    // });
    // useEffect(() => {
    //     const { docNumber, dogovorNumbers } = props.ttn;
    //     (docNumber || dogovorNumbers) && setFirst([
    //         { index: "0", value: docNumber || "", label: "Номер счета" },
    //         { index: "1", label: "Дата начала счета", date: true },
    //         { index: "2", header: "Номер договора и дата начала" },
    //         {
    //             index: "3",
    //             label: "Номер договора",
    //             select: dogovorNumbers.length > 0,
    //             currencies: dogovorNumbers.map((el, index) => {
    //                 return { index: index, label: el };
    //             }),
    //         },
    //         { index: "4", value: doc_start_date, label: "Дата начала договора", date: true },
    //     ]);
    // }, [props.ttn]);

    const changeStep = (value) => {
        setStep(value);
    };
    useEffect(() => {
        step && props.changeStep(step);
    });

    // const listFirstStep = first.map((item) =>
    //     !item.header
    //         ? <TextFieldControl item={item} key={item.index} change={change} />
    //         : <div key={item.index} className="header">{item.header}</div>
    // );
    // const listTwoStep = twoStepFields.map((item) =>
    //     <TextFieldControl item={item} key={item.index} change={change} />
    // );
    // const listThreeStep = threeStepFields.map((item) =>
    //     <TextFieldControl key={item.index} item={item} change={change} />
    // );
    // const listFourStep = fourStepFields.map((item) =>
    //     <TextFieldControl key={item.index} item={item} change={change} />
    // );
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