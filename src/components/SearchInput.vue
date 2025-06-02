<template>
    <VaDropdown v-model="search">
          <template #anchor>
            <VaInput
              v-model="keyWord"
              placeholder="搜索音乐"
              preset="solid"
              clearable
              @keydown="showSearch"
            >
                <template #prependInner>
                    <VaIcon
                        name="search"
                        color="secondary"
                    />
                </template>
            </VaInput>
          </template>
          <VaDropdownContent>
            <div class="search">
                <div class="title">歌曲</div>
                <div class="search-item">
                    <img src="@/assets/cover.png">
                    <span>test</span>
                </div>
            </div>
          </VaDropdownContent>
    </VaDropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const keyWord = ref('');

const search = ref(false);

const showSearch = (event: KeyboardEvent) => {
  if(event.key === 'Enter') {
    search.value = true;
  }
}
</script>
<style scoped>
.va-input {
  -webkit-app-region: no-drag;
}
.search {
    width: 280px;
}
.search-item {
    display: flex;
    align-items: center;
}
.search-item > img {
    height: 40px;
    width: 40px;
    margin-right: 10px;
}
.title {
    height: 30px;
    display: flex;
    align-items: center;
}
</style>