<template>
  <div style="position: relative;">
    <VaSidebar
      v-model="showSide"
      style="overflow: hidden; background-color: rgba(44, 130, 224, 0.1);"
    >
      <div class="logo">
        <img src="@/assets/logo.png">
      </div>
      <div class="sider">
        <div class="sider-title">在线音乐</div>
        <VaSidebarItem
          v-for="item in netWorkRoute"
          :active="page === item.title"
          @click="clickMenu(item)"
        >
          <VaSidebarItemContent>
            <VaIcon :name="item.icon" />
            <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <div class="sider-title">我的音乐</div>
        <VaSidebarItem
          v-for="item in myRoute"
          :active="page === item.title"
          @click="clickMenu(item)"
        >
          <VaSidebarItemContent>
            <VaIcon :name="item.icon" />
            <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaCollapse v-if="isLogin">
            <template #header="{ value: isCollapsed }">
              <VaSidebarItem>
                <VaSidebarItemContent>
                  <VaIcon name="library_music" />
                  <VaSidebarItemTitle>歌单</VaSidebarItemTitle>
                  <VaSpacer />
                  <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>
            <template #body>
              <VaSidebarItem>
                <VaSidebarItemContent>
                  <VaSidebarItemTitle>我的歌单</VaSidebarItemTitle>
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>
        </VaCollapse>
      </div>
    </VaSidebar>
    <VaButton
      @click="showSide = !showSide;"
      :icon="showSide? 'arrow_left' : 'arrow_right'"
      preset="primary"
      class="collapse"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useUserInfo } from '@/store/user';
import SideBar from '@/types/sidebar.ts';
import { storeToRefs } from 'pinia';

const page = ref('home');

const showSide = ref(true);

const store = useUserInfo();

const { myRoute, netWorkRoute, isLogin } = storeToRefs(store);

const clickMenu = (item: SideBar) => {
    router.push(item.route);
    page.value = item.title;
};
</script>
<style scoped>
.sider-title {
    height: 58px;
    padding-left: 20px;
    line-height: 58px;
}
.logo {
  height: 80px;
  display: flex;
  align-items: end;
  justify-content: center;
  flex-shrink: 0;
  -webkit-app-region: drag;
}
img {
  height: 60px;
}
.collapse {
  height: 100px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(calc(100% + 1px), -50%);
  z-index: 99;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
:deep(.va-button--normal) {
  min-width: 0 !important;
}
</style>