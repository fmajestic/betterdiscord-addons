import { BdApi } from "./api";
import { DiscordNative } from "./native";

declare global {
  const BdApi: BdApi;
  const DiscordNative: DiscordNative;

  interface Window {
    BdApi: BdApi;
    DiscordNative: DiscordNative;
  }
}
