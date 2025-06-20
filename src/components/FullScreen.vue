<template>
  <VaModal
    fullscreen
    hideDefaultActions
    background-color="#121212"
    no-padding
  >
    <!-- <template #header>
      <div class="header">

      </div>
    </template> -->
    <div class="content">
        
    </div>
  </VaModal>
</template>
<style scoped>
.content {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  height: 100vh;
}
:deep(.va-modal__close) {
  color: #fff;
}
</style>