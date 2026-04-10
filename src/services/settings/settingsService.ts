import { Appearance, ColorSchemeName, Platform, StatusBar } from "react-native";
import { hide, isVisible } from 'react-native-bootsplash'

import { colors } from "../../theme/colors";

import { ColorScheme, ThemePreference } from "./settingsType";

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

function hideSplashScreen() {
  try {
    const _isVisible = isVisible()
    if (_isVisible) {
      hide({ fade: true })
    }
  }catch (err) {
    console.log('Erro ao chamar hideSpashScreen:', err)
    hide()
  }
}

export const settingsService = {
  onThemePreferenceChange,
  onSystemChange,
  handleStatusBar,
  hideSplashScreen
}
