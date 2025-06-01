<!-- 播放列表 -->
<template>
    <div class="player-list">
        <VaSidebar :model-value="modelValue" animated="right" width="400px" style="overflow: hidden;">
            <div class="header">
                <span>播放列表</span>
                <div>
                    <VaButton size="large" preset="plain" icon="checklist"></VaButton>
                    <VaButton class="btn" size="large" preset="plain" icon="delete_outline"></VaButton>
                </div>
            </div>
            <div class="content">
                <VaSidebarItem>
                    <VaSidebarItemContent>
                        <div class="item">
                            <div class="sing">
                                <img src="@/assets/cover.png" class="cover">
                                <span class="sing-name">千本樱</span>
                            </div>
                            <div class="btn-list">
                                <VaButton icon="favorite_outline" preset="secondary"/>
                                <MenuList>
                                    <VaButton icon="more_horiz" preset="secondary"/>
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
import { ref } from 'vue';
import MenuList from '@/components/MenuList.vue';

const props = defineProps<{modelValue: boolean}>();
</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 24px 16px;
    font-size: 20px;
}
.content {
    padding: 0 10px;
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
    margin-left: 5px;
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
</style>