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
         
      </div>
    </div>
  </VaModal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { getColors } from '@/utils';

const color = ref('#121212');

const props = defineProps<{
  coverPic: string,
}>();

watch(
  ()=>props.coverPic, async(val) => {
    const data = await getColors(val);
    color.value = data;
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
  height: 80vh;
  width: 80vw;
  background-color: black;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>