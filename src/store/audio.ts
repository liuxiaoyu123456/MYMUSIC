import { defineStore } from "pinia";
import { Howl } from 'howler';

interface myAudio {
    sound: null | Howl,
    paused: boolean,
    volume: number,
}

export const useAudio = defineStore('audio', {
    state: (): myAudio  => ({
        sound: null,
        paused: true,
        volume: 1,
    }),

    actions: {
        createAudio(url: string) {
            this.sound = new Howl({
                src: [url],
                autoplay: true,
                loop: true,
                volume: this.volume,
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
    }
})