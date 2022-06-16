import { createI18n } from 'vue-i18n'

function setLanguage (locale) {
  const html = document.querySelector('html')
  html.setAttribute('lang', locale)
}

async function loadLocaleMessages () {
  const messages = {
    en: {
      welcome: 'Welcome'
    },
    fr: {
      welcome: 'Bienvenue'
    }
  }
  // const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)

  // locales.keys().forEach(key => {
  //   const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  //   if (matched && matched.length > 1) {
  //     const locale = matched[1]
  //     messages[locale] = locales(key)
  //   }
  // })
  // const result = await import(`./locales/${locale}.json`)
  // return result.default
  return messages
}

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
    }
  },
  fr: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol'
    }
  }
}

const i18n = createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_FALLBACK_I18N_LOCALE || 'en',
  messages: loadLocaleMessages(),
  numberFormats
})

setLanguage(i18n.global.locale)

if (import.meta.env.DEV) {
  window.translation = i18n
}

export default i18n
