import { defineStore } from "pinia";
import { Howl, Howler } from 'howler';
import { ref } from "vue";

export const useAudio = defineStore('audio', {
    state: () => ({
        sound: null,
        isLocal: true,
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

        changePause(val: boolean) {
            this.paused = val;
        }
    }
})