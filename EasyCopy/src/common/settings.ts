import { useDataKey } from "./data";

export interface Settings {
  version: number;
  highlight: "none" | "outline" | "full";
  patterns: string[];
}

const SETTINGS_VERSION = 1;

export const defaultSettings: Settings = {
  version: SETTINGS_VERSION,
  highlight: "outline",
  patterns: [],
};

export function useSettings() {
  const [loadSettings, saveSettings] = useDataKey<Settings>("settings");

  let settings = loadSettings();

  if (!settings || settings.version < SETTINGS_VERSION) {
    // TODO: this keeps removed settings
    //       also, mabye a way to specify renamed settings
    saveSettings(
      (settings = {
        ...defaultSettings,
        ...settings,
        version: SETTINGS_VERSION,
      })
    );
  }

  return [settings, loadSettings, saveSettings] as const;
}
