import axios from "@/utils/request";

export const getSonglist = (id: string) => {
    const res = axios({
        url: '/songlist',
        params: {
            id,
        }
    })
    return res;
};

export const getSonglistCategory = async() => {
    const { data } = await axios({
        url: '/songlist/category',
    })
    // console.log(data);
    return data;
};

export const getSonglistByCategory = async() => {
    const { data } = await axios({
        url: '/songlist/list',
        params: {
            pageSize: 20,
            pageNo: 1,
            sort: 2,
            category: 6,
        }
    })
    return data;
}

