import EventEmitter from "eventemitter3";
import { defaults, Schema } from "#/state/persisted/schema";
import { migrate } from "#/state/persisted/legacy";
import * as store from "#/state/persisted/store";
import BroadcastChannel from "#/lib/broadcast";

export type { Schema, PersistedAccount } from "#/state/persisted/schema";
export { defaults } from "#/state/persisted/schema";

const broadcast = new BroadcastChannel("RN_BROADCAST_CHANNEL");
const UPDATE_EVENT = "BSKY_UPDATE";

let _state: Schema = defaults;
const _emitter = new EventEmitter();

/**
 * Initializes and returns persisted data state, so that it can be passed to
 * the Provider.
 */
export async function init() {
  console.log("persisted state: initializing");

  broadcast.onmessage = onBroadcastMessage;

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
    setTimeout(() => broadcast.postMessage({ event: UPDATE_EVENT }), 0);
    console.log(`persisted state: wrote root state to storage`, {
      updatedKey: key,
    });
  } catch (e) {
    console.log(`persisted state: failed writing root state to storage`, {
      message: e,
    });
  }
}

export function onUpdate(cb: () => void): () => void {
  _emitter.addListener("update", cb);
  return () => _emitter.removeListener("update", cb);
}

async function onBroadcastMessage({ data }: MessageEvent) {
  // validate event
  if (typeof data === "object" && data.event === UPDATE_EVENT) {
    try {
      // read next state, possibly updated by another tab
      const next = await store.read();

      if (next) {
        console.log(`persisted state: handling update from broadcast channel`);
        _state = next;
        _emitter.emit("update");
      } else {
        console.log(
          `persisted state: handled update update from broadcast channel, but found no data`
        );
      }
    } catch (e) {
      console.log(
        `persisted state: failed handling update from broadcast channel`,
        {
          message: e,
        }
      );
    }
  }
}
