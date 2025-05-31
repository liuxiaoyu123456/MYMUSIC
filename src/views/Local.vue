<template>
    <div class="local">
        <div v-if="!batchMode" class="title">本地和下载</div>
        <Tabs v-if="!batchMode" :items="tabs"/>
        <ButtonList @batch-change="changeBatch" />
        <div class="play-table">
            <MusicTable :items="playList" :columns="columns" :select="batchMode"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicTable from '@/components/MusicTable.vue';
import ButtonList from '@/components/ButtonList.vue';
import { usePlayList } from '@/store/play';
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
    { key: 'action', label: '操作' }
]

const batchMode = ref(false);

const changeBatch = (val: boolean) => {
    batchMode.value = val;
}
</script>
<style scoped>
.local {
    overflow: hidden;
    flex-direction: column;
    display: flex;
    height: 100%;
}
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.play-table {
    flex: 1;
    overflow: auto;
}
</style>