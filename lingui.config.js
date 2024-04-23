/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "tr"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/src/locale/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
