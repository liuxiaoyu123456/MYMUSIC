<template>
    <div class="home">
       <div class="main">
            <SiderBar/>
            <div class="conten-box">
                <div class="header">
                    <Search/>
                    <div class="action">
                        <VaButton v-if="userInfo.nick" round gradient>
                            <template #prepend>
                                <VaAvatar :src="userInfo.headpic" size="25px" />
                            </template>
                            {{ userInfo.nick }}
                        </VaButton>
                        <VaButton v-else preset="secondary">点击登录</VaButton>
                        <MenuList placement="bottom" :items="options" @change-select="select">
                            <VaButton size="large" preset="plain" icon="settings"/>
                        </MenuList>
                        <VaButton preset="plain" size="large" @click="onMin">
                            <template #append>
                                <font-awesome-icon icon="fa-regular fa-window-minimize" />
                            </template>
                        </VaButton>
                        <VaButton preset="plain" size="large" @click="onResize">
                            <template #append>
                                <font-awesome-icon :icon="max? 'fa-regular fa-window-restore':'fa-regular fa-window-maximize'" />
                            </template>
                        </VaButton>
                        <VaButton @click="onClose" size="large" preset="plain" icon="close" />
                    </div>
                </div>
                <div class="content">
                    <RouterView/>
                </div>
            </div>
       </div>
       <Player @open-list="playerShow = !playerShow;"/>
       <PlayerList v-model="playerShow"/>
    </div>  
</template>
<script setup lang="ts">
import SiderBar from '@/components/SiderBar.vue';
import Search from '@/components/Search.vue';
import Player from '@/components/Player.vue';
import PlayerList from '@/components/PlayerList.vue';
import MenuList from '@/components/MenuList.vue';
import { useModal } from 'vuestic-ui';
import { ref } from 'vue';
import { useUserInfo } from '@/store/user';
import { storeToRefs } from 'pinia';
import router from '@/router';

const playerShow = ref(false);

const max = ref(false);

const { userInfo } = storeToRefs(useUserInfo());

const options = [
    { text: '设置', icon: 'settings', value: 'settings' },
    { text: '帮助', icon: 'help', value: 'help' },
    { text: '更新', icon: 'upgrade', value: 'upgrade' },
    { text: '登录', icon: 'login', value: 'login' },
    { text: '退出登录', icon: 'logout', value: 'logout' },
];

const { confirm, init } = useModal();

const select = (item: any) => {
    switch(item.value) {
        case 'help':
            init({
                message: '有任何问题联系邮箱：2717617783@qq.com',
                title: '帮助',
                okText: '确定',
                cancelText: '取消',
                size: 'small'
            });
        break;
        case 'logout':
            confirm({
                message: '确定退出登录吗?',
                title: '确定',
                okText: '确定',
                cancelText: '取消'
            })
            .then((ok)=>{
                
            })
        break;
        case 'settings':
            router.push('/settings');
    }
}

let ipcRenderer = require('electron').ipcRenderer;

const onResize = () => {
    ipcRenderer.send('window-max');
    max.value = !max.value;
}

const onClose = () => {
    ipcRenderer.send('window-close');
}

const onMin = () => {
    ipcRenderer.send('window-min');
}
</script>
<style scoped>
.action {
    display: flex;
    align-items: center;
    width: 240px;
    justify-content: space-between;
}
.home {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
    position: relative;
    font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
}
.conten-box {
    flex: 1;
    height: 100%;
    max-width: calc(100vw - 256px);
}
.header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    -webkit-app-region: drag;
}
.main {
    flex: 1;
    display: flex;
    height: calc(100% - 80px);
}
.content {
    padding: 16px 24px 10px;
    height: calc(100% - 68px);
    overflow: auto;
    display: flex;
    flex-direction: column;
}
.content > * {
  flex-shrink: 0;
}
button {
    -webkit-app-region: no-drag;
}
</style>
