import axios from "@/utils/request";

export const getCategory = () => {
    const res = axios({
        url: '/radio/category',
    })
    return res;
};