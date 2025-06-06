import axios from '@/utils/request';

export const dailyRecommend = () => {
    const res = axios('/recommend/daily');
    return res;
};

export const getBanner = () => {
    const res = axios('/recommend/banner');
    return res;
};

export const getRecommendPlaylist = () => {
    const res = axios({
        url: '/recommend/playlist/u',
        method: 'get',
    })
    return res;
};

export const getNewSongs = () => {
    const res = axios({
        url: '/new/songs',
    })
    return res;
}