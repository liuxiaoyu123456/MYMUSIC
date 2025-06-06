import axios from "@/utils/request";

export const getAlbum = () => {
    const res = axios({
        url: '/album',
        params: {
            albummid: '004FIW293U9IZy',
        }
    })
    return res;
}