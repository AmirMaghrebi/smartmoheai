<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Animated Mesh Background -->
    <div class="fixed inset-0 animated-mesh opacity-30 dark:opacity-20"></div>
    
    <!-- Gradient Orbs -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
    <div class="fixed bottom-0 right-1/4 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl animate-float" style="animation-delay: -3s;"></div>
    
    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 py-6 lg:px-8 lg:py-8">
      <!-- Premium Header -->
      <header class="mb-8 animate-slide-up">
        <div class="glass-card rounded-3xl p-6 lg:p-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <!-- Logo / Brand -->
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span class="text-2xl">🏠</span>
              </div>
              <div>
                <h1 class="text-2xl lg:text-3xl font-bold text-gradient">
                  {{ $t('dashboard.welcome') }}
                </h1>
                <p class="text-text-secondary mt-1">
                  {{ $t('dashboard.subtitle') }}
                </p>
              </div>
            </div>
            
            <!-- Header Actions -->
            <div class="flex items-center gap-3 flex-wrap">
              <!-- Theme Toggle -->
              <button 
                @click="toggleTheme" 
                class="group relative w-12 h-12 rounded-2xl bg-bg-tertiary border border-border-light hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span class="absolute inset-0 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {{ isDark ? '☀️' : '🌙' }}
                </span>
              </button>
              
              <!-- Language Selector -->
              <div class="relative group">
                <select 
                  v-model="currentLocale" 
                  @change="changeLanguage"
                  class="appearance-none px-4 py-3 pr-10 rounded-2xl bg-bg-tertiary border border-border-light text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-pointer hover:border-primary-500/50"
                >
                  <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                    {{ lang.name }}
                  </option>
                </select>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">▼</span>
              </div>
              
              <!-- Notifications -->
              <button class="group relative w-12 h-12 rounded-2xl bg-bg-tertiary border border-border-light hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <span class="text-xl">🔔</span>
                <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-danger-500 rounded-full border-2 border-bg-secondary animate-pulse"></span>
              </button>
              
              <!-- Profile -->
              <button class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-bg-tertiary border border-border-light hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span class="hidden sm:block font-medium text-text-primary">Ali</span>
              </button>
              
              <!-- Logout -->
              <button @click="logout" class="px-5 py-3 rounded-2xl bg-gradient-to-r from-danger-500 to-danger-600 text-white font-semibold shadow-lg shadow-danger-500/30 hover:shadow-xl hover:shadow-danger-500/40 hover:-translate-y-0.5 transition-all duration-300">
                {{ $t('common.logout') }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Quick Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 animate-slide-up" style="animation-delay: 0.1s;">
        <!-- Devices Card -->
        <div class="group premium-card bg-bg-secondary/80 backdrop-blur-xl p-6 cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">💡</span>
            </div>
            <span class="status-badge status-online">Online</span>
          </div>
          <div>
            <p class="text-text-secondary text-sm font-medium">{{ $t('dashboard.devices') }}</p>
            <div class="flex items-end gap-2 mt-1">
              <p class="text-4xl font-bold text-text-primary">24</p>
              <p class="text-success-500 text-sm font-semibold mb-1">+2</p>
            </div>
            <p class="text-text-tertiary text-xs mt-2">24 {{ $t('dashboard.online') }}</p>
          </div>
          <!-- Progress Bar -->
          <div class="mt-4 h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
            <div class="h-full w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
          </div>
        </div>

        <!-- Security Card -->
        <div class="group premium-card bg-bg-secondary/80 backdrop-blur-xl p-6 cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-success-500/20 to-success-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🛡️</span>
            </div>
            <span class="status-badge status-online">{{ $t('dashboard.armed') }}</span>
          </div>
          <div>
            <p class="text-text-secondary text-sm font-medium">{{ $t('dashboard.security') }}</p>
            <p class="text-4xl font-bold text-success-500 mt-1">{{ $t('dashboard.secure') }}</p>
            <p class="text-text-tertiary text-xs mt-2">{{ $t('dashboard.allSecure') }}</p>
          </div>
          <!-- Status Indicator -->
          <div class="mt-4 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div>
            <span class="text-xs text-success-500 font-medium">All systems normal</span>
          </div>
        </div>

        <!-- Climate Card -->
        <div class="group premium-card bg-bg-secondary/80 backdrop-blur-xl p-6 cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">🌡️</span>
            </div>
            <span class="text-2xl">😌</span>
          </div>
          <div>
            <p class="text-text-secondary text-sm font-medium">{{ $t('dashboard.climate') }}</p>
            <p class="text-4xl font-bold text-text-primary mt-1">22°C</p>
            <p class="text-text-tertiary text-xs mt-2">{{ $t('dashboard.humidity') }}: 45%</p>
          </div>
          <!-- Mini Chart Placeholder -->
          <div class="mt-4 flex items-end gap-1 h-8">
            <div class="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-500/60 rounded-t-sm" style="height: 40%;"></div>
            <div class="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-500/60 rounded-t-sm" style="height: 60%;"></div>
            <div class="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-500/60 rounded-t-sm" style="height: 50%;"></div>
            <div class="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-500/60 rounded-t-sm" style="height: 80%;"></div>
            <div class="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-500/60 rounded-t-sm" style="height: 70%;"></div>
          </div>
        </div>

        <!-- Energy Card -->
        <div class="group premium-card bg-bg-secondary/80 backdrop-blur-xl p-6 cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl">⚡</span>
            </div>
            <span class="status-badge status-online">{{ $t('dashboard.efficient') }}</span>
          </div>
          <div>
            <p class="text-text-secondary text-sm font-medium">{{ $t('dashboard.energy') }}</p>
            <p class="text-4xl font-bold text-text-primary mt-1">1.2 kW</p>
            <p class="text-success-500 text-xs mt-2">-12% {{ $t('dashboard.vsLastWeek') }}</p>
          </div>
          <!-- Circular Progress -->
          <div class="mt-4 relative w-full h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
            <div class="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
        <!-- Left Column - Quick Actions & Rooms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Quick Actions -->
          <div class="animate-slide-up" style="animation-delay: 0.2s;">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-text-primary">{{ $t('dashboard.quickActions') }}</h2>
              <button class="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                View All →
              </button>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:from-yellow-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">💡</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.lights') }}</p>
              </button>
              
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 group-hover:from-blue-400/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">🔒</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.locks') }}</p>
              </button>
              
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 group-hover:from-orange-400/30 group-hover:to-red-500/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">🌡️</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.climate') }}</p>
              </button>
              
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 group-hover:from-purple-400/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">🎬</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.scenes') }}</p>
              </button>
              
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:from-green-400/30 group-hover:to-emerald-500/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">🤖</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.automations') }}</p>
              </button>
              
              <button class="group glass-card rounded-2xl p-4 lg:p-5 flex flex-col items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400/20 to-rose-600/20 flex items-center justify-center group-hover:scale-110 group-hover:from-red-400/30 group-hover:to-rose-600/30 transition-all duration-300">
                  <span class="text-2xl lg:text-3xl">📹</span>
                </div>
                <p class="text-xs lg:text-sm font-medium text-text-primary">{{ $t('actions.cameras') }}</p>
              </button>
            </div>
          </div>

          <!-- Rooms Section -->
          <div class="animate-slide-up" style="animation-delay: 0.3s;">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-text-primary">Rooms</h2>
              <button class="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                Manage →
              </button>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="group gradient-card p-5 cursor-pointer" style="background: linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(168, 85, 247) 100%);">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-3xl">🛋️</span>
                  <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">4</span>
                </div>
                <h3 class="text-white font-bold text-lg">Living Room</h3>
                <p class="text-white/70 text-xs mt-1">Lights • Climate • TV</p>
              </div>
              
              <div class="group gradient-card p-5 cursor-pointer" style="background: linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%);">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-3xl">🍳</span>
                  <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">3</span>
                </div>
                <h3 class="text-white font-bold text-lg">Kitchen</h3>
                <p class="text-white/70 text-xs mt-1">Lights • Appliances</p>
              </div>
              
              <div class="group gradient-card p-5 cursor-pointer" style="background: linear-gradient(135deg, rgb(236, 72, 153) 0%, rgb(244, 114, 182) 100%);">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-3xl">🛏️</span>
                  <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">5</span>
                </div>
                <h3 class="text-white font-bold text-lg">Bedroom</h3>
                <p class="text-white/70 text-xs mt-1">Lights • Blinds • AC</p>
              </div>
              
              <div class="group gradient-card p-5 cursor-pointer" style="background: linear-gradient(135deg, rgb(251, 146, 60) 0%, rgb(239, 68, 68) 100%);">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-3xl">🚿</span>
                  <span class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">2</span>
                </div>
                <h3 class="text-white font-bold text-lg">Bathroom</h3>
                <p class="text-white/70 text-xs mt-1">Lights • Heater</p>
              </div>
            </div>
          </div>

          <!-- Favorite Devices -->
          <div class="animate-slide-up" style="animation-delay: 0.4s;">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-text-primary">{{ $t('dashboard.favoriteDevices') }}</h2>
              <button class="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                Customize →
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Light Device -->
              <div class="premium-card bg-bg-secondary/80 backdrop-blur-xl p-5 group hover:border-primary-500/50 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span class="text-2xl">💡</span>
                    </div>
                    <div>
                      <p class="font-bold text-text-primary">{{ $t('devices.livingRoomLight') }}</p>
                      <p class="text-xs text-text-tertiary">{{ $t('devices.light') }}</p>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="device-toggle peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600">
                      <div class="device-toggle-knob"></div>
                    </div>
                  </label>
                </div>
                <!-- Brightness Slider -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-text-tertiary">Brightness</span>
                    <span class="text-text-primary font-semibold">80%</span>
                  </div>
                  <input type="range" min="0" max="100" value="80" class="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary-500">
                </div>
              </div>

              <!-- Door Lock -->
              <div class="premium-card bg-bg-secondary/80 backdrop-blur-xl p-5 group hover:border-success-500/50 transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span class="text-2xl">🔒</span>
                    </div>
                    <div>
                      <p class="font-bold text-text-primary">{{ $t('devices.frontDoor') }}</p>
                      <p class="text-xs text-success-500 font-semibold">{{ $t('status.locked') }}</p>
                    </div>
                  </div>
                  <button class="px-4 py-2 rounded-xl bg-gradient-to-r from-success-500 to-success-600 text-white text-sm font-semibold shadow-lg shadow-success-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    {{ $t('actions.unlock') }}
                  </button>
                </div>
              </div>

              <!-- Thermostat -->
              <div class="premium-card bg-bg-secondary/80 backdrop-blur-xl p-5 group hover:border-orange-500/50 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span class="text-2xl">🌡️</span>
                    </div>
                    <div>
                      <p class="font-bold text-text-primary">{{ $t('devices.thermostat') }}</p>
                      <p class="text-xs text-text-tertiary">{{ $t('devices.target') }}: 22°C</p>
                    </div>
                  </div>
                </div>
                <!-- Temperature Control -->
                <div class="flex items-center justify-center gap-4">
                  <button class="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-light hover:border-primary-500/50 text-text-primary font-bold text-lg hover:-translate-y-0.5 transition-all">−</button>
                  <div class="text-center">
                    <p class="text-3xl font-bold text-text-primary">22°</p>
                    <p class="text-xs text-text-tertiary">Celsius</p>
                  </div>
                  <button class="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-light hover:border-primary-500/50 text-text-primary font-bold text-lg hover:-translate-y-0.5 transition-all">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Activity Feed & Scenes -->
        <div class="space-y-6">
          <!-- Active Scenes -->
          <div class="animate-slide-up" style="animation-delay: 0.3s;">
            <h2 class="text-xl font-bold text-text-primary mb-4">Active Scenes</h2>
            <div class="glass-card rounded-2xl p-5 space-y-3">
              <div class="group flex items-center justify-between p-3 rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <span class="text-xl">🌅</span>
                  </div>
                  <div>
                    <p class="font-semibold text-text-primary text-sm">Morning Routine</p>
                    <p class="text-xs text-text-tertiary">6:00 AM • Daily</p>
                  </div>
                </div>
                <div class="w-3 h-3 rounded-full bg-success-500 animate-pulse"></div>
              </div>
              
              <div class="group flex items-center justify-between p-3 rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span class="text-xl">🏠</span>
                  </div>
                  <div>
                    <p class="font-semibold text-text-primary text-sm">Away Mode</p>
                    <p class="text-xs text-text-tertiary">Security • Energy</p>
                  </div>
                </div>
                <div class="w-3 h-3 rounded-full bg-bg-tertiary"></div>
              </div>
              
              <div class="group flex items-center justify-between p-3 rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <span class="text-xl">🎬</span>
                  </div>
                  <div>
                    <p class="font-semibold text-text-primary text-sm">Movie Night</p>
                    <p class="text-xs text-text-tertiary">Lights • TV • Blinds</p>
                  </div>
                </div>
                <div class="w-3 h-3 rounded-full bg-bg-tertiary"></div>
              </div>
              
              <button class="w-full py-3 rounded-xl border-2 border-dashed border-border-light text-text-tertiary hover:border-primary-500/50 hover:text-primary-500 transition-all font-medium text-sm">
                + Add New Scene
              </button>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="animate-slide-up" style="animation-delay: 0.4s;">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-text-primary">{{ $t('dashboard.recentActivity') }}</h2>
              <button class="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors">
                View All
              </button>
            </div>
            <div class="glass-card rounded-2xl p-5">
              <div class="space-y-4">
                <div class="flex items-start gap-3 pb-4 border-b border-border-light last:border-0 last:pb-0">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-success-500/20 to-success-600/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-lg">🔒</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-text-primary text-sm">{{ $t('activity.doorLocked') }}</p>
                    <p class="text-xs text-text-tertiary mt-0.5">{{ $t('activity.byUser', { user: 'Ali' }) }}</p>
                  </div>
                  <span class="text-xs text-text-tertiary whitespace-nowrap">2m</span>
                </div>
                
                <div class="flex items-start gap-3 pb-4 border-b border-border-light last:border-0 last:pb-0">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-lg">💡</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-text-primary text-sm">{{ $t('activity.lightTurnedOn') }}</p>
                    <p class="text-xs text-text-tertiary mt-0.5">{{ $t('activity.inRoom', { room: 'Living Room' }) }}</p>
                  </div>
                  <span class="text-xs text-text-tertiary whitespace-nowrap">15m</span>
                </div>
                
                <div class="flex items-start gap-3 pb-4 border-b border-border-light last:border-0 last:pb-0">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-lg">🌡️</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-text-primary text-sm">{{ $t('activity.temperatureChanged') }}</p>
                    <p class="text-xs text-text-tertiary mt-0.5">{{ $t('activity.toTemp', { temp: '22°C' }) }}</p>
                  </div>
                  <span class="text-xs text-text-tertiary whitespace-nowrap">1h</span>
                </div>
                
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-lg">🔔</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-text-primary text-sm">Motion Detected</p>
                    <p class="text-xs text-text-tertiary mt-0.5">Front Camera</p>
                  </div>
                  <span class="text-xs text-text-tertiary whitespace-nowrap">3h</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Weather Widget -->
          <div class="animate-slide-up" style="animation-delay: 0.5s;">
            <div class="gradient-card p-6" style="background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(147, 51, 234) 100%);">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-white/70 text-sm">Tehran</p>
                  <p class="text-4xl font-bold text-white mt-1">24°C</p>
                </div>
                <div class="text-right">
                  <span class="text-5xl">⛅</span>
                  <p class="text-white/70 text-sm mt-2">Partly Cloudy</p>
                </div>
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-white/20">
                <div class="text-center">
                  <p class="text-white/50 text-xs">Humidity</p>
                  <p class="text-white font-semibold">45%</p>
                </div>
                <div class="text-center">
                  <p class="text-white/50 text-xs">Wind</p>
                  <p class="text-white font-semibold">12 km/h</p>
                </div>
                <div class="text-center">
                  <p class="text-white/50 text-xs">UV Index</p>
                  <p class="text-white font-semibold">Moderate</p>
                </div>
              </div>
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
