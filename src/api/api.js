import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTAyOTIxMjEsIkFwcGxpY2F0aW9uIjoiUnVrb3ZvZGl0ZWwifQ.tdUIEg-hrhP2dRQHL1r6x3raC2GZ8qu0utwrTC8zUBk";

export default axios.create({
    baseURL: `https://portal.liloo.by/api/services/`,
    headers: {
        Authorization : `Bearer ${token}`,
        "Access-Control-Allow-Origin": "https://portal.liloo.by/api/",
    },
});