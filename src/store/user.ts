import { defineStore } from "pinia";

interface myUser {
    userInfo: any,
    mymusic: any,
}

export const useUserInfo = defineStore('user',{
    state: (): myUser => ({
        userInfo: {},
        mymusic: [],
    }),

    actions: {
        setUserInfo(data: object) {
            this.userInfo = data.creator;
            this.mymusic = data.mymusic;
        },
    },

    persist: true,
})