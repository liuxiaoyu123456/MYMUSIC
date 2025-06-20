<template>
    <div class="sing-img">
        <img :src="props.cover">
        <div class="hover">
            <VaIcon name="fullscreen" color="#fff" size="50px" class="icon" @click="emit('fullSreen')"/>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    cover: string,
}>();

const emit = defineEmits<{
    ( e: 'fullSreen' ): void,
}>();
</script>
<style scoped>
.sing-img {
    width: 64px;
    height: 64px;
    margin-right: 10px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
}
img {
    width: 100%;
    height: 100%;
}
.hover {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
}
.hover:hover {
    opacity: 1;
}
.icon {
    cursor: pointer;
}
</style>