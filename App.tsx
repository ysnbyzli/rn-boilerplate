import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { init as initPersistedState } from "#/state/persisted";
import { Provider as ShellProvider } from "#/state/shell";
import { ThemeProvider as Alf } from "#/alf";
import { ThemeProvider } from "lib/ThemeContext";

import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import Home from "#/view/screens/Home";
import React from "react";

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
      <InnerApp />
    </ShellProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
