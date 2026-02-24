import { persist } from "zustand/middleware";
import { ColorScheme, SettingsStore, ThemePreference } from "./settingsType";
import { create } from "zustand";
import { storage } from "../storage/storage";
import { settingsService } from "./settingsService";

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      appColor: 'light',
      themePreference: 'system',

      onSystemChange: (color) => {
        const updatedAppTheme = settingsService.onSystemChange(color, get().themePreference);
        if (updatedAppTheme) {
          set({ appColor: updatedAppTheme })
        }
      },
      setThemePreference: (newThemePreference: ThemePreference) => {
        const updatedAppTheme = settingsService.onThemePreferenceChange(newThemePreference)
        set({ appColor: updatedAppTheme, themePreference: newThemePreference })
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

export function useSettingsService(): Pick<SettingsStore, 'setThemePreference' | 'onSystemChange'> {

  const setThemePreference = useSettingsStore(state => state.setThemePreference);
  const onSystemChange = useSettingsStore(state => state.onSystemChange);

  return {
    setThemePreference,
    onSystemChange,
  };
}
