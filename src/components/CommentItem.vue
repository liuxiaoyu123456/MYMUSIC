<template>
    <div class="comment-item">
        <div class="left">
            <img class="header-pic" :src="props.data.avatarurl">
        </div>
        <div class="right">
            <div class="normal">{{ props.data.nick }}</div>
            <div>
                <span class="date">{{ formatteTime(props.data.time) }}</span>
            </div>
            <div class="comment-content">
                {{ conmmentText }}
            </div>
            <div class="comment-action">
                <VaButton text-color="rgba(0,0,0,0.55)" preset="secondary">
                    <template #prepend>
                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                    </template>
                    <template #default>
                        <span class="count" v-if="props.data.praisenum > 0">
                            {{ props.data.praisenum }}
                        </span>
                    </template>
                </VaButton>
                <VaButton preset="secondary" @click="changeReply">{{ replyButton }}</VaButton>
            </div>
            <VaTextarea
              v-if="reply"
              class="item-area"
              preset="solid"
              placeholder="期待你的神评论"
              max-length="300"
              max-rows="4"
              min-rows="4"
              :autosize="true"
              counter
            ></VaTextarea>
        </div>
    </div>
    <VaDivider />
</template>
<script setup lang="ts">
import { formatteTime } from '@/utils';
import { computed, ref } from 'vue';
const props = defineProps<{
    data: any,
}>();

const reply = ref(false);

const replyButton = ref('回复');

const changeReply = () => {
    replyButton.value = reply.value? '回复':'取消';
    reply.value = !reply.value;
};

const conmmentText = computed(
    ()=>props.data.rootcommentcontent.replaceAll('\\n', '\n')
);
</script>
<style scoped>
.comment-item {
    display: flex;
    padding: 10px;
}
.left {
    width: 70px;
}
.right {
    flex: 1;
}
.header-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.date {
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.55);
}
.normal {
    color: rgba(0, 0, 0, 0.55);
}
.comment-content {
    margin-top: 15px;
    white-space: pre-wrap;
}
.comment-action {
    margin-top: 12px;
}
.count {
    margin-left: 4px;
}
.item-area {
    width: 100%;
}
</style>