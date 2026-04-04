import axios from "axios";

const api = axios.create({
    baseURL: "https://fc719fe2-97b5-49cc-8fd8-b466c300f14c.mock.pstmn.io",
});

export const fetchStats = async () => {
    const { data } = await api.get("/");
    console.log("data", data)
    return data;
};