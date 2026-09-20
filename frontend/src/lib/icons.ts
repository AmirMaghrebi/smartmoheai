import { 
  Home, Mail, Lock, Lightbulb, Thermometer, 
  Activity, Plug, Zap, Sun, Moon, Globe,
  ChevronDown, Plus, Settings, LogOut, User,
  Bell, Search, Menu, X, Check, AlertCircle
} from '@lucide/vue';

export const icons: Record<string, any> = {
  home: Home,
  mail: Mail,
  lock: Lock,
  lightbulb: Lightbulb,
  thermometer: Thermometer,
  motion: Activity,
  plug: Plug,
  zap: Zap,
  sun: Sun,
  moon: Moon,
  globe: Globe,
  chevronDown: ChevronDown,
  plus: Plus,
  settings: Settings,
  logOut: LogOut,
  user: User,
  bell: Bell,
  search: Search,
  menu: Menu,
  x: X,
  check: Check,
  alertCircle: AlertCircle
};

export function getIconByName(name: string) {
  return icons[name] || Zap;
}

export function getDeviceColor(type: string): string {
  const colors: Record<string, string> = {
    light: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    thermostat: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    lock: 'bg-gradient-to-br from-red-400 to-pink-500',
    sensor: 'bg-gradient-to-br from-green-400 to-emerald-500',
    plug: 'bg-gradient-to-br from-purple-400 to-violet-500'
  };
  return colors[type] || 'bg-gradient-to-br from-gray-400 to-gray-500';
}
