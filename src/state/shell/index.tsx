import React from "react";
import { Provider as ColorModeProvider } from "./color-mode";

export { useThemePrefs, useSetThemePrefs } from "./color-mode";

export function Provider({ children }: React.PropsWithChildren<{}>) {
  return <ColorModeProvider>{children}</ColorModeProvider>;
}
