<template>
    <div class="button-list">
        <div class="left">
            <VaButton class="btn" round icon="play_arrow" preset="primary" @click="play">播放</VaButton>
            <VaButton class="btn" round icon="add_circle_outline" preset="primary" @click="addFile">添加</VaButton>
            <VaButton class="btn" round icon="checklist" preset="primary" @click="batchAction = true;">批量</VaButton>
            <VaButton v-if="batchAction" class="btn" round icon="delete_outline" preset="primary" @click="Delete">删除</VaButton>
        </div>
        <VaInput
          v-if="!batchAction"
          v-model="keyWord"
          placeholder="搜索音乐"
          preset="solid"
          clearable
          @keydown="searchMusic"
        >
            <template #prependInner>
                <VaIcon
                  name="search"
                  color="secondary"
                />
            </template>
        </VaInput>
        <VaButton
          v-else
          icon="close"
          preset="primary"
          @click="exit"
          round
        >退出批量</VaButton>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAudio } from '@/store/audio';
import { usePlayList } from '@/store/play';
import { type IAudioMetadata } from 'music-metadata';
import { getTime, formatFileSizeInMB, getImage } from '@/utils';
import { useModal } from 'vuestic-ui';

const ipcRenderer = require('electron').ipcRenderer;

const { playMusic, stopMusic, createAudio } = useAudio();

const { selectItem, batchDelete, setSelectItems } = usePlayList();

const { addPlayItem } = usePlayList();

const { init } = useModal();

const keyWord = ref('');

const emit = defineEmits<{
    (e: 'batch-change', value: boolean): void,
    (e: 'search', value: string): void,
}>();

const batchAction = ref(false);

const addFile = () => {
    ipcRenderer.send('open-file-dialog');
};

const Delete = ()=>{
    init({
        message: '确定要删除文件吗',
        okText: '确定',
        cancelText: '取消',
        size: 'small',
        title: '删除',
        onOk: () => {
            const { selectItems } = usePlayList();
            batchDelete();
        }
    });
    
};

const exit = () => {
    batchAction.value = false;
    setSelectItems([]);
}

// 监听文件名
ipcRenderer.on('selected-file', (event: Event, selectedFilePath: string, file: IAudioMetadata, size: number) => {
    // 读取音频文件封面
    const image = file.common.picture;
    const picSrc = getImage(image!);
    const id = Math.floor(Math.random()*1000000)+1000000;
    const item = {
        id,
        picSrc,
        url: selectedFilePath,
        sing: file.common.title,
        column: file.common.album,
        artist: file.common.artists?.join(","),
        length: getTime(file.format.duration!),
        size: formatFileSizeInMB(size),
        isPlaying: false,
    }
    // 添加到播放列表
    addPlayItem(item);
});

const play = () => {
    stopMusic();
    selectItem(0);
    const { playSrc } = usePlayList();
    createAudio([playSrc]);
    playMusic();
};

const searchMusic = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
        emit('search', keyWord.value);
    }
};

watch(
    () => batchAction.value, (newValue) => {
        emit('batch-change', newValue);
    }
)

watch(
    () => keyWord.value, (val) => {
        if(!val) {
            emit('search', val)
        }
    }
)
</script>
<style scoped>
.button-list {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
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