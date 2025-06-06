<template>
    <div>
        <VaCard class="music-card">
            <div class="hover">
                <VaButton
                    color="info"
                    gradient
                    icon="play_arrow"
                    round
                    class="music-btn"
                />
            </div>
            <img
                class="poster"
                :src="props.picSrc"
            />
        </VaCard>
        <div class="album-title">
            {{ props.title }}
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    picSrc: string,
    title: string
}>();
</script>
<style scoped>
.music-card {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
}
.hover {
    opacity: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
}
.hover:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
}
.poster {
    height: 100%;
    width: 100%;
}
.music-btn {
    position: absolute;
    left: 10%;
    bottom: 10%;
}
.album-title {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.75);
}
</style>