import { defineStore } from "pinia";
import { Howl, Howler } from 'howler';
import { ref } from "vue";

const persist = require('pinia-plugin-persistedstate');

export const usePlayList = defineStore('play-list', {
    state: () => ({
        playList: [],
        playSrc: '',
    }),

    actions: {
        addPlayItem(item) {
            this.playList.push(item);
        },
        selectIndex(num: number) {
            if(this.playList.length > 0){
                this.playSrc = this.playList[num].url;
            }
        }
    },

    persist: true,
})