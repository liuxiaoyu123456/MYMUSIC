<template>
    <div class="empty">
        <div class="box">
            <img class="empty-img" :src=props.emptyImg>
            <div class="tip">暂时没有音乐</div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    emptyImg: string,
}>();
</script>
<style scoped>
.empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.empty-img {
    width: 200px;
}
.tip {
    margin-top: 20px;
}
.box {
    width: 200px;
    text-align: center;
}
</style>