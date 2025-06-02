<template>
    <div class="search">
        <VaButton
          round
          preset="plain"
          size="large"
          icon="keyboard_arrow_left"
          @click="router.back()"
        />
        <VaButton
          round
          preset="plain"
          size="large"
          icon="keyboard_arrow_right"
          @click="router.forward()"
        />
        <SearchInput placement="bottom-left"/>
    </div>
</template>
<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import router from '@/router';

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
</style>