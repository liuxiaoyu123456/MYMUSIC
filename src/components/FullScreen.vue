<template>
  <VaModal
    fullscreen
    hideDefaultActions
    no-padding
  >
    <div class="content">
        
    </div>
  </VaModal>
</template>
<script setup lang="ts">
const props = defineProps<{
  coverPic: string,
}>();
</script>
<style scoped>
.content {
  /* background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px); */
  height: 100vh;
}
:deep(.va-modal__close) {
  color: #fff;
}
</style>