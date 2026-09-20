<template>
  <div class="relative">
    <input
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :class="[
        'input-field',
        error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
        className
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <Icon 
      v-if="icon" 
      :icon="getIconByName(icon)" 
      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary"
    />
    <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@lucide/vue';
import { getIconByName } from '../../lib/icons';

interface Props {
  modelValue: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  error?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  icon: '',
  error: '',
  className: ''
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputType = defineModel<string>('type', { default: 'text' });
</script>
