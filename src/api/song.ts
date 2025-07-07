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

export const getPlayUrl = (songmid: string) => {
    const res = axios({
        url: '/song/urls',
        params: {
            id: songmid,
        }
    })
    return res;
};

export const downloadMusic = async(id: string, type: string) => {
    const { data } = await axios({
        url: '/song/url',
        params: {
            id,
            type,
        }
    })
    return data;
};