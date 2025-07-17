import { defineStore, storeToRefs } from "pinia";

import { Howl } from 'howler';
import { usePlayList } from "@/store/play";
import { getNetWorkUrls } from "@/utils";

const { nextSing, randomSing } = usePlayList();

interface myAudio {
    sound: null | Howl,
    paused: boolean,
    volume: number,
    currentTime: number,
    duration: number | undefined,
    rate: number,
}

export const useAudio = defineStore('audio', {
    state: (): myAudio  => ({
        sound: null,
        paused: true,
        volume: 1,
        currentTime: 0,
        duration: 100,
        rate: 1,
    }),

    actions: {
        createAudio(url: string[]) {
            let update: number | null  = null;
            this.sound = new Howl({
                src: url,
                autoplay: false,
                volume: this.volume,
                rate: this.rate,

                onload: () => {
                    this.duration = this.sound?.duration();
                },

                onplay: () => {
                    if(!update) {
                        update = setInterval(()=>{
                            this.currentTime = this.currentTime + 1;
                        }, 1000/this.rate);
                    }
                },

                onpause: () => {
                    clearInterval(update!);
                    update = null;
                },

                onstop: () => {
                    clearInterval(update!);
                    update = null;
                    this.currentTime = 0;
                },

                onend: async() => {
                    clearInterval(update!);
                    update = null;
                    this.currentTime = 0;
                    this.paused = true;
                    const store = usePlayList();
                    const { playList, playMode, order, isLocal } = storeToRefs(store);
                    if(isLocal.value) { // 本地音乐
                        if(playMode.value === 'repeat') {
                            nextSing();
                        }else if(playMode.value === 'random') {
                            randomSing();
                        }
                        const { playSrc } = usePlayList();
                        this.createAudio([playSrc]);
                        this.playMusic();
                    }else { // 在线音乐
                        let i = order.value;
                        if(playMode.value === 'repeat') {
                            i = i === playList.value.length-1? 0:i+1;
                        }else if(playMode.value === 'random') {
                            i = Math.floor(Math.random() * playList.value.length);
                        }
                        const urls = await getNetWorkUrls(i);
                        if(urls.length !== 0) {
                            this.createAudio(urls);
                            this.playMusic();
                        }
                    }
                }
            })
        },

        playMusic() {
            if(!this.sound) {
                const { playSrc } = usePlayList();
                this.createAudio([playSrc]);
            }
            this.sound?.play();
            this.paused = false;
        },

        stopMusic() {
            this.sound?.stop();
        },

        pauseMusic() {
            this.sound?.pause();
            this.paused = true;
        },

        setVolume(vol: number) {
            this.volume = vol;
            this.sound?.volume(vol);
        },

        seekMusic(val: number) {
            this.sound?.seek(val);
        },

        rateMusic(val: number) {
            this.rate = val;
            this.sound?.rate(val);
        }
    },

    persist: {
        key: 'audioPinia',
        storage: localStorage,
        pick: ['volume'],
    }
})