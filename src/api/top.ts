import axios from "@/utils/request";

export const getTop = () => {
    const res = axios({
        url: '/top/category',
        params: {
            showDetail: 1,
        }
    })
    return res;
}