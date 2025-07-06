<template>
    <div class="like">
        <div v-if="!batchMode" class="title">喜欢</div>
        <Tabs v-if="!batchMode" :items="likeItems" class="tab"/>
        <MusicTable
          :items="likeLists"
          :columns="columns"
          :select="batchMode"
        />
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import MusicTable from '@/components/MusicTable.vue';
import { getSonglist } from '@/api/songlist';
import { useUserInfo } from '@/store/user';
import { usePlayList } from '@/store/play';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const { mymusic } = useUserInfo();

const store = usePlayList();

const { setLike } = store;

const { likeLists } = storeToRefs(store);

const likeItems = ['歌曲', '歌单', '专辑', '有声节目', '视频'];
const batchMode = ref(false);

const changeBatch = (val: boolean) => {
    batchMode.value = val;
};

const columns = [
  { key: 'sing', label: '歌手/歌名', sortable: true },
  { key: 'column', label: '专辑' },
  { key: 'length', label: '时长' },
  { key: 'action', label: '操作' }
]

const likeList = ref([]);

const getLikeList = async(id: string) => {
  const { data } = await getSonglist(id);
  likeList.value = data.data.songlist;
  setLike(likeList.value);
}

onMounted(async()=>{
  likeLists.value = [];
  getLikeList(mymusic[0].id);
})
</script>
<style scoped>
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.primary {
  color: var(--va-primary);
  margin-bottom: 10px;
}
.empty {
  height: calc(100% - 67px);
  position: relative;
  text-align: center;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>