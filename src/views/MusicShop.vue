<template>
    <div class="title">乐馆</div>
    <Tabs v-model="tab" :items="tabs" />
        <!-- <VaCarousel
          v-model="value"
          :items="items"
          :indicators="false"
          class="carousel"
        /> -->
    <div v-if="tab === 0">
        <!-- 精选 -->
        <Title :title="'官方歌单'" />
        <div class="album">
            <MusicCard
                class="album-item"
                v-for="item in recommendAblumItems"
                :pic-src="item.cover"
                :title="item.title"
            />
        </div>
        <Title :title="'最新发行'" />
        <div class="album">
            <MusicCard
                class="album-item"
                v-for="item in newSongsItems"
                :pic-src="item.cover"
                :title="item.title"
            />
        </div>
    </div>
    <div v-if="tab === 1" class="top">
        <!-- 巅峰榜 -->
        <div class="peak">
            <TopMusicCard
                v-for="item in topLists"
                :songs="item.song.map(item=>(item.title))"
                :title="item.label"
                :cover="item.picUrl"
            />
        </div>
        <!-- 地区榜 -->
        <div class="sub-title">地区榜</div>
        <div class="area">
            <PlayMusicCard
                class="play-music"
                v-for="item in areaSongsItems"
                :listen-num="item.listenNum"
                :pic-url="item.picUrl"
            />
        </div>
        <div class="sub-title">特色榜</div>
        <div class="area">
            <PlayMusicCard
                class="play-music"
                v-for="item in specialSongsItems"
                :listen-num="item.listenNum"
                :pic-url="item.picUrl"
            />
        </div>
        <div class="sub-title">全球榜</div>
        <div class="area">
            <PlayMusicCard
                class="play-music"
                v-for="item in globalSongsItems"
                :listen-num="item.listenNum"
                :pic-url="item.picUrl"
            />
        </div>
    </div>
    <div v-if="tab === 2">
        <div class="btn-group">
            <VaButton
              v-for="item in countryBtn"
              round
              preset="primary"
              style="width: 80px;"
              @click="singerParams.area = item.id"
            >
                {{ item.name }}
            </VaButton>
        </div>
        <div class="album">
            <div class="btn-group" >
                <VaButton
                    v-for="item in sexBtn"
                    round
                    preset="primary"
                    style="width: 80px;"
                    @click="singerParams.sex = item.id"
                >
                    {{ item.name }}
                </VaButton>
            </div>
            <VaMenu :options="genreBtn">
                <template #anchor>
                    <VaButton preset="plain">全部</VaButton>
                </template>
            </VaMenu>
        </div>
        <div class="btn-group">
            <VaButton
              v-for="item in indexBtn"
              preset="plain"
              @click="singerParams.index = item.id"
            >
                {{ item.name }}
            </VaButton>
        </div>
        <div class="singer-list">
            <div class="singer-item" v-for="item in singerList">
                <img class="singer-img" :src="item.singer_pic">
                <span style="cursor: pointer;">{{ item.singer_name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicCard from '@/components/MusicCard.vue';
import Title from '@/components/Musicshop/Title.vue';
import TopMusicCard from '@/components/Musicshop/TopMusicCard.vue';
import PlayMusicCard from '@/components/Musicshop/PlayMusicCard.vue';
import { getRecommendPlaylist, getNewSongs } from '@/api/recommend';
import { getTop } from '@/api/top';

import { onMounted, ref, watch } from 'vue';
import { getSingerCategory, getSingerList } from '@/api/singer';

const tabs = ['精选', '排行', '歌手'];

const countryBtn = ref([]);

const sexBtn = ref([]);

const genreBtn = ref([]);

const indexBtn = ref([]);

const tab = ref(0);

const recommendAblumItems = ref([]);

const newSongsItems = ref([]);

const areaSongsItems = ref([]);

const specialSongsItems = ref([]);

const globalSongsItems = ref([]);

const topLists = ref([]);

const singerList = ref([]);

const singerParams = ref({
    area: -100,
    genre: -100,
    index: -100,
    sex: -100,
})

const getRecommendAblums = async() => {
    const { data } = await getRecommendPlaylist();
    recommendAblumItems.value = data.data.list.slice(0, 6);
};

const getNewSongsItems = async() => {
    const { data } = await getNewSongs();
    newSongsItems.value = data.data.list.slice(0, 6);
    newSongsItems.value = newSongsItems.value.map(item=>({
        ...item,
        cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}_1.jpg`,
    }));
};

const getTopList = async() => {
    const { data } = await getTop();
    topLists.value = data.data[0].list;
    areaSongsItems.value = data.data[1].list;
    specialSongsItems.value = data.data[2].list;
    globalSongsItems.value = data.data[3].list;
};

const getSinger = async() => {
    const { data } = await getSingerList(singerParams.value);
    singerList.value = data.list;
}

watch(
    ()=>singerParams.value, () => {
        getSinger();
    },
    { deep: true }
)

onMounted(async()=>{
    getRecommendAblums();
    getNewSongsItems();
    getTopList();
    const { data }  = await getSingerCategory();
    countryBtn.value = data.area;
    sexBtn.value = data.sex;
    indexBtn.value = data.index;
    genreBtn.value = data.genre.map((item) => ({
        text: item.name,
        value: item.id,
    }));
    getSinger();
});
</script>
<style scoped>
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.carousel {
    margin-top: 10px;
}
.album {
    display: flex;
    justify-content: space-between;
}
.album-item {
    width: calc((100% - 75px)/6);
}
.top {
    margin-top: 15px;
}
.peak {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 16px;
}
.area {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.play-music {
    width: calc((100% - 50px)/6);
}
.sub-title {
    padding: 16px 0;
    font-size: 20px;
}
.btn-group {
    display: flex;
    gap: 15px;
    margin-top: 15px;
}
.singer-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
}
.singer-item {
    width: calc((100% - 80px)/5);
    text-align: center;
}
.singer-img {
    width: 100%;
    border-radius: 50%;
    margin-bottom: 15px;
    cursor: pointer;
}
</style>