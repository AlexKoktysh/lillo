import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";
import AccordionControl from "../../components/Accordion/accordion-control.js";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

function ActCard(props) {
    const [step, setStep] = useState("1");
    const [type, setType] = useState("");
    const [delivery, setDelivery] = useState(props.delivery);
    const [localPosition, setLocalPosition] = useState(props.productPosition_active);
    const [labelDeliv, setLabelDeliv] = useState(props.labelDeliv);

    const [entityType, setEntityType] = useState(props.tnOrTtn.find((el) => el.checked)?.value || "");
    const [templateView, setTemplateView] = useState(props.templateView.find((el) => el.checked)?.value || "");
    const changeTnOrTtn = (val) => {
        setEntityType(val);
        props.changeTnOrTtn(val);
    };
    const changeTemplateView = (val) => {
        setTemplateView(val);
        props.changeTemplateView(val);
    };
    useEffect(() => {
        setLocalPosition(props.productPosition_active);
    }, [props.productPosition_active]);
    useEffect(() => {
        setLabelDeliv(props.labelDeliv);
    }, [props.labelDeliv]);

    const changeStep = (value) => {
        setStep(value);
    };
    const changeType = (value) => {
        setType(value);
        value && props.changeType(value);
    };
    const changePosition = (value) => {
        props.changeProductPosition_active(Number(value));
    };
    const changeDelivery = (value) => {
        setDelivery(value);
    };
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
    const addProduct = (item, value) => {
        props.addProduct(item, value);
    };
    const addDogovor = (item, value) => {
        props.addDogovor(item, value);
    };
    const changeDate = (label, value) => {
        props.changeDate(label, value);
    };
    const listItems = step !== "2" && props.items?.map((item) =>
        !item.header
            ? <TextFieldControl commodityDictionary={props.commodityDictionary} item={item} key={item.index} change={change} addCar={addCar} addProduct={addProduct} addDogovor={addDogovor} changeDate={changeDate} getNewCurrencies={props.getNewCurrencies} />
            : <div key={item.index} className="header">{item.header}</div>
    );

    return (
        <div id="card">
            {step === "1" && <Form label="???????????????? ?????? ??????????" value={type} items={props.unloadingBasis} change={changeType} />}
            <div className="form">
                {step === "4" && <Form label="??????????????" value={localPosition} items={props.productPosition} change={changePosition} />}
                {step === "3" && <Form label="?????? ??????????????????" value={entityType} items={props.tnOrTtn} change={changeTnOrTtn} />}
                {step === "3" && <Form label="?????? ??????????????" value={templateView} items={props.templateView} change={changeTemplateView} />}
                {listItems}
                {step === "2" && Array.isArray(props.items[0].items) && <AccordionControl items={props.items} />}
                {step === "1" && props.typesDelivery && <Box sx={{ mb: 2 }}><Form label="???????????????? ?????? ????????????????" value={delivery} items={props.typesDelivery} change={changeDelivery} /></Box>}
                {step === "1" && labelDeliv && <Box sx={{ mb: 2 }}><TextField size="small" label={labelDeliv} /></Box>}
                {step === "4"
                    &&
                    <Box sx={{ mb: 4, mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={props.addCommodityDictionary} disabled={!props.isShowAddCommodityDictionary} color="secondary" variant="contained">????????????????</Button>
                        <Button onClick={props.deleteCommodityDictionary} disabled={!props.isShowAddCommodityDictionary} color="secondary" variant="contained">??????????????</Button>
                    </Box>
                }
                <Form label="?????????????????????? ????????????" value={step} items={props.resSteps} change={changeStep} />
                <Box sx={{ mb: 4, mt: 4 }}>
                    <Button onClick={props.clickSample} disabled={!props.isShowSample} color="secondary" variant="contained">?????????????????? ????????????</Button>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Button disabled color="secondary" variant="contained">??????????????</Button>
                </Box>
            </div>
        </div>
    );
}

export default ActCard;