export const organizationTypes = [
    { index: "0", value: "1", label: "Индивидуальный предприниматель" },
    { index: "1", value: "2", label: "Организация" },
    { index: "2", value: "0", label: "Физическое лицо" },
];

export const unloading_basis = [
    { value: 1, label: "Договор", index: 0 },
    { value: 2, label: "Счет", index: 1 },
];

export const dogovorDictionary_default = [
    { index: "0", value: "", label: "Номер счета", require: true, fieldName: "docNumber" },
    { index: "1", value: "", label: "Дата начала счета", date: true, require: true, fieldName: "check_start_date" },
    { index: "2", header: "Номер договора и дата начала", require: false },
    {
        index: "3",
        value: "",
        label: "Номер договора",
        select: true,
        currencies: [],
        controlInput: "Дата начала договора",
        controlValue: "",
        require: true,
        fieldName: "doc_number",
    },
    { index: "4", value: "", label: "Дата начала договора", date: true, disabled: true, require: true, fieldName: "doc_start_date" },
];

export const organizationInformation_default = [
    { index: "0", value: "", label: "УНП/ИНН контрагента", server: "organisation_unp", disabled: true },
    { index: "1", value: "", label: "Короткое наименование организации", server: "short_organisation_name", disabled: true },
    { index: "2", value: "", label: "Расчетный счет", server: "checking_account", disabled: true },
    { index: "3", value: "", label: "Код банка", server: "bank_code", disabled: true },
    { index: "4", value: "", label: "Наименование банка", server: "bank_name", disabled: true },
];
export const personInformation_default = [
    { index: "0", value: "", label: "Фамилия уполномоченного лица", server: "contragent_owner_last_name", disabled: true },
    { index: "1", value: "", label: "Имя уполномоченного лица", server: "contragent_owner_name", disabled: true },
    { index: "2", value: "", label: "Отчество уполномоченного лица", server: "contragent_owner_second_name", disabled: true },
    { index: "3", value: "", label: "Email уполномоченного лица", server: "contragent_owner_email", disabled: true },
    { index: "4", value: "", label: "Телефон уполномоченного лица", server: "contragent_owner_phone", disabled: true },
    { index: "5", value: "", label: "Адрес уполномоченного лица", server: "contragent_address", disabled: true },
];

export const fourStepFields = [
    { index: "0", value: "1", label: "Наименование" },
    { index: "1", value: "2", label: "Единица измерения" },
    { index: "2", value: "3", label: "Количество" },
    { index: "3", value: "4", label: "Цена за единицу" },
    { index: "4", value: "5", label: "Сумма" },
    { index: "5", value: "6", label: "Ставка НДС" },
    { index: "6", value: "7", label: "Сумма с НДС" },
    { index: "7", value: "8", label: "Примечание" },
    { index: "8", value: "9", label: "Сторона поставки" },
    { index: "9", value: "10", label: "Количество грузовых мест" },
    { index: "10", value: "11", label: "Масса груза" },

];
export const contrAgents_default = [
    { index: "0", value: "", label: "Дата отгрузки", date: true },
    { index: "1", value: "", label: "Основания отгрузки" },
    {
        index: "2",
        value: "",
        label: "Отгрузку разрешил",
        select: true,
        currencies: [],
    },
    { 
        index: "3",
        value: "",
        label: "Груз сдал",
        select: true,
        currencies: [],
    },
    { 
        index: "4",
        value: "",
        label: "Товар к доставке принял",
        select: true,
        currencies: [],
        controlInput: ["Доверенность", "ФИО"],
        controlValue: "",
    },
    { index: "5", value: "", label: "Доверенность" },
    { index: "6", value: "", label: "ФИО" },
];
export const commodityDictionary_default = [
    {
        index: "0",
        value: "",
        autocomplete: true,
        select: true,
        label: "Наименование товара",
        currencies: [],
        controlInput: ["Цена за ед.", "Единица измерения"],
        controlValue: "",
        fieldName: "product_name",
    },
    { index: "1", value: "", label: "Единица измерения", fieldName: "measure" },
    { index: "2", value: "", label: "Количество", fieldName: "product_qty" },
    { index: "3", value: "", label: "Цена за ед.", fieldName: "product_price" },
    { index: "4", value: "", label: "Стоимость по количеству", fieldName: "product_cost" },
    { index: "5", value: "", label: "Ставка НДС, %", fieldName: "ttn_product_vat" },
    { index: "6", value: "", label: "Сумма НДС", fieldName: "ttn_product_vat_sum" },
    { index: "7", value: "", label: "Стоимость с НДС", fieldName: "product_cost_with_vat" },
];
export const tnOrTtnField = [
    { index: "0", value: "1", label: "ТН", checked: false },
    { index: "1", value: "2", label: "ТТН", checked: false },
];
export const availableTransport_default = [
    {
        index: "0",
        value: "",
        label: "Транспорт",
        select: true,
        autocomplete: true,
        currencies: [],
        controlInput: ["Марка и гос. номер", "ФИО водителя", "УНП перевозчика", "Пункт погрузки", "Пункт разгрузки", "Номер путевого листа", "Вес груза"],
        controlValue: "",
    },
    { index: "1", value: "", label: "Марка и гос. номер" },
    { index: "2", value: "", label: "ФИО водителя" },
    { index: "3", value: "", label: "УНП перевозчика" },
    { index: "4", value: "", label: "Пункт погрузки" },
    { index: "5", value: "", label: "Пункт разгрузки" },
    { index: "6", value: "", label: "Номер путевого листа" },
    { index: "7", value: "", label: "Вес груза" },
];

export const steps = [
    { index: "0", value: "1", label: "1" },
    { index: "1", value: "2", label: "2" },
    { index: "2", value: "3", label: "3" },
    { index: "3", value: "4", label: "4" },
];