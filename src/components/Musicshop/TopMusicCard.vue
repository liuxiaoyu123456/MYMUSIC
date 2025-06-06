<template>
    <div class="top-card">
        <div class="img">
            <img :src="props.cover">
            <div class="hover">
                <VaButton
                  icon="play_arrow"
                  gradient
                  round
                  size="large"
                />
            </div>
        </div>
        <div class="text-area">
            <div class="top-title">{{ props.title }}</div>
            <div class="song-title" v-for="(item, index) in songs">
                {{ index + 1 }}.{{ item }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string,
    songs: string[],
    cover: string,
}>();
</script>
<style scoped>
.top-card {
    height: 160px;
    background-color: var(--va-background-element);
    border-radius: 10px;
    display: flex;
    width: calc((100% - 10px)/2);
}
.img {
    border-radius: 10px;
    width: 160px;
    height: 160px;
    overflow: hidden;
    position: relative;
    min-width: 160px;
}
img {
    width: 100%;
    height: 100%;
}
.hover {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.hover:hover {
    opacity: 1;
}
.text-area {
    flex: 1;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    overflow: hidden;
}
.top-title {
    font-size: 20px;
    font-weight: bolder;
}
.song-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    color: rgba(0, 0, 0, 0.55);
}
</style>