import axios from "@/utils/request";

export const newMv = () => {
    const res = axios({
        url: '/new/mv',
    });
    return res;
};