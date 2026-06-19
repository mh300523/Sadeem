import { ref, watchEffect } from 'vue'

const isDark = ref(localStorage.getItem('theme') !== 'light')

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.classList.toggle('light', !isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  return { isDark, toggleTheme }
}
