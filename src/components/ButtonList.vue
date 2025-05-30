<template>
    <div class="button-list">
        <div class="left">
            <VaButton class="btn" round icon="play_arrow" preset="primary">播放</VaButton>
            <VaButton class="btn" round icon="download" preset="primary">下载</VaButton>
            <VaButton class="btn" round icon="add_circle_outline" preset="primary" @click="addFile">添加</VaButton>
            <input ref="inputFile" type="file" accept="audio/*" @change="handleFileChange" class="input-file">
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
import * as musicMetadata from 'music-metadata-browser';
import { getSize, formatFileSizeInMB } from '@/utils';

const add = (file) => {
    console.log(file);
}

const basic = ref([])

const store = useAudio();

const { addPlayItem } = usePlayList();

const imageUrl = ref('');

const myAudio = ref<HTMLAudioElement | null>(null);

const inputFile = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
    (e: 'batch-change', value: boolean): void,
}>();

const batchAction = ref(false);

const addFile = () => {
    inputFile.value?.click();
}

const handleFileChange = () => {
    const files = inputFile.value?.files!;
    const file = files[0];
    const blobUrl = URL.createObjectURL(file)
    musicMetadata.parseBlob(file).then((res)=>{
        if(res.common.picture){
            const blob = new Blob([res.common.picture[0].data as BlobPart], { type: 'image/png' });
            imageUrl.value = URL.createObjectURL(blob);
        }else {
            imageUrl.value = "";
        }
        const item = {
            url: blobUrl,
            sing: res.common.title,
            picSrc: imageUrl.value,
            column: res.common.album,
            artist: res.common.artist,
            length: getSize(res.format.duration),
            size: formatFileSizeInMB(file.size),
            
        }
        addPlayItem(item);
    })
}

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