import axios from "@/utils/request";

export const getSong = (mid: string) => {
    const res = axios({
        url: '/song',
        params: {
            songmid: mid,
        }
    })
    return res;
};