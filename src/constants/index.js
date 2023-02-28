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
        autocomplete: true,
        currencies: [],
        controlInput: ["doc_start_date"],
        controlValue: "",
        require: true,
        fieldName: "doc_number",
    },
    { index: "4", value: "", label: "Дата начала договора", date: true, disabled: true, require: true, fieldName: "doc_start_date" },
];

export const organizationInformation_default = [
    { index: "0", value: "", label: "УНП/ИНН контрагента", server: "organisation_unp", disabled: true, require: true, fieldName: "organisation_unp" },
    { index: "1", value: "", label: "Короткое наименование организации", server: "short_organisation_name", disabled: true, require: true, fieldName: "short_organisation_name" },
    { index: "2", value: "", label: "Расчетный счет", server: "checking_account", disabled: true, require: true, fieldName: "checking_account" },
    { index: "3", value: "", label: "Код банка", server: "bank_code", disabled: true, require: true, fieldName: "bank_code" },
    { index: "4", value: "", label: "Наименование банка", server: "bank_name", disabled: true, require: true, fieldName: "bank_name" },
];
export const personInformation_default = [
    { index: "0", value: "", label: "Фамилия уполномоченного лица", server: "contragent_owner_last_name", disabled: true, require: true, fieldName: "contragent_owner_last_name" },
    { index: "1", value: "", label: "Имя уполномоченного лица", server: "contragent_owner_name", disabled: true, require: true, fieldName: "contragent_owner_name" },
    { index: "2", value: "", label: "Отчество уполномоченного лица", server: "contragent_owner_second_name", disabled: true, require: true, fieldName: "contragent_owner_second_name" },
    { index: "3", value: "", label: "Email уполномоченного лица", server: "contragent_owner_email", disabled: true, require: false, fieldName: "contragent_owner_email" },
    { index: "4", value: "", label: "Телефон уполномоченного лица", server: "contragent_owner_phone", disabled: true, require: false, fieldName: "contragent_owner_phone" },
    { index: "5", value: "", label: "Адрес уполномоченного лица", server: "contragent_address", disabled: true, require: true, fieldName: "contragent_address" },
];

export const contrAgents_default = [
    { index: "0", value: "", label: "Дата отгрузки", date: true, require: true, fieldName: "shipping_date" },
    { index: "1", value: "", label: "Основания отгрузки", require: false, fieldName: "shipment_grounds" },
    {
        index: "2",
        value: "",
        label: "Отгрузку разрешил",
        select: true,
        currencies: [],
        require: true,
        fieldName: "allowed_person_id"
    },
    { 
        index: "3",
        value: "",
        label: "Груз сдал",
        select: true,
        currencies: [],
        require: true,
        fieldName: "handed_person_id"
    },
    { 
        index: "4",
        value: "",
        label: "Товар к доставке принял",
        select: true,
        currencies: [],
        controlInput: ["rights_number", "FIO"],
        controlValue: "",
        require: true,
        fieldName: "received_person_id"
    },
    { index: "5", value: "", label: "Доверенность", require: true, fieldName: "rights_number"},
    { index: "6", value: "", label: "ФИО", require: true, fieldName: "FIO" },
];
export const commodityDictionary_default = [
    {
        index: "0",
        value: "",
        autocomplete: true,
        select: true,
        label: "Наименование товара",
        currencies: [],
        controlInput: ["product_price", "measure"],
        controlValue: "",
        fieldName: "product_name",
        require: true,
        ttn_max_qty: "",
    },
    { index: "1", value: "", label: "Единица измерения", fieldName: "measure", require: true },
    { index: "2", value: "", label: "Количество", fieldName: "product_qty", require: true },
    { index: "3", value: "", label: "Цена за ед.,", fieldName: "product_price", require: true },
    { index: "4", value: "", label: "Стоимость по количеству,", fieldName: "product_cost", require: true },
    { index: "5", value: "", label: "Ставка НДС, %", fieldName: "ttn_product_vat", require: true },
    { index: "6", value: "", label: "Сумма НДС,", fieldName: "ttn_product_vat_sum", require: true },
    { index: "7", value: "", label: "Стоимость с НДС,", fieldName: "product_cost_with_vat", require: true },
    { index: "8", value: "", label: "Примечания (необязательное)", fieldName: "notes", require: false },
    { index: "9", value: "", label: "Страна ввоза (необязательное)", fieldName: "country_import", require: false },
    { index: "10", value: "", label: "Масса (необязательное)", fieldName: "product_weight", require: false },
    { index: "11", value: "", label: "Количество грузовых мест (необязательное)", fieldName: "qty_cargo_place", require: false },
];
export const tnOrTtnField = [
    { index: "0", value: "1", label: "ТН", checked: false },
    { index: "1", value: "2", label: "ТТН", checked: false },
];
export const templateViewField = [
    { index: "0", value: "1", label: "Вертикально", checked: false },
    { index: "1", value: "2", label: "Горизонтально", checked: false },
];
export const availableTransport_default = [
    {
        index: "0",
        value: "",
        label: "Транспорт",
        select: true,
        autocomplete: true,
        currencies: [],
        controlInput: ["car_number", "last_name", "driver_unp", "loading_point_address", "unloading_point_address", "waybill_number", "cargo"],
        controlValue: "",
        require: true,
        fieldName: "car_model",
    },
    { index: "1", value: "", label: "Марка и гос. номер", require: true, fieldName: "car_number", },
    { index: "2", value: "", label: "ФИО водителя", require: true, fieldName: "last_name", },
    { index: "3", value: "", label: "УНП перевозчика", require: false, fieldName: "driver_unp", },
    { index: "4", value: "", label: "Пункт погрузки", require: true, fieldName: "loading_point_address", },
    { index: "5", value: "", label: "Пункт разгрузки", require: true, fieldName: "unloading_point_address", },
    { index: "6", value: "", label: "Номер путевого листа", require: false, fieldName: "waybill_number", },
    { index: "7", value: "", label: "Вес груза", require: false, fieldName: "cargo", },
];

export const steps = [
    { index: "0", value: "1", label: "1" },
    { index: "1", value: "2", label: "2" },
    { index: "2", value: "3", label: "3" },
    { index: "3", value: "4", label: "4" },
];