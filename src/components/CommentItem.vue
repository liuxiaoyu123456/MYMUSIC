<template>
    <div class="comment-item">
        <div class="left">
            <img class="header-pic" :src="props.data.avatarurl">
        </div>
        <div class="right">
            <div class="normal">{{ props.data.nick }}</div>
            <div>
                <span class="date">{{ formatteTime(props.data.time) }}</span>
                <span class="normal">来自云南</span>
            </div>
            <div class="comment-content">
                {{ props.data.rootcommentcontent }}
            </div>
            <div class="comment-action">
                <VaButton preset="secondary">
                    <template #prepend>
                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                    </template>
                    <template #default>
                        <span class="count">2</span>
                    </template>
                </VaButton>
                <VaButton preset="secondary">回复</VaButton>
            </div>
        </div>
    </div>
    <VaDivider />
</template>
<script setup lang="ts">
import { formatteTime } from '@/utils';
const props = defineProps<{
    data: any,
}>();
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
}
.comment-action {
    margin-top: 12px;
}
.count {
    margin-left: 4px;
}
</style>