import { useEffect, useState, useCallback, useMemo } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes, getDataForCreateTtn, fillTemplate } from "../../api/api";
import { firstStepFields, twoStepFields, threeStepFields, tnFields, carFields, entityFields, unloading_basis, threeTwoStepFields, tnOrTtnField, steps } from "../../constants/index.js";
import "./main-screen.scss";
import moment from "moment/moment.js";

function MainScreen() {
    const [serverResult, setServerResult] = useState([]);
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
    const [carField, setCarField] = useState(carFields);
    const [entity, setEntity] = useState(entityFields);
    const [pos, setPos] = useState([]);
    const [unloadingBasis, setUnloadingBasis] = useState(unloading_basis);
    const [tnOrTtn, setTnOrTtn] = useState(tnOrTtnField);
    const [resSteps, setResSteps] = useState(steps);
    const [isShowSample, setIsShowSample] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            const startValue = response.find((item) => item.checked);
            startValue && setIsTypes(startValue.value);
            setTypes(response);
        };
        fetch();
    }, []);
    useEffect(() => {
        const item = tnOrTtn.find((el) => el.checked)?.label;
        if (item === "ТТН") {
            const step = { index: "4", value: "5", label: "5" };
            const item = resSteps.find((el) => el.label === "5");
            !item && setResSteps([...resSteps, step]);
        } else {
            const res = resSteps.filter((el) => el.label !== "5");
            setResSteps(res);
        }
    }, [tnOrTtn]);
    const checkStep = (changeItem, value) => {
        switch (step) {
            case "1":
                return { func: setOne,
                    items: one,
                    funcDate: changeItem.controlValue
                                ? moment(changeItem.controlValue[value].doc_start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
                                : value,
                };
            case "3":
                return { func: setTnField, items: tnField };
            case "4":
                return { func: setCarField, items: carField };
            case "5":
                return { func: setEntity, items: entity };
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
    const addProduct = (item, value) => {
        const y = Object.values(item.controlValue);
        const x = y?.find((el) => el.product_name === value);
        if (x) {
            const res = entity.map((el) => {
                if (el.label === item.label) {
                    return {...el, value: x.id};
                } else {
                    return el;
                }
            })
            setEntity(res);
        }
    };
    const addCar = (item, value) => {
        const x = item.currencies.find((el) => el.label === value);
        if (x) {
            const res = carField.map((el) => {
                if (el.label === item.label) {
                    return {...el, value: x.index};
                } else {
                    return el;
                }
            });
            setCarField(res);
        } else {
            const ind = item.currencies.length;
            const pushItem = {index: ind, label: value};
            const res = carField.map((el) => {
                if (el.label === item.label) {
                    return {...el, value: ind, currencies: [...el.currencies, pushItem]};
                } else {
                    return el;
                }
            });
            setCarField(res);
        }
    };
    const setProduct = (label, parenValue) => {
        const { commodityDictionary } = ttn;
        const obj = Object.values(commodityDictionary);
        switch (label) {
            case "Цена за ед.":
                const x = obj.find((el) => el.id === parenValue).product_price.BYN;
                return x ? `${x}` : "";
            default:
                return;
        }
    };
    const setTn = (label, parenValue) => {
        const { ttnPersons } = ttn;
        switch (label) {
            case "Доверенность":
                const number = ttnPersons[parenValue]?.rights_number;
                const date = ttnPersons[parenValue]?.rights_date;
                const showTextDate = `от ${date}`
                return number || date ? `${number} ${showTextDate}` : "";
            case "ФИО":
                const last_name = ttnPersons[parenValue]?.last_name;
                const name = ttnPersons[parenValue]?.name;
                const second_name = ttnPersons[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            default:
                return "";
        }
    };
    const setValue = (label, parenValue) => {
        const { availableTransport } = ttn;
        switch (label) {
            case "Марка и гос. номер":
                const model = availableTransport[parenValue]?.car_model;
                const number = availableTransport[parenValue]?.car_number;
                return model || number ? `${model} ${number}` : "";
            case "ФИО водителя":
                const last_name = availableTransport[parenValue]?.last_name;
                const name = availableTransport[parenValue]?.name;
                const second_name = availableTransport[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            case "УНП перевозчика":
                return `${availableTransport[parenValue]?.driver_unp || ""}`;
            case "Пункт погрузки":
                return `${availableTransport[parenValue]?.loading_point_address || ""}`;
            case "Пункт разгрузки":
                return `${availableTransport[parenValue]?.unloading_point_address || ""}`;
            case "Номер путевого листа":
                return `${availableTransport[parenValue]?.waybill_number || ""}`;
            case "Вес груза":
                return `${availableTransport[parenValue]?.cargo || ""}`;
            default:
                return "";
        }
    };
    const expensiveCalculation = (item, funcValue, func, val) => {
        const controlsInput = item[val].controlInput;
        const parent = item.find((el) => el.select);
        if (parent.value !== "") {
            const controlItems = item.filter((el) => controlsInput.find((element) => el.label === element));
            const changeItems = controlItems.map((el) => {
                return {
                    ...el,
                    value: () => funcValue(el.label, parent.value),
                };
            });
            const resultObj = item.map((el) => {
                const found = changeItems.find((element) => element.index === el.index);
                if (found) return found;
                return el;
            });
            func(resultObj);
        }
    };
    useMemo(() => expensiveCalculation(carField, setValue, setCarField, 0), [carField[0].value]);
    useMemo(() => expensiveCalculation(tnField, setTn, setTnField, 4), [tnField[4].value]);
    useMemo(() => expensiveCalculation(entity, setProduct, setEntity, 0), [entity[0].value]);

    const changeOrganizationTypes = async (value) => {
        setIsTypes(value);
        const response = await getDataForCreateTtn();
        setTtn(response);
    };
    useEffect(() => {
        const { docNumber, dogovorNumbers, dogovorDictionary, deliveryConditions, availableTransport, unloadingBasis, ttnPersons, commodityOptions, commodityDictionary } = ttn;
        const deliv = deliveryConditions?.map((el, index) => {
            return { index: index, label: el.label, value: index + 1 };
        });
        const fieldsEntity = [
            { index: "0", value: "", label: "Дата отгрузки", date: true },
            { index: "1", value: "", label: "Основания отгрузки" },
            {
                index: "2",
                value: "",
                label: "Отгрузку разрешил",
                select: true,
                currencies: ttnPersons?.map((el, index) => {
                    return { ...el, index: index, label: el.last_name };
                }),
            },
            { 
                index: "3",
                value: "",
                label: "Груз сдал",
                select: true,
                currencies: ttnPersons?.map((el, index) => {
                    return { ...el, index: index, label: el.last_name };
                }),
            },
            { 
                index: "4",
                value: "",
                label: "Товар к доставке принял",
                select: true,
                currencies: ttnPersons?.map((el, index) => {
                    return { ...el, index: index, label: el.last_name };
                }),
                controlInput: ["Доверенность", "ФИО"],
                controlValue: ttnPersons,
            },
            { index: "5", value: "", label: "Доверенность" },
            { index: "6", value: "", label: "ФИО" },
        ];
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
        const product = [
            {
                index: "0",
                value: "",
                autocomplete: true,
                select: true,
                label: "Наименование товара",
                currencies: commodityOptions?.map((el, index) => {
                    return { index: index, label: el };
                }),
                controlInput: ["Цена за ед."],
                controlValue: commodityDictionary,
            },
            { index: "1", value: "", label: "Единица измерения" },
            { index: "2", value: "", label: "Количество" },
            { index: "3", value: "", label: "Цена за ед." },
            { index: "4", value: "", label: "Стоимость по количеству" },
            { index: "5", value: "", label: "Ставка НДС, %" },
            { index: "6", value: "", label: "Сумма НДС" },
            { index: "7", value: "", label: "Стоимость с НДС" },
        ];
        const basis = unloadingBasis || [];
        setUnloadingBasis(basis);
        setCarField(transport);
        setOne(first);
        setTypesDelivery(deliv);
        setTnField(fieldsEntity);
        setEntity(product);
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
            setActiveForm(carField);
        }
        if (step === "5") {
            setActiveForm(entity);
        }
    }, [step, one, tnField, carField]);
    useEffect(() => {
        const res = [...one, ...three, ...threeTwo, ...tnField, ...carField];
        setServerResult(res);
        const x = res.filter((el) => el.value === "");
        if (x.length <= 5) {
            setIsShowSample(true);
        } else {
            setIsShowSample(false)
        }
    }, [one, three, threeTwo, tnField, carField, entity]);
    const changeType = (value) => {
        const changeUnloadingBasis = unloadingBasis.map((el) => {
            return el.value == value ? { ...el, checked: true } : el;
        });
        setUnloadingBasis(changeUnloadingBasis);
    };
    const changeTnOrTtn = (val) => {
        const changeItem = tnOrTtn.map((el) => {
            if (el.value === val) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setTnOrTtn(changeItem);
    };
    const clickSample = async () => {
        await fillTemplate(serverResult);
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
                    addCar={addCar}
                    addProduct={addProduct}
                    tnOrTtn={tnOrTtn}
                    changeTnOrTtn={changeTnOrTtn}
                    resSteps={resSteps}
                    isShowSample={isShowSample}
                    clickSample={clickSample}
                />}
        </div>
    );
}

export default MainScreen;