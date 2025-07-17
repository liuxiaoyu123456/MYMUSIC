<template>
    <div class="title">设置</div>
    <VaForm>
        <div class="sub-title">下载与缓存</div>
        <VaInput
          v-model="settingForm.downloadUrl"
          label="下载路径"
        />
    </VaForm>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { VaInput } from 'vuestic-ui';

const settingForm = ref({
    downloadUrl: '',
});
</script>
<style scoped>
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.sub-title {
    margin-bottom: 10px;
}
</style>