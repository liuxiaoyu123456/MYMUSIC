<template>
    <div class="player-cover">
        <img
          class="pointer"
          src="@/assets/pointer.png"
          :class="{ 'pause-rotate': !props.paused }"
        >
        <img class="cover" :src="props.info.cover">
        <div class="name">{{ props.info.name }}</div>
        <div class="info">
          <VaMenuList
            :options="singOptions"
          />
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    info: {
        cover: string,
        name: string,
        artists: string,
        album: string,
    },
    paused: boolean
}>();

const singOptions = computed(()=>(
    [
        { id: '0', value: 'artist', text: props.info.artists, icon: 'person' },
        { id: '1', value: 'album', text: props.info.album, icon: 'album' },
    ]
))
</script>
<style scoped>
.info {
    margin-left: 60px;
    margin-top: 30px;
}
.player-cover {
    position: relative;
    color: #fff;
    width: 50%;
}
.name {
    font-size: 25px;
    margin-left: 60px;
    margin-top: 28px;
}
.cover {
    width: 320px;
    height: 320px;
    margin-top: 60px;
    margin-left: 60px;
    border-radius: 16px;
    cursor: pointer;
}
.pointer {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 180px;
    transform-origin: left top;
    transition: none;
    transform: rotate(25deg);
}
@keyframes spin25{
  from { transform: rotate(25deg); }
  to   { transform: rotate(0deg); }
}
.pause-rotate {
    animation: spin25 1s forwards;
}
:deep(.va-menu-item__cell--left) {
    width: 28px;
}
:deep(.va-menu-list) {
    width: 320px !important;
}
</style>