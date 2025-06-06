import axios from "@/utils/request";

export const search = async() => {
    const res = await axios({
        method: 'get',
        url: '/search?key=周杰伦'
    })
    return res;
}