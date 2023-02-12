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
    { index: "0", value: "1", label: "Номер счета" },
    { index: "1", value: "2", label: "Дата начала счета", date: true },
    { header: "Номер договора и дата начала", index: "5" },
    {
        index: "2",
        value: "3",
        label: "Договор",
        select: true,
        currencies: [
            { index: "0", value: "1", label: "1" },
            { index: "1", value: "2", label: "2" },
            { index: "2", value: "3", label: "3" },
        ],
    },
    { index: "3", value: "4", label: "Дата начала договора", date: true },
];

export const twoStepFields = [
    { 
        index: "0",
        value: "1",
        label: "Условия поставки",
        select: true,
        currencies: [
            { index: "0", value: "1", label: "Постоплата" },
            { index: "1", value: "2", label: "Предоплата" },
            { index: "2", value: "3", label: "Оплата"},
        ],
    },
    { index: "1", value: "2", label: "Ставка НДС, %" },
    { index: "2", value: "3", label: "Сумма НДС" },
    { index: "3", value: "4", label: "Общая сумма" },
];

export const threeStepFields = [
    { index: "0", value: "1", label: "Наименование контрагента" },
    { index: "1", value: "2", label: "УНП/ИНН контрагента" },
    { index: "2", value: "3", label: "Короткое наименование организации" },
    { index: "3", value: "4", label: "Расчетный счет" },
    { index: "4", value: "5", label: "Код банка" },
    { index: "5", value: "6", label: "Наименование банка" },
    { index: "6", value: "7", label: "Юридический адрес организации" },
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

export const steps = [
    { index: "0", value: "1", label: "1" },
    { index: "1", value: "2", label: "2" },
    { index: "2", value: "3", label: "3" },
    { index: "3", value: "4", label: "4" },
];