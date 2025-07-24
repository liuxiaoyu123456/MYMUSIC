<template>
  <div class="video" ref="artRef"></div>
</template>
<script setup lang="ts">
import Artplayer from "artplayer";
import { onMounted, ref } from "vue";

const props = defineProps<{
    url: string,
    poster: string,
}>();

const artRef = ref();

const instance = ref<Artplayer | null>(null);

onMounted(()=>{
    instance.value = new Artplayer({
        container: artRef.value,
        url: props.url,
        theme: 'var(--va-primary)',
        fullscreen: true,
        poster: props.poster,
    })
})
</script>
<style scoped>
.video {
    height: 360px;
}
</style>