import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'fr', 'ki', 'sw'],
  directory: `${__dirname}/../../locales/`,
  defaultLocale: 'en',
  register: global,
  headers: 'Accept-Language'
});

export default i18n;
