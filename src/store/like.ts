import { defineStore } from "pinia";
import { getTime } from "@/utils";

interface myLike {
    likeLists: any[],
}

export const useLike = defineStore('like', {
    state: (): myLike => ({
        likeLists: [],
    }),

    actions: {
        addLike(item) {
            this.likeLists.push(item);
        },

        setLike(arr: any[]) {
            arr.forEach((item) => {
                this.likeLists.push({
                    sing: item.songname,
                    column: item.albumname,
                    length: getTime(item.interval),
                    picSrc: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}_1.jpg`
                })
            })
        },
    }
})