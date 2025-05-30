<template>
    <VaMenu placement="right">
        <template #anchor>
            <slot></slot>
        </template>
        <VaMenuItem v-for="item in props.items" @selected="emit('change-select', item)">
            <div class="item">
                <VaIcon :name="item.icon"/>
                <span class="item-text">{{ item.text }}</span>
            </div>
        </VaMenuItem>
    </VaMenu>
</template>
<script setup lang="ts">
import { useToast } from 'vuestic-ui';
const props = defineProps<{ items: any[] }>();

const emit = defineEmits<{
    ( e: 'change-select', val: any ): void,
}>();

const vaToast = useToast();
</script>
<style scoped>
.item {
    height: 30px;
    align-items: center;
    display: flex;
}
.item-text {
    margin-left: 10px;
}
</style>