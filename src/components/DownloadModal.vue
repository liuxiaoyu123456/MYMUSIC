<template>
    <VaModal
      :model-value="props.modelValue"
      title="下载"
      ok-text="下载"
      cancel-text="取消"
      size="small"
      @ok="download"
      @cancel="emit('close')"
      @before-open="select = '128'"
    >
      <div>
        <VaRadio
          vertical
          v-model="select"
          :options="downloadOptions"
          :rules="[
            (v) => v !== null || '必须选择下载格式',
            validateDowload,
          ]"
          value-by="value"
          immediate-validation
        />
      </div>
    </VaModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePlayList } from '@/store/play';
import { downloadMusic } from '@/api/song';

const props = defineProps<{
    modelValue: boolean
}>();

const emit = defineEmits<{
    (e: 'close'): void,
}>();

const ipcRenderer = require('electron').ipcRenderer;

const select = ref('128');

const downloadUrl = ref('');

const downloadOptions = [
    {
        text: 'mp3格式 128k',
        value: '128',
    },
    {
        text: 'mp3格式 320k',
        value: '320',
    },
    {
        text: 'm4a格式 128k',
        value: 'm4a'
    },
    {
        text: 'flac格式 无损',
        value: 'flac'
    },
    {
        text: 'ape格式 无损',
        value: 'ape'
    }
];

const download = () => {
    let type;
    if(select.value === '128' || select.value === '320') {
        type = 'mp3';
    }else {
        type = select.value;
    }
    const { singName } = usePlayList();
    ipcRenderer.send('download-file', downloadUrl.value, `${singName}.${type}`);
};

const validateDowload = async() => {
    let res = false;
    const { songmid } = usePlayList();
    const { data } = await downloadMusic(songmid as unknown as string, select.value);
    if(data) {
        res = true;
        downloadUrl.value = data;
    }
    return res || '没有该格式的歌曲资源！';
};
</script>