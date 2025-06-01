<template>
    <VaDataTable
      v-model="selectItems"
      :selectable="props.select"
      select-mode="multiple"
      :items="props.items"
      :columns="props.columns"
      style="font-size: 14px;"
      hoverable
      @row:click="selectPlay"
    >
        <template #cell(sing)="value">
            <div class="cell">
                <img class="pic" :src="value.rowData.picSrc">
                <div>
                    <div>{{ value.rowData.sing }}</div>
                    <div class="singer">{{ value.rowData.artist }}</div>
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const { selectItem, deleteItem } = usePlayList();

const { createAudio, playMusic, stopMusic } = useAudio();

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
    { text: '删除', value: 'delete', icon: 'delete_outline' },
];

const selectPlay = (event: RowClickEvent) => {
    stopMusic();
    selectItem(event.itemIndex);
    const { playSrc } = usePlayList();
    createAudio(playSrc);
    playMusic();
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
        deleteItem(actionIndex.value);
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
.pic {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
}
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>