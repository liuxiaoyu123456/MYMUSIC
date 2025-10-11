<template>
    <div class="filter">
      <VaForm class="form">
        <VaSelect
          v-model="filterForm.singer"
          no-options-text="空白"
          label="艺术家"
        />
        <VaSelect
          v-model="filterForm.column"
          no-options-text="空白"
          label="筛选项"
        />
      </VaForm>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const filterForm = ref({
    singer: '',
    column: '',
    directory: ''
})
</script>
<style scoped>
.filter {
    padding: 16px 0;
}
.confirm {
    position: absolute;
    bottom: 16px;
    right: 16px;
}
:deep(.va-input-wrapper__container) {
    background-color: var(--va-background-primary);
}
.form {
    display: flex;
    gap: 20px;
    width: 100%;
}
:deep(.va-input-wrapper) {
    width: 50%;
}
</style>