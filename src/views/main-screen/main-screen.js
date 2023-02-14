import { useEffect, useState } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes, getDataForCreateTtn } from "../../api/api";
import "./main-screen.scss";

function MainScreen() {
    const [isTypes, setIsTypes] = useState("");
    const [organization_types, setTypes] = useState({});
    const [ttn, setTtn] = useState([]);
    const [step, setStep] = useState("");
    const [activeForm, setActiveForm] = useState([]);
    const [one, setOne] = useState([
        { index: "0", value: "", label: "Номер счета" },
        { index: "1", value: "", label: "Дата начала счета", date: true },
        { index: "2", header: "Номер договора и дата начала" },
        {
            index: "3",
            value: "",
            label: "Номер договора",
            select: true,
            currencies: [],
            controlInput: "Дата начала договора",
            controlValue: "",
        },
        { index: "4", value: "", label: "Дата начала договора", date: true },
    ]);
    const [two, setTwo] = useState([
        { index: "0", value: "", label: "Ставка НДС, %" },
        { index: "1", value: "", label: "Сумма НДС" },
        { index: "2", value: "", label: "Общая сумма" },
    ]);
    const [result, setResult] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            const startValue = response.find((item) => item.checked);
            startValue && setIsTypes(startValue.value);
            setTypes(response);
        };
        fetch();
    }, []);

    const changeOrganizationTypes = async (value) => {
        setIsTypes(value);
        const response = await getDataForCreateTtn();
        setTtn(response);
    };
    const updatedItems = (changeItem, value) => {
        const field = changeItem.controlInput ? changeItem.controlInput : changeItem.label;
        const val = changeItem.controlValue ? changeItem.controlValue[value].doc_start_date : value;
        setOne(one.map((item) => {
            if (item.label === field) {
                return { ...item, value: val };
            } else {
                if (item.label === changeItem.label) {
                    return { ...item, value}
                } else {
                    return item;
                }
            }
        }));
    };
    useEffect(() => {
        console.log("result", result);
    }, [result]);
    useEffect(() => {
        const { docNumber, dogovorNumbers, dogovorDictionary } = ttn;
            const first = [
                { index: "0", value: docNumber || "", label: "Номер счета" },
                { index: "1", value: "", label: "Дата начала счета", date: true },
                { index: "2", header: "Номер договора и дата начала" },
                {
                    index: "3",
                    label: "Номер договора",
                    select: dogovorNumbers?.length > 0,
                    value: "",
                    currencies: dogovorDictionary?.map((el, index) => {
                        return { index: index, label: el.doc_number };
                    }),
                    controlInput: "Дата начала договора",
                    controlValue: dogovorDictionary,
                },
                { index: "4", value: "", label: "Дата начала договора", date: true },
            ];
            setOne(first);
    }, [ttn]);
    useEffect(() => {
        if (step === "1") {
            setActiveForm(one);
        }
        if (step === "2") {
            setActiveForm(two);
        }
    }, [step, one, two]);

    return (
        <div id="main-screen">
            {organization_types.length && <Form label="Выберите вид контрагента" items={organization_types} value={isTypes} change={changeOrganizationTypes} />}
            {isTypes && <ActCard changeStep={(step) => setStep(step)} items={activeForm} updatedItems={updatedItems} />}
        </div>
    );
}

export default MainScreen;