<template>
  <div class="video" ref="artRef"></div>
  <div class="mv-title">Mv标题</div>
  <div class="detail">
    <span>来自</span>
    <span class="author">lxy</span>
    <span class="item">8817次观看</span>
    <span class="item">发布时间：2025-02-10</span>
    <div>简介：记得好好吃饭</div>
  </div>
  <div class="btn">
    <VaButton preset="primary" icon="favorite_border" round>收藏</VaButton>
    <VaButton class="item" preset="primary" icon="file_download" round>下载</VaButton>
    <VaButton class="item" preset="primary" icon="share" round>分享</VaButton>
    <VaButton class="item" preset="primary" icon="comment" round>评论</VaButton>
  </div>
</template>
<script setup lang="ts">
import Artplayer from "artplayer";
import { onMounted, ref } from "vue";
import { VaButton } from "vuestic-ui";

const artRef = ref();

const instance = ref<Artplayer | null>(null);

onMounted(()=>{
    instance.value = new Artplayer({
        container: artRef.value,
        url: '//player.alicdn.com/video/editor.mp4',
        theme: '#2c82e0',
        fullscreen: true,
    })
})
</script>
<style scoped>
.video {
    height: 360px;
}
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