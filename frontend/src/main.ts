import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import i18nMessages from './locales';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: i18nMessages.messages,
});

// Apply saved theme
const savedTheme = localStorage.getItem('theme') || 'system';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');
if (savedTheme === 'system') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
}

// Apply saved language direction
const currentLocale = i18n.global.locale.value;
const rtlLanguages = ['fa', 'ar'];
document.documentElement.setAttribute('dir', rtlLanguages.includes(currentLocale) ? 'rtl' : 'ltr');

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
