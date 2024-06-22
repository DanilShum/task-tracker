import { createI18n } from "vue-i18n";

import type { DefineLocaleMessage } from "vue-i18n";

const MAIN_LANG = "en";
const SUPPORT_LOCALES = [MAIN_LANG, "ru"];

const helpers = {
  getInitLanguage: (): Lang => {
    const navLang = navigator.language;
    const userLang = localStorage.getItem("lang") ?? "";

    if (SUPPORT_LOCALES.includes(navLang) && !localStorage.getItem("lang")) {
      return navLang as Lang;
    }

    if (SUPPORT_LOCALES.includes(userLang)) return userLang as Lang;

    return MAIN_LANG;
  },
  loadLocaleMessages: () => {
    const context = require.context("@/locales/", false, /\.yml$/);

    const rExp = /[a-z0-9-_]+/i;

    return context
      .keys()
      .filter(Boolean)
      .map((key) => ({ key, locale: key.match(rExp)?.[0] || "" }))
      .reduce(
        (mess, { key, locale }) => ({
          ...mess,
          [locale]: context(key).default,
        }),
        {}
      ) as Record<Lang, DefineLocaleMessage>;
  },
};

const lang = helpers.getInitLanguage();
const messages = helpers.loadLocaleMessages();

const i18n = createI18n({
  messages,
  locale: lang,
  fallbackLocale: MAIN_LANG,
  legacy: false,
  globalInjection: true,
  pluralizationRules: {
    /**
     * @param choice {number} a choice index given by the input to $t: `$t('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index to select plural word by
     */
    ru: function (choice, choicesLength) {
      // this === VueI18n instance, so the locale property also exists here

      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return choicesLength < 4 ? 2 : 3;
    },
  },
});

const setI18nLanguage = (lang: Lang): void => {
  i18n.global.locale.value = lang;

  localStorage.setItem("lang", lang);
  document.querySelector("html")?.setAttribute("lang", lang);
};

export { i18n, setI18nLanguage };
