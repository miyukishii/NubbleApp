import { create } from "zustand";
import { persist } from "zustand/middleware";

import { storage } from "../storage/storage";

import { settingsService } from "./settingsService";
import { ColorScheme, SettingsStore, ThemePreference } from "./settingsType";

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      appColor: 'light',
      themePreference: 'system',
      showOnboarding: true,

      onSystemChange: (color) => {
        const updatedAppTheme = settingsService.onSystemChange(color, get().themePreference);
        if (updatedAppTheme) {
          set({ appColor: updatedAppTheme })
        }
      },
      setThemePreference: (newThemePreference: ThemePreference) => {
        const updatedAppTheme = settingsService.onThemePreferenceChange(newThemePreference)
        set({ appColor: updatedAppTheme, themePreference: newThemePreference })
      },
      finishOnboarding: () => {
        set({ showOnboarding: false })
      }
    }),
    {
      name: '@Settings',
      storage: storage,
    }
  )
);

export function useAppColor(): ColorScheme {
  return useSettingsStore(state => state.appColor);
}

export function useThemePreference(): ThemePreference {
  return useSettingsStore(state => state.themePreference);
}

export function useOnboarding(): Pick<SettingsStore, 'showOnboarding'> {
  const showOnboarding = useSettingsStore(state => state.showOnboarding);
  return {
    showOnboarding,
  };
}

export function useSettingsService(): Pick<SettingsStore, 'setThemePreference' | 'onSystemChange' | 'finishOnboarding'> {
  const setThemePreference = useSettingsStore(state => state.setThemePreference);
  const onSystemChange = useSettingsStore(state => state.onSystemChange);
  const finishOnboarding = useSettingsStore(state => state.finishOnboarding);
  return {
    setThemePreference,
    onSystemChange, finishOnboarding,
  };
}
