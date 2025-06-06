<template>
    <div class="title">视频</div>
    <Tabs :items="tabs"></Tabs>
    <VaCarousel
      v-if="recommendItems.length > 0"
      v-model="carousel"
      :items="recommendItems"
      class="carousel"
      :indicators="false"
    />
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import { newMv } from '@/api/new';
import { onMounted, ref } from 'vue';
const tabs = ['推荐','排行榜','视频库'];

const carousel = ref(0);

const recommendItems = ref([]);

onMounted(()=>{
    newMv().then(res=>{
        recommendItems.value = res.data.data.list.map(item=>ref(item.picurl)).slice(0,6);
    });
})

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