<template>
    <div class="sub-title">
        <span class="text">{{ props.title }}</span>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string,
}>();
</script>
<style scoped>
.sub-title {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.text {
    font-size: 20px;
    font-weight: bolder;
}
</style>