import React from "react";

import { AppLanguage } from "#/locale/languages";
import * as persisted from "#/state/persisted";

type SetStateCb = (
  s: persisted.Schema["languagePrefs"]
) => persisted.Schema["languagePrefs"];
type StateContext = persisted.Schema["languagePrefs"];
type ApiContext = {
  setPrimaryLanguage: (code2: string) => void;
  setAppLanguage: (code2: AppLanguage) => void;
};

const stateContext = React.createContext<StateContext>(
  persisted.defaults.languagePrefs
);
const apiContext = React.createContext<ApiContext>({
  setPrimaryLanguage: (_: string) => {},
  setAppLanguage: (_: AppLanguage) => {},
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(persisted.get("languagePrefs"));

  const setStateWrapped = React.useCallback(
    (fn: SetStateCb) => {
      const s = fn(persisted.get("languagePrefs"));
      setState(s);
      persisted.write("languagePrefs", s);
    },
    [setState]
  );

  React.useEffect(() => {
    return persisted.onUpdate(() => {
      setState(persisted.get("languagePrefs"));
    });
  }, [setStateWrapped]);

  const api = React.useMemo(
    () => ({
      setPrimaryLanguage(code2: string) {
        setStateWrapped((s) => ({ ...s, primaryLanguage: code2 }));
      },
      setAppLanguage(code2: AppLanguage) {
        setStateWrapped((s) => ({ ...s, appLanguage: code2 }));
      },
    }),
    [state, setStateWrapped]
  );

  return (
    <stateContext.Provider value={state}>
      <apiContext.Provider value={api}>{children}</apiContext.Provider>
    </stateContext.Provider>
  );
}

export function useLanguagePrefs() {
  return React.useContext(stateContext);
}

export function useLanguagePrefsApi() {
  return React.useContext(apiContext);
}

export function toPostLanguages(postLanguage: string): string[] {
  // filter out empty strings if exist
  return postLanguage.split(",").filter(Boolean);
}

export function hasPostLanguage(postLanguage: string, code2: string): boolean {
  return toPostLanguages(postLanguage).includes(code2);
}
