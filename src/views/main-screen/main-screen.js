import { useEffect, useState, useMemo } from "react";
import Form from "../../components/FormControl/form-control.js";
import ActCard from "../act-card/act-card.js";
import {
    getOrganizationTypes,
    getDataForCreateTtn,
    sendTemplate,
    sendCommodityDictionary,
    showSection,
    deleteSection
} from "../../api/api";
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
import { setResponseMapper } from "../../use/setResponse.js";
import { changeDate_custom } from "../../use/changeDate.js";
import {
    changeAvailableTransport_result_custom,
    changeCommodity,
    changeContrAgentsResult_custom,
    changeDogovorDictionary_result_custom,
    changeMapper,
    changeTransport
} from "../../use/change_result_custom.js";

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
    const [isShowAddCommodityDictionary, setIsShowAddCommodityDictionary] = useState(false);
    const [commodityDictionary_result, setCommodityDictionary_result] = useState([]);
    const [productPosition, setProductPosition] = useState([{ index: 0, value: 1, label: 1 }]);
    const [productPosition_active, setProductPosition_active] = useState(1);
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
        const fetch = async () => {
            const response = await showSection(productPosition_active);
            const resArray = [...productPosition];
            if (response?.data?.sectionCount >= 1 && response.data.sectionCount + 1 > productPosition.length) {
                for (let i = 1; i < response.data.sectionCount + 1; i++) {
                    resArray.push({ index: i, value: i + 1, label: i + 1 })
                }
                setProductPosition(resArray);
            }
            if (response.status === 200) {
                const newCommodityDictionary = commodityDictionary?.map((element) => {
                    const value = response.data.columns[element.fieldName];
                    return {...element, value: value ? value : ""};
                });
                setCommodityDictionary(newCommodityDictionary);
            }
        };
        fetch();
    }, [productPosition_active]);
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
        const field = changeItem?.controlInput ? changeItem.controlInput : changeItem.fieldName;
        const { setFunction, items, funcDate } = checkStep(changeItem, value);
        const val = !Array.isArray(changeItem.controlInput) && changeItem.controlValue ? funcDate : value;
        setFunction(items?.map((item) => {
            if (item.fieldName === field) {
                return { ...item, value: val };
            } else {
                if (item.fieldName === changeItem.fieldName) {
                    return { ...item, value}
                } else {
                    return item;
                }
            }
        }));
    };
    const addProduct = (item, value) => {
        const server_product = Object.values(item.controlValue);
        const product = server_product?.find((el) => el.product_name === value);
        if (product) {
            const res = commodityDictionary?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value: product.product_name};
                } else {
                    return el;
                }
            })
            setCommodityDictionary(res);
        }
    };
    const addCar = (item, value) => {
        const car = item.currencies.find((el) => el.index === value);
        if (car) {
            const res = availableTransport?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value: car.index};
                } else {
                    return el;
                }
            });
            return setAvailableTransport(res);
        }
        const ind = item.currencies.length;
        const pushItem = {index: ind, label: value};
        const res = availableTransport?.map((el) => {
            if (el.fieldName === item.fieldName) {
                return {...el, value: ind, currencies: [...el.currencies, pushItem]};
            } else {
                return el;
            }
        });
        setAvailableTransport(res);
    };
    const changeCommodityDictionary = (fieldName, parenValue) => {
        if (!response?.commodityDictionary) {
            return;
        }
        return changeCommodity(response, fieldName, parenValue);
    };
    const changeContrAgents = (fieldName, parenValue) => {
        switch (fieldName) {
            case "rights_number":
                const number = response.ttnPersons[parenValue]?.rights_number;
                const date = response.ttnPersons[parenValue]?.rights_date;
                const showTextDate = `от ${date}`
                return number || date ? `${number} ${showTextDate}` : "";
            case "FIO":
                const last_name = response.ttnPersons[parenValue]?.last_name;
                const name = response.ttnPersons[parenValue]?.name;
                const second_name = response.ttnPersons[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            default:
                return "";
        }
    };
    const changeAvailableTransport = (fieldName, parenValue) => {
        if (!response?.availableTransport) {
            return;
        }
        return changeTransport(response, fieldName, parenValue);
    };
    const expensiveCalculation = (items, changeFunction, setFunction, val) => {
        const controlsInput = items[val].controlInput;
        const parent = items.find((el) => el.select && (el.fieldName !== "allowed_person_id" && el.fieldName !== "handed_person_id"));
        if (parent.value !== "") {
            const controlItems = items.filter((el) => controlsInput.find((element) => el.fieldName === element));
            const changeItems = controlItems?.map((el) => {
                return {
                    ...el,
                    value: changeFunction(el.fieldName, parent.value),
                };
            });
            const resultObj = items?.map((el) => {
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

    useMemo(() => {
        if (commodityDictionary[4].value && commodityDictionary[6].value) {
            const sum = commodityDictionary[4].value + commodityDictionary[6].value;
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "product_cost_with_vat") {
                    return {
                        ...element,
                        value: sum,
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[4].value, commodityDictionary[6].value]);
    useMemo(() => {
        if (commodityDictionary[4].value && commodityDictionary[5].value) {
            const sum = commodityDictionary[4].value * (commodityDictionary[5].value / 100);
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "ttn_product_vat_sum") {
                    return {
                        ...element,
                        value: sum,
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[4].value, commodityDictionary[5].value]);
    useMemo(() => {
        if (commodityDictionary[2].value && commodityDictionary[3].value) {
            const sum = commodityDictionary[2].value * commodityDictionary[3].value;
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "product_cost") {
                    return {
                        ...element,
                        value: sum,
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[2].value, commodityDictionary[3].value]);

    const changeOrganizationTypes = async (value) => {
        setOrganizationTypesServer(value);
        const response = await getDataForCreateTtn();
        setResponse(response);
    };
    useEffect(() => {
        if (!response?.commodityDictionary && step !== "4") {
            return;
        }
        const isAll_commodityDictionary = commodityDictionary.filter((el) => !el.value && el.require);
        if (!isAll_commodityDictionary?.length) {
            const res = commodityDictionary?.map((element) => {
                if (element.fieldName === "product_name") {
                    const field_name = Object.values(element.controlValue)?.find((el) => el.product_name === element.value)?.product_name;
                    return { fieldName: element.fieldName, value: field_name };
                }
                return { fieldName: element.fieldName, value: element.value };
            });
            const item = Object.values(response.commodityDictionary)?.find((el) => el.product_name === commodityDictionary[0].value)?.ttnProductQty;
            res.push({fieldName: "ttn_max_qty", value: item});
            res.push({fieldName: "ttn_commodity_position", value: productPosition_active});
            setIsShowAddCommodityDictionary(true);
            setCommodityDictionary_result(res);
            return;
        }
        setIsShowAddCommodityDictionary(false);
    }, [commodityDictionary, step]);
    useEffect(() => {
        const typesDelivery_server = response.deliveryConditions?.map((el, index) => {
            return { index: index, label: el.label, value: index + 1 };
        });
        const contrAgents_server = setResponseMapper(contrAgents, response?.ttnPersons);
        const dogovorDictionary_server = setResponseMapper(dogovorDictionary, response);
        const availableTransport_server = setResponseMapper(availableTransport, response?.availableTransport);
        const commodityDictionary_server = setResponseMapper(commodityDictionary, response, response?.commodityDictionary);
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
        const organizationInformation_server = organizationInformation?.map((item) => {
            return {...item, value: controlValue !== "" ? response.contrAgents[controlValue][item.server] : "", disabled: true};
        });
        const personInformation_server = personInformation?.map((item) => {
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
        const isAll_dogovorDictionary = dogovorDictionary.filter((el) => el.value === "" && el.require);
        const isAll_organizationInformation = organizationInformation.filter((el) => el.value === "" && el.require);
        const isAll_personInformation = personInformation.filter((el) => el.value === "" && el.require);
        const isAll_contrAgents = contrAgents.filter((el) => el.value === "" && el.require);
        const isAll_availableTransport = availableTransport.filter((el) => el.value === "" && el.require);
        const isAll_unloadingBasis = unloadingBasis.find((el) => el.checked);
        if (
            !isAll_dogovorDictionary.length &&
            !isAll_organizationInformation.length &&
            !isAll_personInformation.length &&
            !isAll_contrAgents.length &&
            !isAll_availableTransport.length &&
            organization_types_server !== "" &&
            typesDelivery_server !== "" &&
            isAll_unloadingBasis
            ) {
                const dogovorDictionary_result = dogovorDictionary
                    .filter((el) => !el.header)
                    ?.map((element) => changeDogovorDictionary_result_custom(element));
                
                const organizationInformation_result = changeMapper(organizationInformation);
                
                const personInformation_result = changeMapper(personInformation);
                
                const contrAgents_result = contrAgents?.map((element) => changeContrAgentsResult_custom(element));
                
                const availableTransport_result = availableTransport
                    ?.map((element) => changeAvailableTransport_result_custom(element, availableTransport));
                
                const org_type_id = {fieldName: "org_type_id", value: organization_types_server};
                
                const delivery_conditions_id = {fieldName: "deliv_cond_id", value: typesDelivery_server};
                
                const unloading_basis_id = {fieldName: "unloading_basis_id", value: isAll_unloadingBasis.value};
                
                const res = [
                    ...dogovorDictionary_result,
                    ...organizationInformation_result,
                    ...personInformation_result,
                    ...contrAgents_result,
                    ...availableTransport_result,
                    org_type_id,
                    delivery_conditions_id,
                    unloading_basis_id,
                ];
                setServerResult(res);
                setIsShowSample(true);
            } else {
                setIsShowSample(false);
            }
    }, [
        dogovorDictionary,
        organizationInformation,
        personInformation,
        contrAgents,
        availableTransport,
        commodityDictionary,
        organization_types_server,
        typesDelivery_server,
        unloadingBasis,
    ]);
    const changeType = (value) => {
        const changeUnloadingBasis = unloadingBasis?.map((el) => {
            return el.value == value ? { ...el, checked: true } : el;
        });
        setUnloadingBasis(changeUnloadingBasis);
    };
    const changeTnOrTtn = (val) => {
        const changeItem = tnOrTtn?.map((el) => {
            if (el.value === val) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setTnOrTtn(changeItem);
    };
    const clickSample = async () => {
        await sendTemplate(serverResult);
    };
    const changeDate = (label, value) => {
        switch (label) {
            case "Дата начала счета":
                return changeDate_custom(dogovorDictionary, label, value, setDogovorDictionary);
            case "Дата отгрузки":
                return changeDate_custom(contrAgents, label, value, setContrAgents);
            default:
                return;
        }
    };
    const addCommodityDictionary = async () => {
        const res = await sendCommodityDictionary(commodityDictionary_result);
        if (res) {
            const newProductPosition = [
                ...productPosition,
                { index: productPosition_active, value: productPosition_active + 1, label: productPosition_active + 1 },
            ]
            setProductPosition(newProductPosition);
            setProductPosition_active(productPosition_active + 1);
            await showSection(1);
        }
    };
    const deleteCommodityDictionary = async () => {
        const res = await deleteSection(productPosition_active);
        if (res) {
            // setProductPosition_active(productPosition_active - 1);
            const response = await showSection(productPosition_active - 1);
            const resArray = [];
            for (let i = 0; i < response.data.sectionCount + 1; i++) {
                resArray.push({ index: i, value: i + 1, label: i + 1 })
            }
            debugger;
            setProductPosition(resArray);
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
                    isShowAddCommodityDictionary={isShowAddCommodityDictionary}
                    addCommodityDictionary={addCommodityDictionary}
                    productPosition={productPosition}
                    productPosition_active={productPosition_active}
                    changeProductPosition_active={(value) => setProductPosition_active(value)}
                    deleteCommodityDictionary={deleteCommodityDictionary}
                />}
        </div>
    );
}

export default MainScreen;