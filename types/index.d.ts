import react = require("react");

interface DiscordNative {
  clipboard: {
    copy(text: string): void;
  };
}

declare global {
  const React: typeof react;
  const DiscordNative: DiscordNative;

  interface Window {
    React: typeof react;
    DiscordNative: DiscordNative;
  }
}

export interface PluginConfig {
  name: string;
  author: string;
  description: string;
  version: string;
  invite?: string;
  authorId?: number;
  authorLink?: string;
  donate?: string;
  patreon?: string;
  website?: string;
  source?: string;
  [key: string]: any;
}
