<template>
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
          src="https://picsum.photos/200"
        />
    </VaCard>
</template>
<script setup lang="ts"></script>
<style scoped>
.music-card {
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
}
.hover {
    opacity: 0;
    height: 180px;
    width: 180px;
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
    left: 15px;
    bottom: 15px;
}
</style>