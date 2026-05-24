import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale, t } = useI18n()

  const setLocale = (lang) => {
    locale.value = lang

    localStorage.setItem(
      'locale',
      lang
    )

    document.documentElement.lang =
      lang

    document.documentElement.dir =
      lang === 'ar'
        ? 'rtl'
        : 'ltr'
  }

  return {
    locale,
    t,
    setLocale
  }
}
