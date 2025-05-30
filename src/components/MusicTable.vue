<template>
    <VaDataTable
      :selectable="props.select"
      :select-mode="'multiple'"
      @selection-change="selectedItemsEmitted = $event.currentSelectedItems"
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
            <MenuList placement="right" :items="options">
                <VaButton @click="add" icon="add_circle_outline" preset="secondary"/>
            </MenuList>
            <VaButton icon="more_horiz" preset="secondary"/>
        </template>
    </VaDataTable>
    <VaPagination
        v-model="value"
        :pages="10"
        :visible-pages="3"
        buttons-preset="secondary"
        gapped
        border-color="primary"
        class="pagination"
    />
</template>
<script setup lang="ts">
import MenuList from '@/components/MenuList.vue';
import { usePlayList } from '@/store/play-list';
import { useAudio } from '@/store/audio';
import { ref } from 'vue';

const { selectIndex } = usePlayList();

const { changePause } = useAudio();

const value = ref(2);

const props = defineProps<{ 
    items: any[],
    columns: any[],
    select: boolean,
}>();

const options = [
    { text: '我喜欢', value: 'like', icon: 'favorite_border' },
    { text: '播放列表', value: 'play_list', icon: 'playlist_play' }
];

const selectedItemsEmitted = ref([]);

const selectPlay = (event: RowClickEvent) => {
    selectIndex(event.itemIndex);
    changePause(false);
};

const add = (event: Event) => {
    event.stopPropagation();
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