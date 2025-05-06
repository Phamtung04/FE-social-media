import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";
// export const API_BASE_URL = "http://192.168.0.110:8080";


const jwtToken = localStorage.getItem("jwt")

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "Content-Type": "application/json"
    }
})
