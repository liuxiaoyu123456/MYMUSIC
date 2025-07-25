<template>
    <VaSidebar style="overflow: hidden;">
      <div class="logo">
        <img src="@/assets/logo.png">
      </div>
      <div class="sider">
        <div class="sider-title">在线音乐</div>
        <VaSidebarItem
          v-for="item in online"
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
        <VaCollapse>
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
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useUserInfo } from '@/store/user';
import SideBar from '@/types/sidebar.ts';
import { storeToRefs } from 'pinia';

const page = ref('home');

const store = useUserInfo();

const { myRoute } = storeToRefs(store);

const online = [
    {
        icon: 'home', title: '推荐', route: '/recommend'
    },
    {
        icon: 'music_video', title: '乐馆', route: '/musicShop'
    },
    {
        icon: 'videocam', title: '视频', route: '/videoDetail'
    },
    {
        icon: 'radar', title: '雷达', route: '/'
    }
]

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
</style>