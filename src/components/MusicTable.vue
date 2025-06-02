<template>
    <VaDataTable
      v-model="selectItems"
      :selectable="props.select"
      select-mode="multiple"
      :items="props.items"
      :columns="props.columns"
      style="font-size: 14px;"
      hoverable
      clickable
      :row-bind="getRowStatus"
      @row:click="selectPlay"
      height="auto"
    >
        <template #cell(sing)="value">
            <div class="cell">
                <MusicPic :picSrc="value.rowData.picSrc" :load="value.rowData.isPlaying"/>
                <div>
                    <div>{{ value.rowData.sing }}</div>
                    <div class="singer" :class="{ blue: value.rowData.isPlaying}">
                        {{ value.rowData.artist }}
                    </div>
                </div>
            </div>       
        </template>
        <template #cell(download)="value">
            <VaProgressCircle
              v-if="value.rowData.process < 100"
              :model-value="value.rowData.process"
            >
                {{ value.rowData.process + "%" }}
            </VaProgressCircle>
            <VaIcon v-else name="check_circle" color="success" />
        </template>
        <template #cell(action)="value">
            <MenuList placement="right" :items="addOptions">
                <VaButton @click="add" icon="add_circle_outline" preset="secondary"/>
            </MenuList>
            <MenuList placement = "right" :items="moreOptions" @change-select="moreAction">
                <VaButton @click="more($event, value.rowIndex)" icon="more_horiz" preset="secondary"/>
            </MenuList>
        </template>
    </VaDataTable>
</template>
<script setup lang="ts">
import MenuList from '@/components/MenuList.vue';
import { usePlayList } from '@/store/play';
import { useAudio } from '@/store/audio';
import { useModal, type DataTableRow, } from 'vuestic-ui';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import MusicPic from "@/components/MusicPic.vue";

const ipcRenderer = require('electron').ipcRenderer;

const { selectItem, deleteItem } = usePlayList();

const { createAudio, playMusic, stopMusic } = useAudio();

const { init } = useModal();

const store = usePlayList();

const { selectItems }  = storeToRefs(store);

const actionIndex = ref(0);

const props = defineProps<{ 
    items: any[],
    columns: any[],
    select: boolean,
}>();

const addOptions = [
    { text: '我喜欢', value: 'like', icon: 'favorite_border' },
    { text: '播放列表', value: 'play_list', icon: 'playlist_play' }
];

const moreOptions = [
    { text: '播放', value: 'play', icon: 'play_circle_outline' },
    { text: '删除', value: 'delete', icon: 'delete_outline' },
    { text: '浏览本地文件', value: 'watch', icon: 'folder_open' },
    { text: '查看评论', value: 'comment', icon: 'comment' },
];

const selectPlay = (event: RowClickEvent) => {
    if(!event.item.isPlaying) {
        stopMusic();
        selectItem(event.itemIndex);
        const { playSrc } = usePlayList();
        createAudio(playSrc);
        playMusic();
    }
};

const add = (event: Event) => {
    event.stopPropagation();
}

const more = (event: Event, index: number) => {
    event.stopPropagation();
    actionIndex.value = index;
}

const moreAction = (item) => {
    if(item.value === 'delete') {
        init({
            message: '确定要删除文件吗',
            okText: '确定',
            cancelText: '取消',
            size: 'small',
            title: '删除',
            onOk: () => {
                deleteItem(actionIndex.value);
            }
        })
    }else if(item.value === 'watch') {
        const { playList } = store;
        ipcRenderer.send('watch-file', playList[actionIndex.value].url);
    }else if(item.value === 'play') {
        stopMusic();
        selectItem(actionIndex.value);
        const { playSrc } = usePlayList();
        createAudio(playSrc);
        playMusic();
    }
}

const getRowStatus = (row: DataTableRow) => {
    if(row.isPlaying) {
        return {
          class: ["playClass"]
        };
    }
}
</script>
<style scoped>
.singer {
    color: rgba(0, 0, 0, 0.55);
    margin-top: 5px;
}
.cell {
    font-size: 14px;
    display: flex;
    align-items: center;
}
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.blue {
    color: var(--va-primary);
}
:deep(.playClass) {
    color: var(--va-primary);
    background-color: rgba(44, 130, 224, 0.1);
}
</style>