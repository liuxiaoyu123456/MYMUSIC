<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ items: string[] }>()

const value = ref(0);
</script>
<template>
    <VaTabs v-model="value">
        <template #tabs>
            <VaTab
                v-for="tab in items"
                :key="tab"
            >
                {{ tab }}
            </VaTab>
        </template>
    </VaTabs>
</template>