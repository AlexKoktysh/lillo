import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTAyOTIxMjEsIkFwcGxpY2F0aW9uIjoiUnVrb3ZvZGl0ZWwifQ.tdUIEg-hrhP2dRQHL1r6x3raC2GZ8qu0utwrTC8zUBk";

const instance = axios.create({
    baseURL: `https://portal.liloo.by/api/services/`,
    headers: {
        Authorization : `Bearer ${token}`,
        "Access-Control-Allow-Origin": "https://portal.liloo.by/api/",
    },
});
instance.interceptors.response.use(
    (response) => response,
    (error) => console.log((error))
);

export const getOrganizationTypes = async () => {
    const response = await instance.get("organisation_types");
    return response.data;
};

export const getDataForCreateTtn = async () => {
    const response = await instance.post("get_data_for_create_ttn", { "orgType": 1 });
    return response.data;
};

export const fillTemplate = async (value) => {
    const response = await instance.post("fill_template", value);
    return response.data;
};

export const sendTemplate = async (params) => {
    const json = {...params};
    console.log("json", json);
};

export const sendCommodityDictionary = async (params) => {
    const json = {...params};
    console.log("json", json);
};