<template>
    <VaMenu placement="right">
        <template #anchor>
            <slot></slot>
        </template>
        <VaMenuItem :disabled="item.disabled" v-for="item in props.items" @selected="emit('change-select', item)">
            <div class="item">
                <VaIcon v-if="item.icon" :name="item.icon"/>
                <font-awesome-icon v-else :icon="item.fa" />
                <span class="item-text">{{ item.text }}</span>
            </div>
        </VaMenuItem>
    </VaMenu>
</template>
<script setup lang="ts">
const props = defineProps<{ items: any[] }>();

const emit = defineEmits<{
    ( e: 'change-select', val: any ): void,
}>();
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