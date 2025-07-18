<template>
    <div class="empty">
        <div class="box">
            <img class="empty-img" :src=props.emptyImg>
            <div class="tip">{{ props.tip }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    emptyImg: string,
    tip: string,
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