import { StatusBar } from "expo-status-bar";

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { init as initPersistedState } from "#/state/persisted";

import { Provider as ShellProvider } from "#/state/shell";
import { Provider as LanguageProvider } from "#/state/preferences/languages";
import { ThemeProvider as Alf } from "#/alf";
import { ThemeProvider } from "lib/ThemeContext";
import { Provider as ModalProvider } from "#/state/modals";

import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import Home from "#/view/screens/Home";
import React from "react";
import I18nProvider from "#/locale/i18nProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalsContainer } from "#/view/com/modals/Modal";

function InnerApp() {
  const theme = useColorModeTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Alf theme={theme}>
          <ThemeProvider theme={theme}>
            <Home />
            <ModalsContainer />
            <StatusBar style={theme == "light" ? "dark" : "light"} />
          </ThemeProvider>
        </Alf>
      </GestureHandlerRootView>
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
          <ModalProvider>
            <InnerApp />
          </ModalProvider>
        </I18nProvider>
      </LanguageProvider>
    </ShellProvider>
  );
}
