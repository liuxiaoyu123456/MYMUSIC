<!-- 播放列表 -->
<template>
    <div class="player-list">
        <VaSidebar :model-value="modelValue" animated="right" width="450px" style="overflow: hidden;">
            <div class="header">
                <span>播放列表</span>
                <div>
                    <VaButton
                      @click="changeBatch"
                      preset="secondary"
                      icon="checklist"
                    />
                    <VaButton
                      @click="Delete"
                      class="btn"
                      preset="secondary"
                      icon="delete_outline"
                    />
                </div>
            </div>
            <div class="total">
                <VaCheckbox
                  v-model="selectAll"
                  v-if="batch"
                  class="checkbox"
                  @update:modelValue="selectAllItems"
                />
                <span>共计{{ playList.length }}首歌曲</span>
            </div>
            <div class="content">
                <VaSidebarItem
                  v-for="(item, index) in playList" 
                  @click="selectPlay(item, index)" 
                  :class="{ active: item.isPlaying }"
                >
                    <VaSidebarItemContent>
                        <div class="item">
                            <div class="sing">
                                <VaCheckbox
                                  v-if="batch"
                                  @click="selectCheck"
                                  v-model="selection"
                                  :array-value="item.id"
                                  class="checkbox"
                                />
                                <MusicPic :picSrc="item.picSrc" :load="item.isPlaying"/>
                                <span class="sing-name">{{ item.sing }}</span>
                            </div>
                            <div class="btn-list">
                                <VaButton icon="favorite_outline" preset="secondary"/>
                                 <MenuList placement = "right" :items="moreOptions" @change-select="moreAction">
                                    <VaButton @click="more($event, index)" icon="more_horiz" preset="secondary"/>
                                </MenuList>
                            </div>
                        </div>
                    </VaSidebarItemContent>
                </VaSidebarItem>
            </div>
        </VaSidebar>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import MenuList from '@/components/MenuList.vue';
import MusicPic from '@/components/MusicPic.vue';
import { usePlayList } from '@/store/play';
import { storeToRefs } from 'pinia';
import { useModal } from 'vuestic-ui';
import { useAudio } from '@/store/audio';

const ipcRenderer = require('electron').ipcRenderer;

const { init } = useModal();

const store = usePlayList();

const { deleteItem, selectItem, batchDelete } = store;

const { playMusic, stopMusic, createAudio } = useAudio();

const { playList } = storeToRefs(store);

const props = defineProps<{
    modelValue: boolean,
}>();

const actionIndex = ref(0);

const selection = ref([]);

const batch = ref(false);

const selectAll = ref(false);

const moreOptions = [
    { text: '播放', value: 'play', icon: 'play_circle_outline' },
    { text: '删除', value: 'delete', icon: 'delete_outline' },
    { text: '浏览本地文件', value: 'watch', icon: 'folder_open' },
    { text: '查看评论', value: 'comment', icon: 'comment' },
];

const more = (event: Event, index: number) => {
    event.stopPropagation();
    actionIndex.value = index;
};

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
        createAudio([playSrc]);
        playMusic();
    }
};

const selectPlay = (item, index: number) => {
    if(!item.isPlaying) {
        stopMusic();
        selectItem(index);
        const { playSrc } = usePlayList();
        createAudio([playSrc]);
        playMusic();
    }
};

const selectCheck = (event: Event) => {
    event.stopPropagation();
};

const changeBatch = () => {
    if(batch.value) {
        selection.value = [];
        selectAll.value = false;
    }
    batch.value = !batch.value;
};

const selectAllItems = (val: boolean) => {
    if(val) {
        selection.value = playList.value.map(item=>item.id);
    }else {
        selection.value = [];
    }
};

const Delete = () => {
    batchDelete(selection.value);
};

watch(
    ()=>selection.value, (val) => {
        if(val.length === playList.value.length) {
            selectAll.value = true;
        }
    }
)
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 16px;
    font-size: 20px;
}
.content {
    padding: 0 10px;
    overflow: auto;
}
.player-list {
    position: absolute;
    bottom: 80px;
    right: 5px;
    height: calc(100% - 150px);
    border-radius: 8px;
    overflow: hidden;
}
.btn {
    margin-left: 5px;
}
.va-sidebar__item__content {
    padding: 8px;
}
.cover {
    height: 50px;
    border-radius: 4px;
}
.sing-name {
    margin-left: 10px;
}
.sing {
    display: flex;
    align-items: center;
}
.item {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.btn-list {
    display: flex;
    align-items: center;
}
:deep(.active) {
    color: var(--va-primary) !important;
    background-color: rgba(44, 130, 224, 0.1);
}
.checkbox {
    margin-right: 10px;
}
.total {
    color: rgba(0,0,0,0.55);
    margin: 0 16px;
    display: flex;
    align-items: center;
    padding: 2px 6px;
}
</style>