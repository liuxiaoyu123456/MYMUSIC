import axios from '@/utils/request';

export const dailyRecommend = () => {
    const res = axios('/recommend/daily');
    return res;
};

export const getBanner = async() => {
    const { data }  = await axios('/recommend/banner');
    return data
};

export const getRecommendPlaylist = () => {
    const res = axios({
        url: '/recommend/playlist/u',
        method: 'get',
    })
    return res;
};

// export const getRecommendPlaylistByCategory = async() => {
//     const { data } = await axios({
//         url: '/recommend/playlist',
//         params: {
//             id: 
//         }
//     })
// }

export const getNewSongs = () => {
    const res = axios({
        url: '/new/songs',
    })
    return res;
}