import { defineStore } from "pinia";

interface myUser {
    isLogin: boolean,
    userInfo: any,
    qq: string,
    mymusic: any,
    myRoute: any,
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

        setLogin() {
            this.isLogin = true;
        },

        changeMyRoute() {
            this.myRoute.unshift(
                { icon: 'favorite_border', title: '喜欢', route: 'like' }
            )
        }
    },

    persist: {
        key: 'user',
        storage: localStorage,
        pick: ['mymusic', 'qq'],
    },
})