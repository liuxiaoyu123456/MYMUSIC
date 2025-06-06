<template>
    <div v-if="!batchMode" class="title">本地和下载</div>
    <Tabs v-if="!batchMode" :items="tabs"/>
    <ButtonList @batch-change="changeBatch"/>
    <MusicTable
      :items="playList"
      :columns="columns"
      :select="batchMode"
    />
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicTable from '@/components/MusicTable.vue';
import ButtonList from '@/components/ButtonList.vue';
import { usePlayList } from '@/store/play';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { getUserDetail } from '@/api/user';

const store = usePlayList();

const { playList } = storeToRefs(store);

const tabs = ['本地歌曲','下载歌曲','正在下载'];

const currentPage = ref(1);

const columns = [
    { key: 'sing', label: '歌手/歌名', sortable: true },
    { key: 'column', label: '专辑' },
    { key: 'length', label: '时长' },
    { key: 'size', label: '大小' },
    { key: 'action', label: '操作' }
]

const batchMode = ref(false);

const changeBatch = (val: boolean) => {
    batchMode.value = val;
};
// console.log(getUserDetail());
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