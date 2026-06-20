import { watch } from "vue";
import { createI18n } from "vue-i18n";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "ar",
  fallbackLocale: "en",
  messages: {
    ar,
    en,
  },
});

watch(
  i18n.global.locale,
  (val) => {
    localStorage.setItem("locale", val);
    document.documentElement.lang = val;
    document.documentElement.dir = val === "ar" ? "rtl" : "ltr";
  },
  { immediate: true },
);

export default i18n;
