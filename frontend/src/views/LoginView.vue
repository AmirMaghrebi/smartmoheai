<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Login Form -->
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-600 dark:text-primary-400">m2smart</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">{{ $t('auth.signIn') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">
              {{ $t('auth.email') }}
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input"
              :placeholder="$t('auth.email')"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-2">
              {{ $t('auth.password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input"
              :placeholder="$t('auth.password')"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <router-link to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-700">
              {{ $t('auth.forgotPassword') }}
            </router-link>
          </div>

          <button type="submit" class="btn-primary w-full">
            {{ isLoading ? $t('common.loading') : $t('auth.signIn') }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {{ $t('auth.noAccount') }}
          <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-700">
            {{ $t('auth.signUp') }}
          </router-link>
        </p>

        <!-- Language Switcher -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex justify-center space-x-2 rtl:space-x-reverse">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
              :class="[
                'px-3 py-1 text-sm rounded',
                currentLocale === lang.code
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { locale } = useI18n();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ru', name: 'Русский' },
];

const currentLocale = computed(() => locale.value);

const changeLanguage = (langCode: string) => {
  locale.value = langCode;
  localStorage.setItem('locale', langCode);
  document.documentElement.setAttribute('dir', ['fa', 'ar'].includes(langCode) ? 'rtl' : 'ltr');
};

const handleLogin = async () => {
  isLoading.value = true;
  
  try {
    // TODO: Implement actual API call
    // const response = await api.post('/auth/login', { email: email.value, password: password.value });
    // localStorage.setItem('token', response.data.token);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    localStorage.setItem('token', 'mock-jwt-token');
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  } finally {
    isLoading.value = false;
  }
};
</script>
