import { defineStore } from "pinia";

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
        }
    }
})