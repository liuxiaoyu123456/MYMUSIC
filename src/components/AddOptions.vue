<template>
    <VaModal title="添加到" size="small" cancel-text="取消" ok-text="确定">
        <VaMenuList>
            <VaMenuItem v-for="item in addItems" :key="item.value">
                <div class="content">
                    <VaIcon class="icon" v-if="item.icon" :name="item.icon" />
                    {{ item.text }}
                </div>
            </VaMenuItem>
        </VaMenuList>
    </VaModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const addItems = ref([
    { text: '添加到新歌单', icon: 'add_circle_outline', value: 'add' }
])
</script>
<style scoped>
.content {
    height: 40px;
    padding: 4px;
    display: flex;
    align-items: center;
}
:deep(.va-menu-list) {
    width: auto;
}
.icon {
    margin-right: 4px;
}
</style>