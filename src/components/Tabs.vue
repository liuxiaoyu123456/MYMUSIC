<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ items: string[] }>()

</script>
<template>
    <VaTabs>
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