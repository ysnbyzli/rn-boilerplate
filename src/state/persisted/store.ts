import AsyncStorage from "@react-native-async-storage/async-storage";

import { Schema, schema } from "#/state/persisted/schema";

const RN_STORAGE = "RN_STORAGE";

export async function write(value: Schema) {
  schema.parse(value);
  await AsyncStorage.setItem(RN_STORAGE, JSON.stringify(value));
}

export async function read(): Promise<Schema | undefined> {
  const rawData = await AsyncStorage.getItem(RN_STORAGE);
  const objData = rawData ? JSON.parse(rawData) : undefined;
  if (schema.safeParse(objData).success) {
    return objData;
  }
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(RN_STORAGE);
  } catch (e: any) {
    console.log(`persisted store: failed to clear`, { message: e.toString() });
  }
}
