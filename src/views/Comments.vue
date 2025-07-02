<template>
    <div class="comment">
        <Tabs :items="commentItems" />
        <VaTextarea
          v-model="comment"
          class="text-area"
          preset="solid" 
          max-length="300"
          counter
          max-rows="4"
          min-rows="4"
          :autosize="true"
          placeholder="期待你的评论"
        />
        <div class="btn">
            <VaButton preset="secondary" icon="tag_faces"/>
            <VaButton preset="secondary">发布</VaButton>
        </div>
        <!-- <div class="comment-title">近期热评</div> -->
        <div class="comment-title">精彩评论</div> 
        <CommentItem v-for="item in commentList" :data="item"/>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import CommentItem from '@/components/CommentItem.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getComment } from '@/api/comment';

const route = useRoute();

const commentItems = ['评论', '详情'];

const comment = ref('');

const commentList = ref([]);

const getCommentList = async() => {
    const id = route.query.id as unknown as number;
    const { data } = await getComment(id);
    commentList.value = data.comment.commentlist;
}

onMounted(()=>{
    getCommentList();
})
</script>
<style scoped>
.comment {
}
.text-area {
    width: 100%;
    margin-top: 20px;
    position: relative;
}
.btn {
    display: flex;
    justify-content: end;
}
.comment-title {
    /* font-size: 18px; */
    height: 30px;
    line-height: 30px;
}
</style>