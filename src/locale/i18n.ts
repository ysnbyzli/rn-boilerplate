import { useEffect } from "react";
import { i18n } from "@lingui/core";

import { AppLanguage } from "./languages";
import { sanitizeAppLanguageSetting } from "./helpers";
import { messages as messagesEn } from "./locales/en/messages";
import { messages as messagesTr } from "./locales/tr/messages";
import { useLanguagePrefs } from "#/state/preferences/languages";
/**
 * We do a dynamic import of just the catalog that we need
 */

export async function dynamicActivate(locale: AppLanguage) {
  switch (locale) {
    case AppLanguage.tr: {
      i18n.loadAndActivate({ locale, messages: messagesTr });
      break;
    }
    case AppLanguage.en: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      break;
    }
    default: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      break;
    }
  }
}

export async function useLocaleLanguage() {
  const { appLanguage, primaryLanguage } = useLanguagePrefs();
  useEffect(() => {
    if (primaryLanguage) {
      dynamicActivate(sanitizeAppLanguageSetting(primaryLanguage));
      return;
    }
    dynamicActivate(sanitizeAppLanguageSetting(appLanguage));
  }, [appLanguage, primaryLanguage]);
}
