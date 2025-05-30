<template>
    <div class="local">
        <div v-if="!batchMode" class="title">本地和下载</div>
        <Tabs v-if="!batchMode" :items="tabs"/>
        <ButtonList @batch-change="changeBatch" />
        <MusicTable :items="playList" :columns="columns" :select="batchMode"/>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicTable from '@/components/MusicTable.vue';
import ButtonList from '@/components/ButtonList.vue';
import { usePlayList } from '@/store/play-list';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const store = usePlayList();

const { playList } = storeToRefs(store);

const tabs = ['本地歌曲','下载歌曲','正在下载'];

const columns = [
    { key: 'sing', label: '歌手/歌名' },
    { key: 'column', label: '专辑' },
    { key: 'length', label: '时长' },
    { key: 'size', label: '大小' },
    // { key: 'download', label: '下载进度' },
    { key: 'action', label: '操作' }
]

// const items = [
//     {
//         sing: '落花',
//         picSrc: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.w1IQ6LCszrQ3FfSNQzJV6gAAAA?w=152&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
//         column: '落花',
//         length: '03:05',
//         size: '6.8M',
//         process: 65,
//     },
//     {
//         sing: '三寸天堂',
//         picSrc: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.RM1fDAvhXNwWp_hkOsRx0QHaHY?w=170&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
//         column: '步步惊心 电视剧原声带',
//         length: '04:50',
//         size: '11.1M',
//         process: 44,
//     },
//     {
//         sing: '锦鲤抄',
//         picSrc: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.VsQXfIzJeoG32DvSUvEBlAHaHa?w=157&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
//         column: '腐草为萤',
//         length: '03:55',
//         size: '5.36M',
//         process: 100
//     }
// ]

const batchMode = ref(false);

const changeBatch = (val: boolean) => {
    batchMode.value = val;
}
</script>
<style scoped>
.local {
    overflow: hidden;
}
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
</style>