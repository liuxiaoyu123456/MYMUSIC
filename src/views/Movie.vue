<template>
  <MusicMv
    v-if="poster !== ''"
    :poster="poster"
    :url="url"
  />
  <div class="mv-title">{{ name }}</div>
  <div class="detail">
    <span>来自</span>
    <span class="author">{{ singers }}</span>
    <span class="item">{{ cnt }}次观看</span>
    <span class="item">发布时间：{{ publishDate }}</span>
    <div>简介：{{ desc }}</div>
  </div>
  <div class="btn">
    <VaButton preset="primary" icon="favorite_border" round>收藏</VaButton>
    <VaButton class="item" preset="primary" icon="file_download" round>下载</VaButton>
    <VaButton class="item" preset="primary" icon="share" round>分享</VaButton>
    <VaButton class="item" preset="primary" icon="comment" round>评论</VaButton>
  </div>
</template>
<script setup lang="ts">
import MusicMv from '@/components/Movie/MusicMv.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMvInfo, getMvUrl } from '@/api/mv';
import { getMvSingers, formatteDate  } from '@/utils';

const route = useRoute();

const poster = ref('');

const url = ref('');

const name = ref('');

const singers = ref('');

const cnt = ref(0);

const publishDate = ref('');

const desc = ref('');

const id = route.query.id as unknown as string;

const getMv = async() => {
    const { data }  = await getMvInfo(id);
    poster.value = data.info.cover_pic;
    name.value = data.info.name;
    singers.value  = getMvSingers(data.info.singers);
    cnt.value = data.info.playcnt;
    publishDate.value = formatteDate(data.info.pubdate);
    desc.value = data.info.desc || "暂无";
};

const getUrl = async() => {
    const { data } = await getMvUrl(id);
    url.value = data[id][0] || '';
};

onMounted(()=>{
    getMv();
    getUrl();
});
</script>
<style scoped>
.mv-title {
    margin-top: 16px;
    font-size: 20px;
}
.detail {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.55);
    line-height: 20px;
}
.author {
    margin-left: 5px;
}
.item {
    margin-left: 10px;
}
.btn {
    margin-top: 16px;
}
</style>
