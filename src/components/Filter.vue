<template>
    <div class="filter">
      <VaForm class="form">
        <VaSelect
          v-model="filterForm.singer"
          label="艺术家"
        />
        <VaSelect
          v-model="filterForm.column"
          label="专辑"
        />
        <VaSelect
          v-model="filterForm.directory"
          label="文件夹"
        />
      </VaForm>
      <VaButton class="confirm">确定</VaButton>
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
    background-color: var(--va-background-element);
    border-radius: 4px;
    border: 1px solid var(--va-primary);
    box-shadow: 0 0 2px 1px rgba(44, 130, 224, 0.35);
    padding: 16px;
    position: relative;
    height: 100px;
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
    gap: 15px;
}
:deep(.va-input-wrapper) {
    max-width: calc((100% - 30px)/3);
}
</style>