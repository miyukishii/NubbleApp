import { ColorSchemeName } from "react-native";

export type ColorScheme = 'light' | 'dark';

export type ThemePreference = ColorScheme | 'system';

export type SettingsStore = {
  appColor: ColorScheme;
  themePreference: ThemePreference;
  setThemePreference: (themePreference: ThemePreference) => void;
  onSystemChange: (color: ColorSchemeName) => void
  showOnboarding: boolean;
  finishOnboarding: () => void;
}
