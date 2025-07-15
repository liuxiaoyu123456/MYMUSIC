import axios from "@/utils/request";

export const getMvInfo = async(id: string) => {
    const { data } = await axios({
        url: '/mv',
        params: {
            id,
        }
    })
    return data;
};

export const getMvUrl = async(id: string) => {
    const { data } = await axios({
        url: '/mv/url',
        params: {
            id,
        }
    })
    return data;
};
