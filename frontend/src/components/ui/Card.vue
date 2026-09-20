<template>
  <div
    :class="[
      'glass-card premium-card p-6',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
}

withDefaults(defineProps<Props>(), {
  className: ''
});
</script>
