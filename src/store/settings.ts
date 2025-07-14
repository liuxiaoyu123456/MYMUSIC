import { defineStore } from "pinia";

export const useSetting = defineStore('setting', {
    state: () => ({
        downloadUrl: 'C:/Users/Lenovo/Music/'
    })
})