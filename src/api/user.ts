import axios from "@/utils/request";

export const userRefresh = () => {
    const res = axios({
        method: 'get',
        url: '/user/refresh'
    });
    return res;
};

export const getCookie = (id: string) => {
    const res = axios({
        method: 'get',
        url: '/user/getCookie',
        params: {
            id
        },
    });
    return res;
};

export const setCookie = (cookie: string) => {
    const res = axios({
        url: '/user/setCookie',
        method: 'post',
        data: {
            data: cookie,
        },
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res;
};

export const getUserDetail = (id: string) => {
    const res = axios({
        method: 'get',
        url: '/user/detail',
        params: {
            id,
        }
    })
    return res;
};