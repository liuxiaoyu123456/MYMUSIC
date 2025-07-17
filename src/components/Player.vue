<template>
    <div class="player">
        <div class="sing">
            <PlayPic :cover="playCover" @full-sreen="fullModal = true;"/>
            <div class="info">
                <div class="name">
                    <span>{{ singName }}</span>
                    <span class="singer">-{{ singArtist }}</span>
                </div>
                <div class="btn-list">
                    <VaButton
                      preset="secondary"
                      icon="favorite_border"
                      :disabled="isLocal"
                    />
                    <VaBadge overlap v-bind:text="total" :offset="[-10,5]">
                        <VaButton
                          preset="secondary"
                          icon="comment"
                          @click="toComment"
                          :disabled="isLocal"
                        />
                    </VaBadge>
                    <MenuList placement="top" :items="options" @change-select="changeMore">
                        <VaButton preset="secondary" icon="more_horiz"/>
                    </MenuList>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="play">
                <MenuList placement="top" :items="playModeOptions" @change-select="selectPlayMode">
                    <VaButton preset="secondary" size="large">
                        <template #append>
                            <font-awesome-icon v-if="playModeIcon.split('-')[0] === 'fa'" :icon="playModeIcon" />
                            <VaIcon v-else :name="playModeIcon" size="large"/>
                        </template>
                    </VaButton>
                </MenuList>
                <div class="action">
                    <VaButton @click="prev" preset="plain" size="large">
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
                    <VaButton @click="next" preset="plain" size="large">
                        <template #append>
                            <font-awesome-icon icon="fa-solid fa-forward-step" />
                        </template>
                    </VaButton>
                </div>
                <VaDropdown placement="top" trigger="hover">
                    <template #anchor>
                        <VaButton size="large" preset="secondary" :icon="volume>0?'volume_up':'volume_off'"/>
                    </template>
                    <VaDropdownContent>
                        <div class="slider">
                            <VaSlider
                              track-label-visible
                              v-model="volumeProgress"
                              @change="setVolume(volumeProgress/100);"
                              vertical
                            />  
                        </div>
                    </VaDropdownContent>
                </VaDropdown>
            </div>
            <VaSlider track-label-visible v-model="currentTime" :max="duration" @change="changeTime">
                <template #trackLabel="{ value }">
                    {{ getTime(value) }}
                </template>
            </VaSlider>
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
    <RateModal
      v-model="modal"
      @close="modal = false"
    />
    <DownloadModal
      v-model="downloadModal"
      @close = "downloadModal = false"
    />
    <FullScreen
      v-model="fullModal"
    />
</template>
<script lang="ts" setup>
import MenuList from '@/components/MenuList.vue';
import RateModal from '@/components/RateModal.vue';
import PlayPic from '@/components/PlayPic.vue';
import FullScreen from '@/components/FullScreen.vue';
import DownloadModal from '@/components/DownloadModal.vue';
import { ref, watch } from 'vue';
import { useAudio } from '@/store/audio';
import { storeToRefs } from 'pinia';
import { usePlayList } from '@/store/play';
import { getComments, getNetWorkUrls, getTime } from '@/utils';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
    (e: 'open-list'): void,
}>()

const store = useAudio();

const playStore = usePlayList();

const router = useRouter();

const { setVolume, stopMusic, playMusic, pauseMusic, createAudio, seekMusic } = store;

const { paused, volume, currentTime, duration } = storeToRefs(store);

const { nextSing, prevSing } = playStore;

const { singName, singArtist, playCover, playMode, order, isLocal, songId } = storeToRefs(playStore)

let total: number | string = '';

const volumeProgress = ref(volume.value*100);

const playModeIcon = ref(playMode.value);

const modal = ref(false);

const fullModal = ref(false);

const downloadModal = ref(false);

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

const playModeOptions = [
    { text: '随机播放', value: 'random', fa: 'fa-solid fa-shuffle' },
    { text: '单曲循环', value: 'repeat_one', icon: 'repeat_one' },
    { text: '循环播放', value: 'repeat', icon: 'repeat' },
]

const control = () => {
    if(paused.value) {
        playMusic();
    }else {
        pauseMusic();
    }
}

const selectPlayMode = (item) => {
    playModeIcon.value = item.icon || item.fa;
    playMode.value = item.value;
}

const next = async() => {
    stopMusic();
    nextSing();
    if(isLocal.value) {
        const { playSrc } = playStore;
        createAudio([playSrc]);
        playMusic();
    }else {
        const i = order.value;
        const urls = await getNetWorkUrls(i);
        if(urls.length) {
            createAudio(urls);
            playMusic();
        }
    }
}

const prev = async() => {
    stopMusic();
    prevSing();
    if(isLocal.value) {
        const { playSrc } = playStore;
        createAudio([playSrc]);
        playMusic();
    }else {
        const i = order.value;
        const urls = await getNetWorkUrls(i);
        if(urls.length) {
            createAudio(urls);
            playMusic();
        }
    }
}

const changeTime = (val: number) => {
    seekMusic(val);
}

const changeMore = async(item) => {
    if(item.value === 'speed') {
        modal.value = true;
    }else if(item.value === 'download') {
        downloadModal.value = true;
    }
}

const toComment = () => {
    router.push({
        path: '/comment',
        query: {
            id: songId.value,
        }
    })
}

watch(
    () => songId.value, async(val) => {
        if(!isLocal.value) {
            const data = await getComments(val);
            total = data > 999? '999+' : data;
        }else {
            total = '';
        }
    },
    { immediate: true }
)
</script>
<style scoped>
.action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 64px;
    overflow: hidden;
}
.name {
    font-size: 14px;
    /* margin-bottom: 5px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
}
.btn-list {
    justify-content: space-between;
    display: flex;
    align-items: center;
    width: 120px;
}
.player {
    padding: 8px;
    height: 80px;
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
    margin-bottom: 10px;
}
.sing {
    display: flex;
    width: 300px;
    align-items: center;
    height: 64px;
}
.list {
    width: 300px;
    display: flex;
    justify-content: end;
}
.slider {
    width: 60px;
    height: 150px;
}
.center {
    text-align: center;
    margin-top: -4px;
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
:deep(.va-slider__handler__dot--focus) {
    display: none;
}
:deep(.va-slider__handler__dot--value) {
    color: black !important;
}
:deep(.va-badge--floating .va-badge__text-wrapper) {
    z-index: 1;
}
.singer {
    color: rgba(0, 0, 0, 0.55);
}
</style>