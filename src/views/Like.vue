<template>
    <div class="like">
        <div v-if="!batchMode" class="title">喜欢</div>
        <Tabs v-if="!batchMode" :items="likeItems" class="tab"/>
        <!-- <div class="empty">
          <div class="box">
            <VaIcon name="audio_file" class="primary" size="120px"/>
            <div>暂时没有歌曲</div>
          </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import ButtonList from '@/components/ButtonList.vue';
import MusicTable from '@/components/MusicTable.vue';
import { ref } from 'vue';

const likeItems = ['歌曲', '歌单', '专辑', '有声节目', '视频'];
const keyWord = ref('');
const batchMode = ref(false);

const changeBatch = (val: boolean) => {
    batchMode.value = val;
}
const items = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
        website: "demarco.info",
      },
];
</script>
<style scoped>
/* .like {
    height: calc(100vh - 154px);
} */
.title {
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 10px;
}
.primary {
  color: var(--va-primary);
  margin-bottom: 10px;
}
.empty {
  height: calc(100% - 67px);
  position: relative;
  text-align: center;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>