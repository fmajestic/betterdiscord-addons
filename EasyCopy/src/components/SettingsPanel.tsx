import {ChangeEvent, useState} from "react";

import {Settings} from "../common/settings";
import InputField from "./InputField";

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (next: Settings) => void;
}

export default function SettingsPanel({settings, setSettings}: SettingsPanelProps) {
  const [patternsString, setPatternsString] = useState(settings.patterns.map(p => p.toString()).join("\n"));

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPatternsString(e.target.value);
    setSettings({...settings, patterns: e.target.value.split("\n")});
  }

  return (
    <form className="ec-settings">
      <InputField
        name="patterns"
        type="textarea"
        value={patternsString}
        onChange={onChange}
        label="Patterns"
        hint="one per line, supports JavaScript /regular expressions/g"
        rows={5}
      />
    </form>
  );
}
