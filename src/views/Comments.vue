<template>
      <VaInfiniteScroll :load="infiniteComment" :disabled="disabled">
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
        <div class="comment-title">全部评论</div> 
        <CommentItem v-for="item in commentList" :data="item"/>
      </VaInfiniteScroll>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import CommentItem from '@/components/CommentItem.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getComment } from '@/api/comment';

const route = useRoute();

const total = ref(0);

const commentItems = ['评论', '详情'];

const comment = ref('');

const commentList = ref([]);

const pageNo = ref(1);

const disabled = ref(false);

const getCommentList = async() => {
    const id = route.query.id as unknown as number;
    const { data } = await getComment(id, pageNo.value);
    return data;
};

const infiniteComment = async() => {
    pageNo.value = pageNo.value + 1;
    const data = await getCommentList();
    if(data.comment.commentlist === null) {
        disabled.value = true;
        return
    }
    commentList.value = commentList.value.concat(data.comment.commentlist);
    checkDisabled();
};

const checkDisabled = () => {
    if(commentList.value.length === total.value) {
        disabled.value = true;
    }
}

onMounted(async()=>{
    const data = await getCommentList();
    commentList.value = data.comment.commentlist;
    total.value = data.comment.commenttotal;
    checkDisabled();
})
</script>
<style scoped>
.text-area {
    width: 100%;
    margin-top: 20px;
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