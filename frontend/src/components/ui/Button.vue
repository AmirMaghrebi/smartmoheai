<template>
  <button
    :class="[
      'relative inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold',
      'transition-all duration-300 ease-out',
      variant === 'primary' 
        ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-95 active:shadow-md' 
        : 'text-text-primary bg-bg-tertiary border border-border-light hover:bg-bg-secondary hover:shadow-md hover:-translate-y-0.5 active:scale-95',
      disabled && 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none',
      className
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <Icon v-if="icon && !loading" :icon="getIconByName(icon)" class="w-5 h-5 mr-2" />
    <span v-if="loading" class="flex items-center">
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <slot>Loading...</slot>
    </span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@lucide/vue';
import { getIconByName } from '../../lib/icons';

interface Props {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  icon: '',
  className: ''
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
