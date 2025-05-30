<template>
    <div class="comment">
        <Tabs :items="commentItems" />
        <VaTextarea v-model="comment" class="text-area" preset="solid" max-length="300" counter/>
        <VaButton preset="secondary" icon="tag_faces"/>
        <VaButton preset="secondary" icon="publish">发表</VaButton>
        <CommentItem/>
    </div>
</template>
<script setup lang="ts">
import Tabs from '@/components/Tabs.vue';
import CommentItem from '@/components/CommentItem.vue';
import { ref } from 'vue';

const commentItems = ['评论', '详情'];
const comment = ref('');
</script>
<style scoped>
.comment {
}
.text-area {
    width: 100%;
    margin-top: 20px;
}
</style>