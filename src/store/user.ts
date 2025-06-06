import { defineStore } from "pinia";

export const useUserInfo = defineStore('user',{
    state: () => ({
        userInfo: {},
    }),

    actions: {
        setUserInfo() {
            
        },
    },

    persist: true,
})