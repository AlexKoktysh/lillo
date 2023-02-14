export const organizationTypes = [
    { index: "0", value: "1", label: "Индивидуальный предприниматель" },
    { index: "1", value: "2", label: "Организация" },
    { index: "2", value: "0", label: "Физическое лицо" },
];

export const checkType = [
    { index: "0", value: "1", label: "Вертикально" },
    { index: "1", value: "2", label: "Горизонтально" },
];

export const firstStepFields = [
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
];

export const twoStepFields = [
    { 
        index: "0",
        value: "",
        label: "Условия поставки",
        select: true,
        currencies: [],
    },
    { index: "1", value: "", label: "Ставка НДС, %" },
    { index: "2", value: "", label: "Сумма НДС" },
    { index: "3", value: "", label: "Общая сумма" },
];

export const threeStepFields = [
    { index: "0", value: "", label: "Наименование контрагента", server: "contragent_owner_last_name" },
    { index: "1", value: "", label: "УНП/ИНН контрагента", server: "organisation_unp" },
    { index: "2", value: "", label: "Короткое наименование организации", server: "short_organisation_name" },
    { index: "3", value: "", label: "Расчетный счет", server: "checking_account" },
    { index: "4", value: "", label: "Код банка", server: "bank_code" },
    { index: "5", value: "", label: "Наименование банка", server: "bank_name" },
    { index: "6", value: "", label: "Юридический адрес организации", server: "contragent_address" },
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
export const tnFields = [
    { index: "0", value: "", label: "Дата отгрузки" },
    { index: "1", value: "", label: "Основания отгрузки" },
    { index: "2", value: "", label: "Отгрузку разрешил" },
    { index: "3", value: "", label: "Груз сдал" },
    { index: "4", value: "", label: "Товар к доставке принял" },
    { index: "5", value: "", label: "Доверенность" },
    { index: "6", value: "", label: "ФИО" },
    { index: "7", value: "", label: "Данные ТН" },
];
export const ttnFields = [
    { index: "0", value: "", label: "Дата отгрузки" },
    { index: "1", value: "", label: "Основания отгрузки" },
    { index: "2", value: "", label: "Отгрузку разрешил" },
    { index: "3", value: "", label: "Груз сдал" },
    { index: "4", value: "", label: "Товар к доставке принял" },
    { index: "5", value: "", label: "Доверенность" },
    { index: "6", value: "", label: "ФИО" },
    { index: "7", value: "", label: "Данные ТТН" },
];
export const carFields = [
    {
        index: "0",
        value: "",
        label: "Транспорт",
        select: true,
        currencies: [],
        controlInput: ["Марка и гос. номер", "ФИО водителя", "УНП перевозчика"],
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
    { index: "4", value: "5", label: "5" },
    { index: "5", value: "6", label: "6" },
];