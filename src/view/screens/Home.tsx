import { atoms } from "#/alf";
import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import { H2, H4, P } from "#/components/Typography";
import { deviceLocales, devicePlatform } from "#/platform/detection";
import { Button, Switch, View } from "react-native";
import * as persisted from "#/state/persisted";
import { useSetThemePrefs, useThemePrefs } from "#/state/shell";
import React from "react";
import { useLingui } from "@lingui/react";
import { Trans, msg } from "@lingui/macro";
import { dynamicActivate } from "#/locale/i18n";
import { AppLanguage } from "#/locale/languages";
import {
  useLanguagePrefs,
  useLanguagePrefsApi,
} from "#/state/preferences/languages";
import { useModalControls } from "#/state/modals";

const Home = () => {
  const theme = useColorModeTheme();
  const { setPrimaryLanguage } = useLanguagePrefsApi();
  const { primaryLanguage } = useLanguagePrefs();

  const { openModal } = useModalControls();

  console.log({ primaryLanguage });

  const { _ } = useLingui();

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
        <H4>
          <Trans>Theme:</Trans>
        </H4>
        <P>{theme}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>
          <Trans>Color Mode:</Trans>
        </H4>
        <P>{colorMode}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>
          <Trans>Device Locales:</Trans>
        </H4>
        <P>{deviceLocales}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>
          <Trans>Selected Locale:</Trans>
        </H4>
        <P>{persisted.get("languagePrefs").primaryLanguage}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg]}>
        <View style={[atoms.gap_md]}>
          <P>
            <Trans>Dark Mode</Trans>
          </P>
          <Switch value={isDark} onChange={toggleTheme} />
        </View>
        <View style={[atoms.gap_md]}>
          <P>
            <Trans>Soft Dark</Trans>
          </P>
          <Switch
            value={isSoftDark}
            onChange={toggleSoftDark}
            disabled={!isDark}
          />
        </View>
      </View>
      <Button
        title={_(msg`Change Language`)}
        onPress={() => {
          dynamicActivate(
            primaryLanguage === AppLanguage.tr ? AppLanguage.en : AppLanguage.tr
          );
          setPrimaryLanguage(
            primaryLanguage === AppLanguage.tr ? AppLanguage.en : AppLanguage.tr
          );
        }}
      />
      <Button
        title={_(msg`Open Bottomsheet`)}
        onPress={() => {
          openModal({
            message: "Hello",
            name: "confirm",
            title: "Hello",
            onPressConfirm: () => {
              console.log("Confirm");
            },
          });
        }}
      />
    </View>
  );
};

export default Home;
