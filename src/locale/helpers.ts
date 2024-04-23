import {
  AppLanguage,
  LANGUAGES_MAP_CODE2,
  LANGUAGES_MAP_CODE3,
} from "./languages";

export function code2ToCode3(lang: string): string {
  if (lang.length === 2) {
    return LANGUAGES_MAP_CODE2[lang]?.code3 || lang;
  }
  return lang;
}

export function code3ToCode2(lang: string): string {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2 || lang;
  }
  return lang;
}

export function code3ToCode2Strict(lang: string): string | undefined {
  if (lang.length === 3) {
    return LANGUAGES_MAP_CODE3[lang]?.code2;
  }

  return undefined;
}

export function codeToLanguageName(lang: string): string {
  const lang2 = code3ToCode2(lang);
  return LANGUAGES_MAP_CODE2[lang2]?.name || lang;
}

export function getTranslatorLink(text: string, lang: string): string {
  return `https://translate.google.com/?sl=auto&tl=${lang}&text=${encodeURIComponent(
    text
  )}`;
}

/**
 * Returns a valid `appLanguage` value from an arbitrary string.
 *
 * Contenxt: post-refactor, we populated some user's `appLanguage` setting with
 * `postLanguage`, which can be a comma-separated list of values. This breaks
 * `appLanguage` handling in the app, so we introduced this util to parse out a
 * valid `appLanguage` from the pre-populated `postLanguage` values.
 *
 * The `appLanguage` will continue to be incorrect until the user returns to
 * language settings and selects a new option, at which point we'll re-save
 * their choice, which should then be a valid option. Since we don't know when
 * this will happen, we should leave this here until we feel it's safe to
 * remove, or we re-migrate their storage.
 */
export function sanitizeAppLanguageSetting(appLanguage: string): AppLanguage {
  const langs = appLanguage.split(",").filter(Boolean);

  for (const lang of langs) {
    switch (lang) {
      case "en":
        return AppLanguage.en;
      case "tr":
        return AppLanguage.tr;
      default:
        continue;
    }
  }
  return AppLanguage.en;
}
