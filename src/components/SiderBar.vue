<template>
    <VaSidebar>
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
        v-for="item in my"
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
    </VaSidebar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import SideBar from '@/types/sidebar.ts';

const page = ref('home');

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

const my = [
    {
        icon: 'favorite_border', title: '喜欢', route: '/like',
    },
    {
        icon: 'access_time', title: '最近播放', route: '/'
    },
    {
        icon: 'download', title: '本地和下载', route: 'local'
    }
]

const clickMenu = (item: SideBar) => {
    router.push(item.route);
    page.value = item.title;
}
</script>
<style scoped>
.sider-title {
    height: 58px;
    padding-left: 20px;
    line-height: 58px;
}
.sider-title:first-child {
  -webkit-app-region: drag;
}
</style>