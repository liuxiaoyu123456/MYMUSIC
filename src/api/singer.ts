import axios from "@/utils/request";

export const getSingerCategory = async() => {
    const { data } = await axios({
        url: '/singer/category'
    })
    return data;
};

export const getSingerList = async(obj: any) => {
    const { data } = await axios({
        url: '/singer/list',
        params: {
            area: obj.area,
            genre: obj.genre,
            index: obj.index,
            sex: obj.sex,
            pageNo: obj.pageNo,
        }
    })
    return data;
}