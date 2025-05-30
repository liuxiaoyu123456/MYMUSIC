<template>
    <div class="music">
        <div class="title">乐馆</div>
        <Tabs :items="tabs"></Tabs>
        <VaCarousel
          v-model="value"
          :items="items"
          :indicators="false"
          class="carousel"
        />
        <MusicCard></MusicCard>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicCard from '@/components/MusicCard.vue';
import { ref } from 'vue';

const tabs = ['精选', '听书', '排行', '歌手'];

const value = ref(0);

const items = [
    "https://tse2-mm.cn.bing.net/th/id/OIP-C.aaAeXLr-ARXUBg5Qj8upVQHaE7?w=264&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://tse4-mm.cn.bing.net/th/id/OIP-C.4Ur_JeflYRtviA56gvYKdwHaEH?w=285&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
]
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
</style>