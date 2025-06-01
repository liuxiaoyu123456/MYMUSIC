import { defineStore } from "pinia";
import { Howl } from 'howler';

interface myAudio {
    sound: null | Howl,
    paused: boolean,
    volume: number,
    currentTime: number,
    duration: number | undefined,
}

export const useAudio = defineStore('audio', {
    state: (): myAudio  => ({
        sound: null,
        paused: true,
        volume: 1,
        currentTime: 0,
        duration: 100,
    }),

    actions: {
        createAudio(url: string) {
            let update: number;
            this.sound = new Howl({
                src: [url],
                autoplay: true,
                volume: this.volume,

                onload: () => {
                    this.duration = this.sound?.duration();
                },

                onplay: () => {
                    update = setInterval(()=>{
                        this.currentTime = this.currentTime +1;
                    }, 1000);
                },

                onpause: () => {
                    clearInterval(update);
                },

                onstop: () => {
                    clearInterval(update);
                    this.currentTime = 0;
                },

                onend: () => {
                    clearInterval(update);
                    this.currentTime = 0;
                    this.paused = true;
                }
            })
        },

        playMusic() {
            this.sound!.play();
            this.paused = false;
        },

        stopMusic() {
            if(this.sound) {
                this.sound.stop();
            }
        },

        pauseMusic() {
            this.sound!.pause();
            this.paused = true;
        },

        setVolume(vol: number) {
            this.volume = vol;
            this.sound!.volume(vol);
        },

        seekMusic(val: number) {
            this.sound?.seek(val);
            if(this.paused) {
                this.playMusic();
            }
        }
    }

})