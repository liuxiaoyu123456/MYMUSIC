import axios from "@/utils/request";

export const getRadioCategory = async() =>{
    const { data } = await axios({
        url: '/radio/category',
    })
    return data;
}