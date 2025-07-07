import { defineStore } from "pinia";
import { useToast } from "vuestic-ui";
import { getTime, getNetworkImage, getArtist } from "@/utils";

const { init } = useToast();

export const usePlayList = defineStore('play', {
    state: () => ({
        playList: [],
        likeLists: [],
        localSongs: [],
        playSrc: '',
        singName: '',
        singArtist: '',
        playCover: '',
        order: 0,
        playMode: 'repeat',
        selectItems: [],
        isLocal: false,
        songId: 0,
        songmid: 0,
    }),

    actions: {
        addPlayItem(item) {
            const lists = this.localSongs.map(item=>item.url);
            if(lists.includes(item.url)){
                init({
                    message: "重复添加！",
                    color: "warning"
                })
            }else {
                this.localSongs.push(item);
                this.playList.push(item);
            }
        },

        selectItem(num: number) {
            // 设置播放状态
            this.playList.forEach((item, index)=>{
                if(index === num) {
                    item.isPlaying = true;
                }else {
                    item.isPlaying = false;
                }
            })
            this.order = num;
            if(this.playList.length > 0){
                this.playSrc = this.playList[num].url || '';
                this.singName = this.playList[num].sing;
                this.singArtist = this.playList[num].artist;
                this.playCover = this.playList[num].picSrc;
            }
        },

        deleteItem(num: number) {
            this.playList.splice(num, 1);
            this.localSongs.splice(num, 1);
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
        },

        randomSing() {
            const randomIndex = Math.floor(Math.random() * this.playList.length);
            this.order = randomIndex;
            this.selectItem(this.order);
        },

        batchDelete(deleteItems?: any[]) {
            const lists = deleteItems? deleteItems:this.selectItems.map(item=>item.id); // 需要删除的id列表
            for(let i=0; i<this.playList.length;i++) {
                if(lists.includes(this.playList[i].id)) {
                    this.playList.splice(i, 1);
                    this.localSongs.splice(i, 1);
                    i = i - 1;
                }
            }
        },

        setSelectItems(arr: any[]) {
            this.selectItems = arr;
        },

        addLocaltoPlay() {
            this.playList.forEach(item=>{
                item.isPlaying = false;
            });
            this.playList = [...this.localSongs];
            this.isLocal = true;
        },

        addLiketoPlay() {
            this.playList.forEach(item=>{
                item.isPlaying = false;
            });
            this.playList = [...this.likeLists];
            this.isLocal = false;
        },

        setLike(arr: any[]) {
            arr.forEach((item) => {
                const like = {
                    id: item.songmid,
                    songid: item.songid,
                    sing: item.songname,
                    column: item.albumname,
                    length: getTime(item.interval),
                    picSrc: getNetworkImage(item.albummid),
                    artist: getArtist(item.singer),
                    isPlaying: false,
                }
                this.likeLists.push(like);
            })
        },
    },

    persist: true, // 持久化存储
})