import { useEffect, useState, useCallback, useMemo } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes, getDataForCreateTtn } from "../../api/api";
import { firstStepFields, twoStepFields, threeStepFields, tnFields, ttnFields, carFields, entityFields, unloading_basis, threeTwoStepFields } from "../../constants/index.js";
import "./main-screen.scss";
import moment from "moment/moment.js";

function MainScreen() {
    const [isTypes, setIsTypes] = useState("");
    const [organization_types, setTypes] = useState({});
    const [ttn, setTtn] = useState([]);
    const [step, setStep] = useState("");
    const [typesDelivery, setTypesDelivery] = useState([]);
    const [delivery, setDelivery] = useState("");
    const [activeForm, setActiveForm] = useState([]);
    const [one, setOne] = useState(firstStepFields);
    const [three, setThree] = useState(threeStepFields);
    const [threeTwo, setThreeTwo] = useState(threeTwoStepFields);
    const [tnField, setTnField] = useState(tnFields);
    const [ttnField, setTtnField] = useState(ttnFields);
    const [carField, setCarField] = useState(carFields);
    const [entity, setEntity] = useState(entityFields);
    const [pos, setPos] = useState([]);
    const [unloadingBasis, setUnloadingBasis] = useState(unloading_basis);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            const startValue = response.find((item) => item.checked);
            startValue && setIsTypes(startValue.value);
            setTypes(response);
        };
        fetch();
    }, []);
    const checkStep = (changeItem, value) => {
        switch (step) {
            case "1":
                return { func: setOne,
                    items: one,
                    funcDate: changeItem.controlValue
                                ? moment(changeItem.controlValue[value].doc_start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
                                : value,
                };
            case "5":
                return { func: setCarField, items: carField };
            default:
                return {};
        }
    };
    const updatedItems = (changeItem, value) => {
        const field = changeItem?.controlInput ? changeItem.controlInput : changeItem.label;
        const { func, items, funcDate } = checkStep(changeItem, value);
        const val = !Array.isArray(changeItem.controlInput) && changeItem.controlValue ? funcDate : value;
        func(items?.map((item) => {
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
    const setValue = (label, parenValue) => {
        const { availableTransport } = ttn;
        switch (label) {
            case "Марка и гос. номер":
                return `${availableTransport[parenValue]?.car_model} ${availableTransport[parenValue]?.car_number}`;
            case "ФИО водителя":
                return `${availableTransport[parenValue]?.last_name} ${availableTransport[parenValue]?.name} ${availableTransport[parenValue]?.second_name}`;
            case "УНП перевозчика":
                return `${availableTransport[parenValue]?.driver_unp ? availableTransport[parenValue]?.driver_unp : ""}`;
            case "Пункт погрузки":
                return `${availableTransport[parenValue]?.loading_point_address}`;
            case "Пункт разгрузки":
                return `${availableTransport[parenValue]?.unloading_point_address}`;
            case "Номер путевого листа":
                return `${availableTransport[parenValue]?.waybill_number || ""}`;
            case "Вес груза":
                return `${availableTransport[parenValue]?.cargo || ""}`;
            default:
                return "";
        }
    };
    const expensiveCalculation = (item) => {
        const controlsInput = item[0].controlInput;
        const parent = item.find((el) => el.select);
        if (parent.value !== "") {
            const controlItems = item.filter((el) => controlsInput.find((element) => el.label === element));
            const changeItems = controlItems.map((el) => {
                return {
                    ...el,
                    value: setValue(el.label, parent.value),
                };
            });
            const resultObj = item.map((el) => {
                const found = changeItems.find((element) => element.index === el.index);
                if (found) return found;
                return el;
            });
            setCarField(resultObj);
        }
    };
    useMemo(() => expensiveCalculation(carField), [carField[0].value]);

    const changeOrganizationTypes = async (value) => {
        setIsTypes(value);
        const response = await getDataForCreateTtn();
        setTtn(response);
    };
    useEffect(() => {
        const { docNumber, dogovorNumbers, dogovorDictionary, deliveryConditions, availableTransport, unloadingBasis } = ttn;
        const deliv = deliveryConditions?.map((el, index) => {
            return { index: index, label: el.label, value: index + 1 };
        });
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
            { index: "4", value: "", label: "Дата начала договора", date: true, disabled: true, },
        ];
        const transport = [
            {
                index: "0",
                value: "",
                label: "Транспорт",
                select: true,
                autocomplete: true,
                currencies: availableTransport?.map((el, index) => {
                    return { index: index, label: `${el.car_model} ${el.car_number}` };
                }),
                controlInput: ["Марка и гос. номер", "ФИО водителя", "УНП перевозчика", "Пункт погрузки", "Пункт разгрузки", "Номер путевого листа", "Вес груза"],
                controlValue: availableTransport,
            },
            { index: "1", value: "", label: "Марка и гос. номер" },
            { index: "2", value: "", label: "ФИО водителя" },
            { index: "3", value: "", label: "УНП перевозчика" },
            { index: "4", value: "", label: "Пункт погрузки" },
            { index: "5", value: "", label: "Пункт разгрузки" },
            { index: "6", value: "", label: "Номер путевого листа" },
            { index: "7", value: "", label: "Вес груза" },
        ];
        const basis = unloadingBasis || [];
        setUnloadingBasis(basis);
        setCarField(transport);
        setOne(first);
        setTypesDelivery(deliv);
    }, [ttn]);
    const setContrAgent = () => {
        const { contrAgents } = ttn;
        const controlValue = one[3].value;
        const items = three.map((item) => {
            return {...item, value: controlValue !== "" ? contrAgents[controlValue][item.server] : "", disabled: true};
        });
        const itemsTwo = threeTwo.map((item) => {
            return {...item, value: controlValue !== "" ? contrAgents[controlValue][item.server] : "", disabled: true};
        });
        const res = [{name: "Информация об организации", items}, {name: "Информация об уполномоченном лице", items: itemsTwo}];
        setThreeTwo(itemsTwo);
        setThree(items);
        setActiveForm(res);
    };
    useEffect(() => {
        if (step === "1") {
            setActiveForm(one);
        }
        if (step === "2") {
            setContrAgent();
        }
        if (step === "3") {
            setActiveForm(tnField);
        }
        if (step === "4") {
            setActiveForm(ttnField);
        }
        if (step === "5") {
            setActiveForm(carField);
        }
        if (step === "6") {
            setActiveForm(entity);
        }
    }, [step, one, tnField, ttnField, carField]);
    const changeType = (value) => {
        const changeUnloadingBasis = unloadingBasis.map((el) => {
            return el.value == value ? { ...el, checked: true } : el;
        });
        setUnloadingBasis(changeUnloadingBasis);
    };

    return (
        <div id="main-screen">
            {organization_types.length && <Form label="Выберите вид контрагента" items={organization_types} value={isTypes} change={changeOrganizationTypes} />}
            {isTypes
                &&
                <ActCard
                    unloadingBasis={unloadingBasis}
                    delivery={delivery}
                    changeDelivery={(deliv) => setDelivery(deliv)}
                    changePos={(pos) => setPos(pos)}
                    changeType={changeType}
                    changeStep={(step) => setStep(step)}
                    items={activeForm}
                    updatedItems={updatedItems}
                    typesDelivery={typesDelivery}
                />}
        </div>
    );
}

export default MainScreen;