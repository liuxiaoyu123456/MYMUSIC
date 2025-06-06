<template>
    <div class="area-music"
      @mouseenter="show = false"
      @mouseleave="show = true"
    >
        <VaButton
          v-if="show"
          icon="headset"
          color="#262824"
          class="btn"
          size="small"
          round
        >
            {{ getListen(props.listenNum) }}
        </VaButton>
        <div class="hover">
            <VaButton
              round
              gradient
              icon="play_arrow"
            />
        </div>
        <img :src="props.picUrl" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getListen } from '@/utils';

const props = defineProps<{
    picUrl: string,
    listenNum: number
}>();

const show = ref(true);
</script>
<style scoped>
.area-music {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
}
img {
    width: 100%;
    height: 100%;
}
.hover {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hover:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
}
.btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>