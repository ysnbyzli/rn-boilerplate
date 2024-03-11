import { z } from "zod";
import { deviceLocales } from "#/platform/detection";

const externalEmbedOptions = ["show", "hide"] as const;

// only data needed for rendering account page
const accountSchema = z.object({
  email: z.string().optional(),
});
export type PersistedAccount = z.infer<typeof accountSchema>;

export const schema = z.object({
  colorMode: z.enum(["system", "light", "dark"]),
  darkTheme: z.enum(["dim", "dark"]).optional(),
  session: accountSchema.optional(),
  languagePrefs: z.object({
    primaryLanguage: z.string(),
    appLanguage: z.string(),
  }),
  onboarding: z.object({
    step: z.string(),
  }),
});
export type Schema = z.infer<typeof schema>;

export const defaults: Schema = {
  colorMode: "system",
  darkTheme: "dim",
  session: undefined,
  languagePrefs: {
    primaryLanguage: deviceLocales[0] || "en",
    appLanguage: deviceLocales[0] || "en",
  },
  onboarding: {
    step: "Home",
  },
};
