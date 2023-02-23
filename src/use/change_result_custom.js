export const changeContrAgentsResult_custom = (element) => {
    const res_label = element.value && element.value?.split(" ");
    switch (element.label) {
        case "Доверенность":
            const resObj_dov = {fieldName: "rights_number", value: res_label[0]};
            const resObj_date = {fieldName: "rights_date", value: res_label[2]};
            return {...resObj_dov, ...resObj_date};
        case "ФИО":
            const last_name = {fieldName: "rights_last_name", value: res_label[0]};
            const name = {fieldName: "rights_name", value: res_label[1]};
            const second_name = {fieldName: "rights_second_name", value: res_label[2]};
            return {...last_name, ...name, ...second_name};
        default:
            return {fieldName: element.fieldName, value: element.value}
    }
};
export const changeAvailableTransport_result_custom = (element, availableTransport) => {
    const field_name = availableTransport[0].controlValue[availableTransport[0].value];
    switch (element.fieldName) {
        case "car_model":
            return { fieldName: element.fieldName, value: field_name?.car_model };
        case "car_number":
            return { fieldName: element.fieldName, value: field_name?.car_number };
        default:
            return {fieldName: element.fieldName, value: element.value}


    }
};
export const changeDogovorDictionary_result_custom = (element) => {
    switch (element.fieldName) {
        case "doc_number":
            const field_name = element.currencies[element.value]?.label || "";
            return { fieldName: element.fieldName, value: field_name };
        default:
            return {fieldName: element.fieldName, value: element.value}
    }
};

export const changeMapper = (items) => {
    const result = items?.map((element) => {
        return {fieldName: element.fieldName, value: element.value}
    });
    return result;
};