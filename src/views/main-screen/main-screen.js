import { useEffect, useState, useMemo } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import { getOrganizationTypes, getDataForCreateTtn, fillTemplate } from "../../api/api";
import {
    dogovorDictionary_default,
    organizationInformation_default,
    contrAgents_default,
    availableTransport_default,
    commodityDictionary_default,
    unloading_basis,
    personInformation_default,
    tnOrTtnField,
    steps,
        } from "../../constants/index.js";
import "./main-screen.scss";
import moment from "moment/moment.js";

function MainScreen() {
    const [serverResult, setServerResult] = useState([]);
    const [organization_types_server, setOrganizationTypesServer] = useState("");
    const [organization_types, setTypes] = useState({});
    const [response, setResponse] = useState([]);
    const [step, setStep] = useState("");
    const [typesDelivery, setTypesDelivery] = useState([]);
    const [typesDelivery_server, setDelivery_server] = useState("");
    const [activeFormItems, setActiveFormItems] = useState([]);
    const [dogovorDictionary, setDogovorDictionary] = useState(dogovorDictionary_default);
    const [organizationInformation, setOrganizationInformation] = useState(organizationInformation_default);
    const [personInformation, setPersonInformation] = useState(personInformation_default);
    const [contrAgents, setContrAgents] = useState(contrAgents_default);
    const [availableTransport, setAvailableTransport] = useState(availableTransport_default);
    const [commodityDictionary, setCommodityDictionary] = useState(commodityDictionary_default);
    const [unloadingBasis, setUnloadingBasis] = useState(unloading_basis);
    const [tnOrTtn, setTnOrTtn] = useState(tnOrTtnField);
    const [resSteps, setResSteps] = useState(steps);
    const [isShowSample, setIsShowSample] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const response = await getOrganizationTypes();
            const startValue = response.find((item) => item.checked);
            startValue && setOrganizationTypesServer(startValue.value);
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
                return { setFunction: setDogovorDictionary,
                    items: dogovorDictionary,
                    funcDate: changeItem.controlValue
                                ? moment(changeItem.controlValue[value].doc_start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
                                : value,
                };
            case "3":
                return { setFunction: setContrAgents, items: contrAgents };
            case "5":
                return { setFunction: setAvailableTransport, items: availableTransport };
            case "4":
                return { setFunction: setCommodityDictionary, items: commodityDictionary };
            default:
                return {};
        }
    };
    const updatedItems = (changeItem, value) => {
        const field = changeItem?.controlInput ? changeItem.controlInput : changeItem.label;
        const { setFunction, items, funcDate } = checkStep(changeItem, value);
        const val = !Array.isArray(changeItem.controlInput) && changeItem.controlValue ? funcDate : value;
        setFunction(items?.map((item) => {
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
            const res = commodityDictionary.map((el) => {
                if (el.label === item.label) {
                    return {...el, value: x.id};
                } else {
                    return el;
                }
            })
            setCommodityDictionary(res);
        }
    };
    const addCar = (item, value) => {
        const x = item.currencies.find((el) => el.index === value);
        if (x) {
            const res = availableTransport.map((el) => {
                if (el.label === item.label) {
                    return {...el, value: x.index};
                } else {
                    return el;
                }
            });
            return setAvailableTransport(res);
        }
        const ind = item.currencies.length;
        const pushItem = {index: ind, label: value};
        const res = availableTransport.map((el) => {
            if (el.label === item.label) {
                return {...el, value: ind, currencies: [...el.currencies, pushItem]};
            } else {
                return el;
            }
        });
        setAvailableTransport(res);
    };
    const changeCommodityDictionary = (label, parenValue) => {
        const obj = Object.values(response.commodityDictionary);
        switch (label) {
            case "Цена за ед.":
                const price = obj.find((el) => el.id === parenValue).product_price.BYN;
                return price ? `${price}` : "";
            case "Единица измерения":
                const measure = obj.find((el) => el.id === parenValue).measure;
                return measure ? `${measure}` : "";
            default:
                return;
        }
    };
    const changeContrAgents = (label, parenValue) => {
        switch (label) {
            case "Доверенность":
                const number = response.ttnPersons[parenValue]?.rights_number;
                const date = response.ttnPersons[parenValue]?.rights_date;
                const showTextDate = `от ${date}`
                return number || date ? `${number} ${showTextDate}` : "";
            case "ФИО":
                const last_name = response.ttnPersons[parenValue]?.last_name;
                const name = response.ttnPersons[parenValue]?.name;
                const second_name = response.ttnPersons[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            default:
                return "";
        }
    };
    const changeAvailableTransport = (label, parenValue) => {
        switch (label) {
            case "Марка и гос. номер":
                const model = response.availableTransport[parenValue]?.car_model;
                const number = response.availableTransport[parenValue]?.car_number;
                return model || number ? `${model} ${number}` : "";
            case "ФИО водителя":
                const last_name = response.availableTransport[parenValue]?.last_name;
                const name = response.availableTransport[parenValue]?.name;
                const second_name = response.availableTransport[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            case "УНП перевозчика":
                return `${response.availableTransport[parenValue]?.driver_unp || ""}`;
            case "Пункт погрузки":
                return `${response.availableTransport[parenValue]?.loading_point_address || ""}`;
            case "Пункт разгрузки":
                return `${response.availableTransport[parenValue]?.unloading_point_address || ""}`;
            case "Номер путевого листа":
                return `${response.availableTransport[parenValue]?.waybill_number || ""}`;
            case "Вес груза":
                return `${response.availableTransport[parenValue]?.cargo || ""}`;
            default:
                return "";
        }
    };
    const expensiveCalculation = (items, changeFunction, setFunction, val) => {
        const controlsInput = items[val].controlInput;
        const parent = items.find((el) => el.select);
        if (parent.value !== "") {
            const controlItems = items.filter((el) => controlsInput.find((element) => el.label === element));
            const changeItems = controlItems.map((el) => {
                return {
                    ...el,
                    value: changeFunction(el.label, parent.value),
                };
            });
            const resultObj = items.map((el) => {
                const found = changeItems.find((element) => element.index === el.index);
                if (found) return found;
                return el;
            });
            setFunction(resultObj);
        }
    };
    useMemo(() => expensiveCalculation(availableTransport, changeAvailableTransport, setAvailableTransport, 0), [availableTransport[0].value]);
    useMemo(() => expensiveCalculation(contrAgents, changeContrAgents, setContrAgents, 4), [contrAgents[4].value]);
    useMemo(() => expensiveCalculation(commodityDictionary, changeCommodityDictionary, setCommodityDictionary, 0), [commodityDictionary[0].value]);

    const changeOrganizationTypes = async (value) => {
        setOrganizationTypesServer(value);
        const response = await getDataForCreateTtn();
        setResponse(response);
    };
    useEffect(() => {
        const x = response.length && response.commodityDictionary.filter((el) => el.value === "");
        if (!x?.length) {
            const res = commodityDictionary.map((el) => {
                return {  fieldName: el.fieldName, value: el.value }
            });
            res.push({ fieldName: "product_qty", value: "1"});
            res.push({ fieldName: "ttnProductQty", value: "1"});
            res.push({ fieldName: "fk_organisation", value: ""});
            res.push({ fieldName: "fk_user", value: ""});
            res.push({ fieldName: "notes", value: ""});
            res.push({ fieldName: "country_import", value: ""});
            res.push({ fieldName: "qty_cargo_place", value: ""});
            res.push({ fieldName: "product_weight", value: ""});
        }
    }, [commodityDictionary]);
    useEffect(() => {
        const typesDelivery_server = response.deliveryConditions?.map((el, index) => {
            return { index: index, label: el.label, value: index + 1 };
        });
        const contrAgents_server = contrAgents.map((element) => {
            const name = element.label;
            switch (name) {
                case "Отгрузку разрешил":
                    return {
                        ...element,
                        currencies: response.ttnPersons?.map((el, index) => {
                            return { ...el, index: index, label: el.last_name };
                        }),
                    };
                case "Груз сдал":
                    return {
                        ...element,
                        currencies: response.ttnPersons?.map((el, index) => {
                            return { ...el, index: index, label: el.last_name };
                        }),
                    };
                case "Товар к доставке принял":
                    return {
                        ...element,
                        currencies: response.ttnPersons?.map((el, index) => {
                            return { ...el, index: index, label: el.last_name };
                        }),
                        controlValue: response.ttnPersons,
                    }
                default:
                    return element;
            }
        });
        const dogovorDictionary_server = dogovorDictionary.map((element) => {
            const name = element.label;
            switch (name) {
                case "Номер счета":
                    return {
                        ...element,
                        value: response.docNumber || ""
                    };
                case "Номер договора":
                    return {
                        ...element,
                        select: response.dogovorNumbers?.length > 0,
                        currencies: response.dogovorDictionary?.map((el, index) => {
                            return { index: index, label: el.doc_number };
                        }),
                        controlValue: response.dogovorDictionary,
                    };
                default:
                    return element;
            }
        });
        const availableTransport_server = availableTransport.map((element) => {
            const name = element.label;
            switch (name) {
                case "Транспорт":
                    return {
                        ...element,
                        currencies: response.availableTransport?.map((el, index) => {
                            return { index: index, label: `${el.car_model} ${el.car_number}` };
                        }),
                        controlValue: response.availableTransport,
                    };
                default:
                    return element;
            }
        });
        const commodityDictionary_server = commodityDictionary.map((element) => {
            const name = element.label;
            switch (name) {
                case "Наименование товара":
                    return {
                        ...element,
                        currencies: response.commodityOptions?.map((el, index) => {
                            return { index: index, label: el };
                        }),
                        controlValue: response.commodityDictionary,
                    };
                default:
                    return element;
            }
        });
        const unloadingBasis_server = response.unloadingBasis || [];
        setUnloadingBasis(unloadingBasis_server);
        setAvailableTransport(availableTransport_server);
        setDogovorDictionary(dogovorDictionary_server);
        setTypesDelivery(typesDelivery_server);
        setContrAgents(contrAgents_server);
        setCommodityDictionary(commodityDictionary_server);
    }, [response]);
    const setContrAgent = () => {
        const controlValue = dogovorDictionary[3].value;
        const organizationInformation_server = organizationInformation.map((item) => {
            return {...item, value: controlValue !== "" ? response.contrAgents[controlValue][item.server] : "", disabled: true};
        });
        const personInformation_server = personInformation.map((item) => {
            return {...item, value: controlValue !== "" ? response.contrAgents[controlValue][item.server] : "", disabled: true};
        });
        const res = [
            {name: "Информация об организации", items: organizationInformation_server},
            {name: "Информация об уполномоченном лице", items: personInformation_server},
        ];
        setPersonInformation(personInformation_server);
        setOrganizationInformation(organizationInformation_server);
        setActiveFormItems(res);
    };
    useEffect(() => {
        if (step === "1") {
            setActiveFormItems(dogovorDictionary);
        }
        if (step === "2") {
            setContrAgent();
        }
        if (step === "3") {
            setActiveFormItems(contrAgents);
        }
        if (step === "4") {
            setActiveFormItems(commodityDictionary);
        }
        if (step === "5") {
            setActiveFormItems(availableTransport);
        }
    }, [step, dogovorDictionary, contrAgents, availableTransport, commodityDictionary]);
    useEffect(() => {
        const isAll_dogovorDictionary = dogovorDictionary.filter((el) => !el.value && el.require);
        if (!isAll_dogovorDictionary.length) {
            const dogovorDictionary_result = {
                docNumber: dogovorDictionary.find((el) => el.fieldName === "docNumber").value,
                check_start_date: dogovorDictionary.find((el) => el.fieldName === "check_start_date").value,
                doc_number: dogovorDictionary.find((el) => el.fieldName === "doc_number").value,
                doc_start_date: dogovorDictionary.find((el) => el.fieldName === "doc_start_date").value,
            };
        }
        const res = [...dogovorDictionary, ...organizationInformation, ...personInformation, ...contrAgents, ...availableTransport];
        setServerResult(res);
        const x = res.filter((el) => el.value === "");
        if (x.length <= 5) {
            setIsShowSample(true);
        } else {
            setIsShowSample(false)
        }
        // organization_types_server тип организации (ИП, ООО)
        // typesDelivery_server вид оплаты (пред, пост и т.д.)
        // unloadingBasis вид энтити (договор или счет) массив
    }, [dogovorDictionary, organizationInformation, personInformation, contrAgents, availableTransport, commodityDictionary]);
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
    const changeDate = (label, value) => {
        switch (label) {
            case "Дата начала счета":
                const resDog = dogovorDictionary.map((el) => {
                    if (el.label === label) {
                        return {
                            ...el,
                            value
                        };
                    }
                    return el;
                });
                setDogovorDictionary(resDog);
                break;
            case "Дата отгрузки":
                const resDict = contrAgents.map((el) => {
                    if (el.label === label) {
                        return {
                            ...el,
                            value
                        };
                    }
                    return el;
                });
                setContrAgents(resDict);
                break;
            default:
                return;
        }
    };

    return (
        <div id="main-screen">
            {organization_types.length && <Form label="Выберите вид контрагента" items={organization_types} value={organization_types_server} change={changeOrganizationTypes} />}
            {organization_types_server
                &&
                <ActCard
                    unloadingBasis={unloadingBasis}
                    delivery={typesDelivery_server}
                    changeDelivery={(deliv) => setDelivery_server(deliv)}
                    changeType={changeType}
                    changeStep={(step) => setStep(step)}
                    items={activeFormItems}
                    updatedItems={updatedItems}
                    typesDelivery={typesDelivery}
                    addCar={addCar}
                    addProduct={addProduct}
                    tnOrTtn={tnOrTtn}
                    changeTnOrTtn={changeTnOrTtn}
                    resSteps={resSteps}
                    isShowSample={isShowSample}
                    clickSample={clickSample}
                    changeDate={changeDate}
                />}
        </div>
    );
}

export default MainScreen;