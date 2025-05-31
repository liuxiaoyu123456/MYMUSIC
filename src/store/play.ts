import { defineStore } from "pinia";
import { useToast } from "vuestic-ui";

const { init } = useToast();

export const usePlayList = defineStore('play-list', {
    state: () => ({
        playList: [],
        playSrc: '',
        singName: '',
        singArtist: '',
        playCover: '',
        order: 0,
    }),

    actions: {
        addPlayItem(item) {
            const lists = this.playList.map(item=>item.url);
            if(lists.includes(item.url)){
                init({
                    message: "重复添加！",
                    color: "warning"
                })
            }else {
                this.playList.push(item);
            }
        },

        selectItem(num: number) {
            this.order = num;
            if(this.playList.length > 0){
                this.playSrc = this.playList[num].url;
                this.singName = this.playList[num].sing;
                this.singArtist = this.playList[num].artist;
                this.playCover = this.playList[num].picSrc;
            }
        },

        deleteItem(num: number) {
            this.playList.splice(num, 1);
        },

        nextSing() {
            if(this.order === this.playList.length - 1){ // 播放到最后一首
                this.order = 0;
            }else {
                this.order = this.order + 1;
            }

            this.selectItem(this.order);
        },

        prevSing() {
            if(this.order === 0){ // 播放到第一首
                this.order = this.playList.length -1;
            }else {
                this.order = this.order - 1;
            }

            this.selectItem(this.order);
        }
    },

    persist: true,
})