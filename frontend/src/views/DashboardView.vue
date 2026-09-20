<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Dashboard -->
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ $t('dashboard.welcome') }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              {{ $t('dashboard.subtitle') }}
            </p>
          </div>
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <button @click="toggleTheme" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <span v-if="isDark">☀️</span>
              <span v-else>🌙</span>
            </button>
            <select 
              v-model="currentLocale" 
              @change="changeLanguage"
              class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-0"
            >
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
            <button @click="logout" class="btn-secondary">
              {{ $t('common.logout') }}
            </button>
          </div>
        </div>
      </header>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('dashboard.devices') }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">24</p>
              <p class="text-sm text-green-600 mt-1">{{ $t('dashboard.online') }}</p>
            </div>
            <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <span class="text-2xl">💡</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('dashboard.security') }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ $t('dashboard.armed') }}</p>
              <p class="text-sm text-green-600 mt-1">{{ $t('dashboard.allSecure') }}</p>
            </div>
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <span class="text-2xl">🛡️</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('dashboard.temperature') }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">22°C</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ $t('dashboard.humidity') }}: 45%</p>
            </div>
            <div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <span class="text-2xl">🌡️</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('dashboard.energy') }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">1.2 kW</p>
              <p class="text-sm text-green-600 mt-1">{{ $t('dashboard.normal') }}</p>
            </div>
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span class="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('dashboard.quickActions') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button class="action-card">
            <span class="text-3xl mb-2">💡</span>
            <p class="text-sm font-medium">{{ $t('actions.lights') }}</p>
          </button>
          <button class="action-card">
            <span class="text-3xl mb-2">🔒</span>
            <p class="text-sm font-medium">{{ $t('actions.locks') }}</p>
          </button>
          <button class="action-card">
            <span class="text-3xl mb-2">🌡️</span>
            <p class="text-sm font-medium">{{ $t('actions.climate') }}</p>
          </button>
          <button class="action-card">
            <span class="text-3xl mb-2">🎬</span>
            <p class="text-sm font-medium">{{ $t('actions.scenes') }}</p>
          </button>
          <button class="action-card">
            <span class="text-3xl mb-2">🤖</span>
            <p class="text-sm font-medium">{{ $t('actions.automations') }}</p>
          </button>
          <button class="action-card">
            <span class="text-3xl mb-2">📹</span>
            <p class="text-sm font-medium">{{ $t('actions.cameras') }}</p>
          </button>
        </div>
      </div>

      <!-- Favorite Devices -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('dashboard.favoriteDevices') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="text-2xl">💡</span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('devices.livingRoomLight') }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('devices.light') }}</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <input type="range" min="0" max="100" value="80" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="text-2xl">🔒</span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('devices.frontDoor') }}</p>
                  <p class="text-sm text-green-600">{{ $t('status.locked') }}</p>
                </div>
              </div>
              <button class="btn-secondary text-sm">
                {{ $t('actions.unlock') }}
              </button>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <span class="text-2xl">🌡️</span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('devices.thermostat') }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('devices.target') }}: 22°C</p>
                </div>
              </div>
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <button class="btn-secondary w-8 h-8 p-0 rounded-full">−</button>
                <span class="font-medium">22°</span>
                <button class="btn-secondary w-8 h-8 p-0 rounded-full">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('dashboard.recentActivity') }}
        </h2>
        <div class="card">
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <span class="text-lg">🔒</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('activity.doorLocked') }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('activity.byUser', { user: 'Ali' }) }}</p>
                </div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">2 min ago</span>
            </div>
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <span class="text-lg">💡</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('activity.lightTurnedOn') }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('activity.inRoom', { room: 'Living Room' }) }}</p>
                </div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">15 min ago</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <span class="text-lg">🌡️</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ $t('activity.temperatureChanged') }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('activity.toTemp', { temp: '22°C' }) }}</p>
                </div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { locale } = useI18n();

const isDark = ref(false);
const currentLocale = ref(localStorage.getItem('locale') || 'en');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ru', name: 'Русский' },
];

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark';
  applyTheme(isDark.value);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  applyTheme(isDark.value);
};

const applyTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const changeLanguage = () => {
  locale.value = currentLocale.value;
  localStorage.setItem('locale', currentLocale.value);
  document.documentElement.setAttribute('dir', ['fa', 'ar'].includes(currentLocale.value) ? 'rtl' : 'ltr');
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md p-6;
}

.action-card {
  @apply flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer;
}
</style>
