<template>
  <div>
    <router-view/>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { userRefresh, getUserDetail } from '@/api/user';
import { useUserInfo } from '@/store/user';

const { setLogin, userInfo, setUserInfo, changeRoute, getQQ } = useUserInfo();

onMounted(async()=>{
  const { data } = await userRefresh();
  if(data.result === 200) {
    setLogin();
    changeRoute();
    if(JSON.stringify(userInfo)=='{}'){
        const qq = getQQ();
        const { data } = await getUserDetail(qq);
        setUserInfo(data.data);
    }
  }
})
</script>
<style scoped>
#app {
  height: 100vh;
  width: 100vw;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
