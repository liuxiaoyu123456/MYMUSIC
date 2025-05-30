<template>
    <div class="search">
        <VaButton
          round
          preset="plain"
          size="large"
          icon="keyboard_arrow_left"
        />
        <VaButton
          round
          preset="plain"
          size="large"
          icon="keyboard_arrow_right"
        />
        <VaInput
          v-model="keyWord"
          placeholder="搜索音乐"
          preset="solid"
          clearable
        >
            <template #prependInner>
                <VaIcon
                    name="search"
                    color="secondary"
                />
            </template>
        </VaInput>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useModal } from 'vuestic-ui';

const { confirm } = useModal();
const keyWord = ref('');
</script>
<style scoped>
.search {
    width: 360px;
    justify-content: space-between;
    display: flex;
    align-items: center;
}
button {
  -webkit-app-region: no-drag;
}
.va-input {
  -webkit-app-region: no-drag;
}
</style>