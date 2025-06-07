import { defineStore } from "pinia";
import { Howl } from 'howler';
import { usePlayList } from "@/store/play";

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
                    // console.log('开始播放');
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

                onend: () => {
                    clearInterval(update!);
                    update = null;
                    this.currentTime = 0;
                    this.paused = true;
                    const { playMode } = usePlayList();
                    if(playMode === 'repeat') {
                        nextSing();
                    }else if(playMode === 'random') {
                        randomSing();
                    }
                    const { playSrc } = usePlayList();
                    this.createAudio([playSrc]);
                    this.playMusic();
                }
            })
        },

        playMusic() {
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
    }

})