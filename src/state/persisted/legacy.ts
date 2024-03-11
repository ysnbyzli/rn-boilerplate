import AsyncStorage from "@react-native-async-storage/async-storage";

import { defaults, Schema, schema } from "#/state/persisted/schema";
import { write, read } from "#/state/persisted/store";

/**
 * The shape of the serialized data from our legacy Mobx store.
 */
export type LegacySchema = {
  shell: {
    colorMode: "system" | "light" | "dark";
  };
  session: {
    email: string;
  };
  onboarding: {
    step: string;
  };
  preferences: {
    primaryLanguage: string;
  };
};

const DEPRECATED_ROOT_STATE_STORAGE_KEY = "root";

export function transform(legacy: Partial<LegacySchema>): Schema {
  return {
    colorMode: legacy.shell?.colorMode || defaults.colorMode,
    darkTheme: defaults.darkTheme,
    session: {
      email: legacy.session?.email || defaults.session?.email,
    },
    languagePrefs: {
      primaryLanguage:
        legacy.preferences?.primaryLanguage ||
        defaults.languagePrefs.primaryLanguage,
      appLanguage:
        legacy.preferences?.primaryLanguage ||
        defaults.languagePrefs.appLanguage,
    },
    onboarding: {
      step: legacy.onboarding?.step || defaults.onboarding.step,
    },
  };
}

/**
 * Migrates legacy persisted state to new store if new store doesn't exist in
 * local storage AND old storage exists.
 */
export async function migrate() {
  console.log("persisted state: check need to migrate");

  try {
    const rawLegacyData = await AsyncStorage.getItem(
      DEPRECATED_ROOT_STATE_STORAGE_KEY
    );
    const newData = await read();
    const alreadyMigrated = Boolean(newData);

    if (!alreadyMigrated && rawLegacyData) {
      console.log("persisted state: migrating legacy storage");

      const legacyData = JSON.parse(rawLegacyData);
      const newData = transform(legacyData);
      const validate = schema.safeParse(newData);

      if (validate.success) {
        await write(newData);
        console.log("persisted state: migrated legacy storage");
      } else {
        console.log("persisted state: legacy data failed validation", {
          message: validate.error,
        });
      }
    } else {
      console.log("persisted state: no migration needed");
    }
  } catch (e: any) {
    console.log(e, {
      message: "persisted state: error migrating legacy storage",
    });
  }
}

export async function clearLegacyStorage() {
  try {
    await AsyncStorage.removeItem(DEPRECATED_ROOT_STATE_STORAGE_KEY);
  } catch (e: any) {
    console.log(`persisted legacy store: failed to clear`, {
      message: e.toString(),
    });
  }
}
