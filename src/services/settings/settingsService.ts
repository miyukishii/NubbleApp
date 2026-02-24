import { Appearance, ColorSchemeName, Platform, StatusBar } from "react-native";
import { ColorScheme, ThemePreference } from "./settingsType";
import { colors } from "../../theme/colors";

function onThemePreferenceChange(themePreference: ThemePreference): ColorScheme {
  if (themePreference === 'system') {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme && colorScheme !== 'unspecified') {
      return colorScheme
    } else {
      return 'light'
    }
  }
  return themePreference
}

function onSystemChange(color: ColorSchemeName, themePreference: ThemePreference): ColorScheme | null {
  if (themePreference === 'system') {
    if (color && color !== 'unspecified') {
      return color
    } else {
      return 'light'
    }
  }
  return null
}

function handleStatusBar(appColor: ColorScheme) {
  StatusBar.setBarStyle(appColor === 'dark' ? 'light-content' : 'dark-content', true);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(appColor === 'dark' ? colors.palette.grayBlack : colors.palette.grayWhite)
  }
}

export const settingsService = {
  onThemePreferenceChange,
  onSystemChange,
  handleStatusBar
}
