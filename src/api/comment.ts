import axios from "@/utils/request";

export const getComment = async(id: number, pageNo?: number, pageSize?: number, type?: number, biztype = 1) => {
    const { data } = await axios({
        method: 'get',
        url: '/comment',
        params: {
            id,
            pageNo,
            pageSize,
            type: 0,
            biztype,
        }
    })
    return data;
}