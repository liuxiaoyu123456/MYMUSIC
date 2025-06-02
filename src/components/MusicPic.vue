<template>
    <div class="img-area">
        <img class="pic" :src="props.picSrc">
        <div class="icon-music" v-if="props.load">
            <VaIcon
              :name="paused? 'play_arrow':'pause'" 
              color='#fff' 
              class="icon"
              size="large"
              @click="control"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAudio } from '@/store/audio';
import { storeToRefs } from 'pinia';

const props = defineProps<{ picSrc: string, load: boolean }>();

const store = useAudio();

const { pauseMusic, playMusic } = store;

const { paused } = storeToRefs(store);

const control = (e: Event) => {
    e.stopPropagation();
    if(paused.value) {
        playMusic();
    }else {
        pauseMusic();
    }
}
</script>
<style scoped>
.img-area {
    overflow: hidden;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    position: relative;
    border-radius: 5px;
}
.pic {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.icon-music {
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon {
    cursor: pointer;
}
</style>