
import axios from "axios";

export const blogFetch = axios.create({
    baseURL: "https://blog-api-y04r.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
});
