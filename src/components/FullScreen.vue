<template>
  <VaModal
    fullscreen
    hideDefaultActions
    no-padding
    :background-color="color"
  >
    <div class="content">
        
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
  background-color: rgba(46, 44, 44, 0.18);
  backdrop-filter: blur(10px);
  height: 100vh;
}
:deep(.va-modal__close) {
  color: #fff;
}
</style>