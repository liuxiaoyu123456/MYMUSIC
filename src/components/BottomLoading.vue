<template>
    <div id="bottom">
        <VaInnerLoading loading v-show="!props.disabled"/>
        <div v-show="props.disabled" class="finish">已加载完毕</div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    ( e: 'infinite-scroll' ): void,
}>();

const props = defineProps<{
    disabled: boolean,
}>();

const bottom = ref();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            emit('infinite-scroll');
        }
    });
});

onMounted(()=>{
    bottom.value = document.getElementById('bottom');
    observer.observe(bottom.value!);
})
</script>
<style scoped>
.finish {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.55);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: end;
}
</style>