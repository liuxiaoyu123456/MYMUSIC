<template>
    <div v-if="!batchMode" class="title">本地和下载</div>
    <Tabs v-if="!batchMode" :items="tabs"/>
    <ButtonList
      @batch-change="changeBatch"
      @search="searchSongs"
    />
    <MusicTable
      v-if="localSongs.length !== 0"
      :items="localSongs"
      :columns="columns"
      :select="batchMode"
    />
    <Empty v-else :emptyImg="EmptyMusic" :tip="tipEmpty"/>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicTable from '@/components/MusicTable.vue';
import ButtonList from '@/components/ButtonList.vue';
import Empty from '@/components/Empty.vue';
import { usePlayList } from '@/store/play';
import { fuzzySearch } from '@/utils';
import { onBeforeUnmount, ref } from 'vue';
import EmptyMusic from '@/assets/empty.svg';
import EmptyVideo from '@/assets/empty-video.svg';
import { storeToRefs } from 'pinia';

const ipcRenderer = require('electron').ipcRenderer;

const store = usePlayList();

const { setInitSongs } = store;

const { localSongs, initSongs } = storeToRefs(store);

setInitSongs(localSongs.value);

const tabs = ['本地歌曲','下载歌曲','下载视频','正在下载'];

const columns = [
    { key: 'sing', label: '歌手/歌名', sortable: true },
    { key: 'column', label: '专辑' },
    { key: 'length', label: '时长' },
    { key: 'size', label: '大小' },
    { key: 'action', label: '操作' }
];

const batchMode = ref(false);

const tipEmpty = ref('暂时没有音乐');

const changeBatch = (val: boolean) => {
    batchMode.value = val;
};

const searchSongs = (val: string) => {
    localSongs.value = fuzzySearch(initSongs.value, val, ['sing', 'column', 'artist']);
};

// 组件销毁时恢复数据
onBeforeUnmount(()=>{
    localSongs.value = initSongs.value;
});

// 窗口关闭时恢复数据
ipcRenderer.on('reset-local',()=>{
    localSongs.value = initSongs.value;
})
</script>
<style scoped>
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.pagination {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
</style>