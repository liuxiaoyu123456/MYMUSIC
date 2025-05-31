<template>
    <div class="player">
        <div class="sing">
            <img class="sing-img" src="">
            <div class="info">
                <div class="name">随意-刘晓宇</div>
                <div class="btn-list">
                    <VaButton preset="secondary" icon="favorite_border" size="small"/>
                    <VaBadge overlap text="5" style="--va-badge-text-wrapper-border-radius: 50%;">
                        <VaButton preset="secondary" icon="comment" size="small"/>
                    </VaBadge>
                    <MenuList placement="top" :items="options">
                        <VaButton preset="secondary" icon="more_horiz" size="small"/>
                    </MenuList>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="play">
                <VaButton size="large" preset="secondary" icon="loop"/>
                <div class="action">
                    <VaButton preset="plain" size="large">
                        <template #append>
                            <font-awesome-icon icon="fa-solid fa-backward-step" />
                        </template>
                    </VaButton>
                    <VaButton
                      color="info"
                      gradient
                      :icon="paused? 'play_arrow' : 'pause'"
                      round
                      style="width: 50px;"
                      @click="control"
                    />
                    <VaButton preset="plain" size="large">
                        <template #append>
                            <font-awesome-icon icon="fa-solid fa-forward-step" />
                        </template>
                    </VaButton>
                </div>
                <VaDropdown placement="top" trigger="hover">
                    <template #anchor>
                        <VaButton size="large" preset="secondary" :icon="volume>0?'volume_down':'volume_off'"/>
                    </template>
                    <VaDropdownContent>
                        <div class="slider">
                            <VaSlider
                              track-label-visible
                              v-model="soundProgress"
                              @change="changeVolume"
                              vertical
                            />  
                        </div>
                    </VaDropdownContent>
                </VaDropdown>
            </div>
            <VaSlider track-label-visible :model-value="10" />
        </div>
        <div class="list">
            <VaButton preset="secondary" size="small">词</VaButton>
            <VaButton
                @click="open"
                size="large"
                icon="playlist_play"
                preset="secondary"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import MenuList from '@/components/MenuList.vue';
import { onMounted, ref, watch } from 'vue';
import { useAudio } from '@/store/audio';
import { usePlayList } from '@/store/play-list';
import { storeToRefs } from 'pinia';

const emit = defineEmits<{
    (e: 'open-list'): void,
}>()

const store = useAudio();

const playStore = usePlayList();

const { playSrc } = storeToRefs(playStore);

const { createAudio } = store;

const { paused, volume, sound } = storeToRefs(store);

const myAudio = ref();

const soundProgress = ref(volume.value*100);

const open = () => {
    emit('open-list');
}

const options = [
    { text: '我喜欢', value: 'like', icon: 'favorite_border' },
    { text: '添加到', value: 'add', icon: 'add_circle_outline' },
    { text: '下载', value: 'download', icon: 'download'},
    { text: '分享', value: 'share', icon: 'share' },
    { text: '倍速', value: 'speed', icon: 'speed' },
    { text: '从播放列表中删除', value: 'delete', icon: 'delete_outline' }
];

const control = () => {
    if(paused.value) {
        myAudio.value.play();
        paused.value = false;
    }else {
        myAudio.value.pause();
        paused.value = true;
    }
}

onMounted(()=>{
    myAudio.value = document.getElementById("audio");
})

const changeVolume = () => {
    volume.value = soundProgress.value/100;
    myAudio.value.volume = volume.value;
}

// console.log(sound.value);
</script>
<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
}
.sing-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.name {
    font-size: 14px;
}
.btn-list {
    justify-content: space-between;
    display: flex;
    align-items: center;
    width: 100px;
}
.player {
    padding: 8px;
    height: 70px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.play {
    display: flex;
    align-items: center;
    width: 400px;
    justify-content: space-between;
    margin-bottom: 5px;
}
.sing {
    display: flex;
    width: 250px;
}
.list {
    width: 250px;
    display: flex;
    justify-content: end;
}
.slider {
    width: 60px;
    height: 150px;
}
.center {
    text-align: center;
}
:deep(.va-slider--horizontal .va-slider__track) {
    height: 4px;
}
:deep(.va-slider--horizontal .va-slider__handler) {
    height: 6px;
    width: 6px;
}
:deep(.va-slider--horizontal .va-slider__container) {
    height: auto;
}
:deep(.va-slider__handler__dot--value) {
    color: black !important;
}
</style>