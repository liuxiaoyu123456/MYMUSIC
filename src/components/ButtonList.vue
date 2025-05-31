<template>
    <div class="button-list">
        <!-- <audio :src="url" autoplay></audio> -->
        <div class="left">
            <VaButton class="btn" round icon="play_arrow" preset="primary">播放</VaButton>
            <VaButton class="btn" round icon="download" preset="primary">下载</VaButton>
            <VaButton class="btn" round icon="add_circle_outline" preset="primary" @click="addFile">添加</VaButton>
            <VaButton class="btn" round icon="checklist" preset="primary" @click="batchAction = true;">批量</VaButton>
        </div>
        <div class="right" v-if="!batchAction">
            <VaInput
              clearable
              v-model="keyWord"
              placeholder="搜索音乐"
              preset="solid"
            >
                <template #prependInner>
                    <VaIcon
                        name="search"
                        color="secondary"
                    />
                </template>
            </VaInput>
            <!-- <VaButton class="btn" icon="filter_alt">筛选</VaButton> -->
        </div>
        <div v-else>
            <VaButton
              icon="close"
              preset="primary"
              @click="batchAction = false;"
              round
            >退出批量</VaButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useAudio } from '@/store/audio';
import { usePlayList } from '@/store/play-list';
import { storeToRefs } from 'pinia';
import { type IAudioMetadata } from 'music-metadata';
import { getSize, formatFileSizeInMB } from '@/utils';

const ipcRenderer = require('electron').ipcRenderer;

const store = useAudio();

const { sound } = storeToRefs(store);

const { createAudio } = store;

const { addPlayItem } = usePlayList();

const myAudio = ref<HTMLAudioElement | null>(null);

const emit = defineEmits<{
    (e: 'batch-change', value: boolean): void,
}>();

const batchAction = ref(false);

const addFile = () => {
    ipcRenderer.send('open-file-dialog');
}

// 监听文件名
ipcRenderer.on('selected-file', (event: Event, selectedFilePath: string, file: IAudioMetadata, size: number) => {
    
    const item = {
        url: selectedFilePath,
        sing: file.common.title,
        column: file.common.album,
        artist: file.common.artist,
        length: getSize(file.format.duration),
        size: formatFileSizeInMB(size),
    }
    // 添加到播放列表
    addPlayItem(item);
});

onMounted(()=>{
    myAudio.value = document.getElementById("audio") as HTMLAudioElement;
})

watch(
    () => batchAction.value, (newValue) => {
        emit('batch-change', newValue);
    }
)
</script>
<style scoped>
.button-list {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn:not(:first-child) {
    margin-left: 10px;
}
.filter {
    display: flex;
    justify-content: space-between;
}
.filter-input {
    width: 49%;
}
.input-file {
    display: none;
}
</style>