import * as Updates from "expo-updates";
import { Platform } from "react-native";
import VersionNumber from "react-native-version-number";
export const updateChannel = Updates.channel;

export const appVersion = `${VersionNumber.appVersion} (${VersionNumber.buildVersion})`;

export const platformVersion = Platform.Version;

export const IS_IOS = Platform.OS === "ios";

export const IS_ANDROID = Platform.OS === "android";

export const dist = `${Platform.OS} ${VersionNumber.appVersion} (${VersionNumber.buildVersion})`;
