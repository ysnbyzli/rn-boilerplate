import * as Updates from "expo-updates";
import { useCallback, useEffect, useMemo } from "react";
import { AppState } from "react-native";

export function useOTAUpdate() {
  // HELPER FUNCTIONS

  const { isDownloading, isUpdateAvailable, isUpdatePending, downloadError } =
    Updates.useUpdates();

  const checkForUpdate = useCallback(async () => {
    console.log("useOTAUpdate: Checking for update...");
    try {
      if (!isUpdateAvailable) {
        return;
      }
      // Update has successfully downloaded; apply it now
      await Updates.checkForUpdateAsync();
    } catch (e) {
      console.log("useOTAUpdate: Error while checking for update", {
        message: e,
      });
    }
  }, [isUpdateAvailable]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active" && !__DEV__) {
          checkForUpdate();
        }
      }
    );

    // REMOVE EVENT LISTENERS (CLEANUP)
    return () => {
      appStateSubscription.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // disable exhaustive deps because we don't want to run this effect again

  const state = useMemo(() => {
    return {
      isDownloading,
      isUpdatePending,
      downloadError,
    };
  }, [isDownloading, isUpdatePending, downloadError]);

  return state;
}
