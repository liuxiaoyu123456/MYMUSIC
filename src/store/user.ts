import { defineStore } from "pinia";

interface myUser {
    isLogin: boolean,
    userInfo: any,
    mymusic: any,
}

export const useUserInfo = defineStore('user',{
    state: (): myUser => ({
        isLogin: false,
        userInfo: {},
        mymusic: [],
    }),

    actions: {
        setUserInfo(data: object) {
            this.userInfo = data.creator;
            this.mymusic = data.mymusic;
        },

        setLogin() {
            this.isLogin = true;
        }
    },

    persist: {
        key: 'user',
        storage: localStorage,
        pick: ['mymusic'],
    },
})