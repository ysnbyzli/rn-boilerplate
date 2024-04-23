import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { init as initPersistedState } from "#/state/persisted";
import { Provider as ShellProvider } from "#/state/shell";
import { Provider as LanguageProvider } from "#/state/preferences/languages";
import { ThemeProvider as Alf } from "#/alf";
import { ThemeProvider } from "lib/ThemeContext";

import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import Home from "#/view/screens/Home";
import React from "react";
import I18nProvider from "#/locale/i18nProvider";

function InnerApp() {
  const theme = useColorModeTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Alf theme={theme}>
        <ThemeProvider theme={theme}>
          <Home />
          <StatusBar style={theme == "light" ? "dark" : "light"} />
        </ThemeProvider>
      </Alf>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [isReady, setReady] = React.useState(false);

  React.useEffect(() => {
    initPersistedState().then(() => setReady(true));
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <ShellProvider>
      <LanguageProvider>
        <I18nProvider>
          <InnerApp />
        </I18nProvider>
      </LanguageProvider>
    </ShellProvider>
  );
}
