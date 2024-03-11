import { defaults, Schema } from "#/state/persisted/schema";
import { migrate } from "#/state/persisted/legacy";
import * as store from "#/state/persisted/store";

export type { Schema, PersistedAccount } from "#/state/persisted/schema";
export { defaults } from "#/state/persisted/schema";

let _state: Schema = defaults;

/**
 * Initializes and returns persisted data state, so that it can be passed to
 * the Provider.
 */
export async function init() {
  console.log("persisted state: initializing");

  try {
    await migrate(); // migrate old store
    const stored = await store.read(); // check for new store
    if (!stored) {
      console.log("persisted state: initializing default storage");
      await store.write(defaults); // opt: init new store
    }
    _state = stored || defaults; // return new store
    console.log("persisted state: initialized");
  } catch (e) {
    console.log("persisted state: failed to load root state from storage", {
      message: e,
    });
    // AsyncStorage failure, but we can still continue in memory
    return defaults;
  }
}

export function get<K extends keyof Schema>(key: K): Schema[K] {
  return _state[key];
}

export async function write<K extends keyof Schema>(
  key: K,
  value: Schema[K]
): Promise<void> {
  try {
    _state[key] = value;
    await store.write(_state);
    // must happen on next tick, otherwise the tab will read stale storage data
    console.log(`persisted state: wrote root state to storage`, {
      updatedKey: key,
    });
  } catch (e) {
    console.log(`persisted state: failed writing root state to storage`, {
      message: e,
    });
  }
}
