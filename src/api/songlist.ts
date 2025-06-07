import axios from "@/utils/request";

export const getSonglist = (id: string) => {
    const res = axios({
        url: '/songlist',
        params: {
            id,
        }
    })
    return res;
}

