<template>
    <VaModal
      :model-value="props.modelValue"
      ok-text="确定"
      cancel-text="取消"
      title="请选择倍速"
      size="small"
      @cancel="emit('close')"
      @ok="ok"
    >
        <VaSlider
          v-model="rate"
          track-label-visible
          pins
          min="0.5"
          max="2"
          :step="0.25"
        />
    </VaModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAudio } from '@/store/audio';

const { rateMusic } = useAudio();

const props = defineProps<{modelValue: boolean}>();

const emit = defineEmits<{
    (e: 'close'): void,
}>();

const rate = ref(1);

const ok = () => {
    rateMusic(rate.value);
    emit('close');
}
</script>