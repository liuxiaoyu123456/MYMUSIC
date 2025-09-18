import { defineStore } from "pinia";

interface myUser {
    isLogin: boolean,
    userInfo: any,
    qq: string,
    mymusic: any,
    myRoute: any,
    netWorkRoute: any,
}

export const useUserInfo = defineStore('user',{
    state: (): myUser => ({
        isLogin: false,
        userInfo: {},
        qq: '',
        mymusic: [],
        myRoute: [
          { icon: 'access_time', title: '最近播放', route: '/'},
          { icon: 'download', title: '本地和下载', route: 'local'},
        ],
        netWorkRoute: [
            { icon: 'music_video', title: '乐馆', route: '/musicShop' },
            { icon: 'videocam', title: '视频', route: '/videoDetail' },
            { icon: 'radar', title: '雷达', route: '/' },
        ]
    }),

    actions: {
        setQQ(id: string) {
            this.qq = id;
            console.log(this.qq)
        },

        getQQ() {
            return this.qq;
        },

        setUserInfo(data: object) {
            this.userInfo = data.creator;
            this.mymusic = data.mymusic;
        },

        getUserInfo() {
            const res = {
                headpic: this.userInfo.headpic
            };
            return res;
        },

        setLogin() {
            this.isLogin = true;
        },

        changeRoute() {
            this.myRoute.unshift(
                { icon: 'favorite_border', title: '喜欢', route: 'like' }
            )
            this.netWorkRoute.unshift(
                { icon: 'home', title: '推荐', route: '/recommend' }
            )
        },
    },

    persist: {
        key: 'user',
        storage: localStorage,
        pick: ['mymusic', 'qq', 'userInfo'],
    },
})