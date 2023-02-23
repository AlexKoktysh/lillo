export const setResponseMapper = (items, response, control_response) => {
    const result = items?.map((element) => setResponse_custom(element, response, control_response));
    return result;
};

const setResponse_custom = (element, response, control_response) => {
    const element_name = element.fieldName;
    switch (element_name) {
        case "allowed_person_id":
            return getCurrencies(element, response, false, "last_name");
        case "handed_person_id":
            return getCurrencies(element, response, false, "last_name");
        case "received_person_id":
            return getCurrencies(element, response, true, "last_name", response);
        case "docNumber":
            return getLabel(element, response?.docNumber);
        case "doc_number":
            return getCurrencies(element, response?.dogovorDictionary, true, "doc_number", response?.dogovorDictionary);
        case "car_model":
            return getCurrenciesCar(element, response, true, "car_model car_number", response);
        case "product_name":
            return getCurrencies(element, response?.commodityOptions, true, null, control_response);
        case "product_price":
            return {...element, label: `${element.label} ${response?.defaultCurrencyCode}`};
        case "product_cost":
            return {...element, label: `${element.label} ${response?.defaultCurrencyCode}`};
        case "ttn_product_vat_sum":
            return {...element, label: `${element.label} ${response?.defaultCurrencyCode}`};
        case "product_cost_with_vat":
            return {...element, label: `${element.label} ${response?.defaultCurrencyCode}`};
        default:
            return element;
    }
};
const getCurrencies = (element, response, isControl, label, control_response) => {
    return {
        ...element,
        currencies: response?.map((el, index) => {
            return { index: index, label: label ? el[label] : el };
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};
const getCurrenciesCar = (element, response, isControl, label, control_response) => {
    return {
        ...element,
        currencies: response?.map((el, index) => {
            const lab = label?.split(" ");
            return { index: index, label: `${el[lab[0]]} ${el[lab[1]]}`};
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};
const getLabel = (element, response) => {
    return {
        ...element,
        value: response || ""
    };
};