<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {{ $t(`nav.${viewName.toLowerCase()}`) }}
      </h1>
      <div class="card">
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('common.comingSoon') }}
        </p>
        <router-link to="/" class="btn-primary mt-4 inline-block">
          {{ $t('common.backToDashboard') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const viewName = computed(() => route.name?.toString().replace('-detail', '') || 'Page');
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md p-6;
}
</style>
