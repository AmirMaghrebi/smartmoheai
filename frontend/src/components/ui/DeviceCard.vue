<template>
  <div class="flex items-center justify-between p-4 premium-card">
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <div 
        :class="[
          'flex items-center justify-center w-12 h-12 rounded-2xl',
          getDeviceColor(type)
        ]"
      >
        <Icon :icon="getIconByName(type)" class="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 class="font-semibold text-text-primary">{{ name }}</h3>
        <p class="text-sm text-text-secondary">{{ status }}</p>
      </div>
    </div>
    
    <button
      :aria-checked="isOn"
      @click="$emit('toggle')"
      class="device-toggle"
    >
      <span class="device-toggle-knob"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@lucide/vue';
import { getIconByName, getDeviceColor } from '../../lib/icons';

interface Props {
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'sensor' | 'plug';
  isOn: boolean;
  status?: string;
}

withDefaults(defineProps<Props>(), {
  status: 'Online'
});

defineEmits<{
  toggle: [];
}>();
</script>
