import { atoms } from "#/alf";
import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import { H2, H4, P } from "#/components/Typography";
import { deviceLocales, devicePlatform } from "#/platform/detection";
import { Switch, View } from "react-native";
import * as persisted from "#/state/persisted";
import { useSetThemePrefs, useThemePrefs } from "#/state/shell";
import React from "react";

const Home = () => {
  const theme = useColorModeTheme();

  const { setColorMode, setDarkTheme } = useSetThemePrefs();
  const { colorMode } = useThemePrefs();

  const toggleTheme = React.useCallback(() => {
    if (theme == "light") {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  }, [theme]);

  const toggleSoftDark = React.useCallback(() => {
    if (theme == "dim") {
      setDarkTheme("dark");
    } else {
      setDarkTheme("dim");
    }
  }, [theme]);

  const isDark = React.useMemo(() => theme != "light", [theme]);
  const isSoftDark = React.useMemo(() => {
    return theme != "dim" && theme != "light";
  }, [theme]);

  return (
    <View
      style={[
        atoms.flex_1,
        atoms.justify_center,
        atoms.align_center,
        atoms.gap_2xl,
      ]}
    >
      <H2>{devicePlatform}</H2>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>Theme:</H4>
        <P>{theme}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>Color Mode:</H4>
        <P>{colorMode}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>Device Locales:</H4>
        <P>{deviceLocales}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>Selected Locale:</H4>
        <P>{persisted.get("languagePrefs").primaryLanguage}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg]}>
        <View style={[atoms.gap_md]}>
          <P>Dark Mode</P>
          <Switch value={isDark} onChange={toggleTheme} />
        </View>
        <View style={[atoms.gap_md]}>
          <P>Soft Dark</P>
          <Switch
            value={isSoftDark}
            onChange={toggleSoftDark}
            disabled={!isDark}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
