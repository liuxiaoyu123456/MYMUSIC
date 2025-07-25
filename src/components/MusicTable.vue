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
                    <div>
                        {{ value.rowData.sing }}
                        <span v-if="value.rowData.vid" class="mv-icon" @click="toVideo($event, value.rowData.vid)">
                            <VaIcon name="play_arrow" size="14px"></VaIcon>
                        </span>
                    </div>
                    <div class="singer" :class="{ blue: value.rowData.isPlaying}">
                        {{ value.rowData.artist }}
                    </div>
                </div>
            </div>       
        </template>
        <template #cell(column)="value">
            <div class="column">
                {{ value.rowData.column }}
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
                <VaButton @click="more($event, value.rowData.id, value.rowIndex)" icon="more_horiz" preset="secondary"/>
            </MenuList>
        </template>
    </VaDataTable>
    <AddOptions v-model="addSelect"/>
</template>
<script setup lang="ts">
import MenuList from '@/components/MenuList.vue';
import MusicPic from "@/components/MusicPic.vue";
import AddOptions from '@/components/AddOptions.vue';
import { usePlayList } from '@/store/play';
import { useAudio } from '@/store/audio';
import { useModal, type DataTableRow } from 'vuestic-ui';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { getNetWorkUrls } from '@/utils';
import router from '@/router';

const props = defineProps<{ 
    items: any[],
    columns: any[],
    select: boolean,
}>();

const emit = defineEmits<{
    ( e: 'deleteItem', value: number[]): void,
}>();

const route = useRoute();

const ipcRenderer = require('electron').ipcRenderer;

const { selectItem, deleteItem, addLocaltoPlay, addLiketoPlay } = usePlayList();

const { createAudio, playMusic, stopMusic } = useAudio();

const { init } = useModal();

const store = usePlayList();

const { selectItems, isLocal, songId, songmid }  = storeToRefs(store);

const actionId = ref(0);

const actionIndex = ref(0);

const first = ref(true);

const addSelect = ref(false);

const addOptions = [
    { text: '我喜欢', value: 'like', icon: 'favorite_border' },
    { text: '播放列表', value: 'play_list', icon: 'playlist_play' }
];

const moreOptions =ref([
    { text: '播放', value: 'play', icon: 'play_circle_outline' },
    { text: '删除', value: 'delete', icon: 'delete_outline' },
    { text: '添加到', value: 'add', icon: 'add_circle_outline' },
    { text: '浏览本地文件', value: 'watch', icon: 'folder_open' },
    { text: '查看评论', value: 'comment', icon: 'comment' },
]);

const selectPlay = async(event: RowClickEvent) => {
    if(first.value) {
        if(route.path === '/local') {
            addLocaltoPlay();
        }else {
            addLiketoPlay();
        }
        first.value = false;
    }
    if(!event.item.isPlaying) {
        stopMusic();
        if(isLocal.value) {
            selectItem(event.item.id);
            const { playSrc } = usePlayList();
            createAudio([playSrc]);
            playMusic();
        }else {
            let i = event.itemIndex;
            const urls = await getNetWorkUrls(i);
            if(urls.length!==0) {
                createAudio(urls);
                playMusic();
            }
        }
        songId.value = event.item.songid;
        songmid.value = event.item.id;
    }
};

const add = (event: Event) => {
    event.stopPropagation();
};

const more = (event: Event, id: number, index: number) => {
    event.stopPropagation();
    actionId.value = id;
    actionIndex.value = index;
};

const moreAction = (item) => {
    switch(item.value) {
        case 'delete':
            init({
                message: '确定要删除文件吗',
                okText: '确定',
                cancelText: '取消',
                size: 'small',
                title: '删除',
                onOk: () => {
                    deleteItem(actionId.value);
                    emit('deleteItem', [actionId.value]);
                }
            })
            break;
        case 'watch':
            const { localSongs } = store;
            ipcRenderer.send('watch-file', localSongs[actionIndex.value].url);
            break;
        case 'play':
            stopMusic();
            selectItem(actionId.value);
            const { playSrc } = usePlayList();
            createAudio([playSrc]);
            playMusic();
            break;
        case 'add':
            addSelect.value = true;
    }
};

const getRowStatus = (row: DataTableRow) => {
    if(row.isPlaying) {
        return {
          class: ["playClass"]
        };
    }
};

const toVideo = (e: Event, id: string) => {
    e.stopPropagation();
    router.push({
        path: '/mv',
        query: {
            id,
        }
    })
};
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
.mv-icon {
    border: var(--va-primary) 1px solid;
    color: var(--va-primary);
    padding: 0px 4px;
    display: inline-block;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 5px;
}
.column {
    text-overflow: ellipsis;
    width: 250px;
    overflow: hidden;
}
</style>