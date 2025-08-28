<template>
  <VaModal
    fullscreen
    hideDefaultActions
    no-padding
    :background-color="color"
  >
    <div class="content">
      <div class="sing-box">
        <!-- 封面 -->
        <PlayerCover
          :info="singInfo"
          :paused="paused"
        />
      </div>
    </div>
  </VaModal>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getColors } from '@/utils';
import { usePlayList } from '@/store/play';
import PlayerCover from '@/components/FullScreen/PlyerCover.vue';
import { storeToRefs } from 'pinia';
import { useAudio } from '@/store/audio';

const color = ref('#121212');

const { playCover, singName, singArtist, order, playList } = storeToRefs(usePlayList());

const singInfo = computed(()=>({
  cover: playCover.value,
  name: singName.value,
  artists: singArtist.value,
  album: playList.value[order.value].column,
}))

const { paused } = storeToRefs(useAudio());

const props = defineProps<{
  coverPic: string,
}>();

watch(
  ()=>props.coverPic, async(val) => {
    const data = await getColors(val);
    color.value = data;
  },
  {
    immediate: true,
  }
)
</script>
<style scoped>
.content {
  background-color: rgba(46, 44, 44, 0.285);
  backdrop-filter: blur(10px);
  height: 100vh;
  position: relative;
}
:deep(.va-modal__close) {
  color: #fff;
}
.sing-box {
  height: 70vh;
  width: 70vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
}
</style>