import { atoms } from "#/alf";
import { useColorModeTheme } from "#/alf/util/userColorModeTheme";
import { H2, H4, P } from "#/components/Typography";
import { deviceLocales, devicePlatform } from "#/platform/detection";
import { View } from "react-native";
import * as persisted from "#/state/persisted";

const Home = () => {
  const theme = useColorModeTheme();

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
        <H4>Device Locales:</H4>
        <P>{deviceLocales}</P>
      </View>
      <View style={[atoms.flex_row, atoms.gap_lg, atoms.align_center]}>
        <H4>Selected Locale:</H4>
        <P>{persisted.get("languagePrefs").primaryLanguage}</P>
      </View>
    </View>
  );
};

export default Home;
