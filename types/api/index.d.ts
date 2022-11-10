import * as foobar from "react";
import * as reactDOM from "react-dom";

import { AddonAPI, PluginMeta, ThemeMeta } from "./Addon";
import BoundData from "./bound/Data";
import BoundDOM from "./bound/DOM";
import BoundPatcher from "./bound/Patcher";
import ContextMenu from "./ContextMenu";
import Data from "./Data";
import DOM from "./DOM";
import LegacyAPI from "./LegacyAPI";
import Patcher from "./Patcher";
import ReactUtils from "./ReactUtils";
import UI from "./UI";
import Utils from "./Utils";
import Webpack from "./Webpack";

export interface BdApi extends LegacyAPI {
  new (): BdApi;
  new (pluginName: string): BoundBdApi;

  React: typeof foobar;
  ReactDOM: typeof reactDOM;

  Plugins: AddonAPI<PluginMeta>;
  Themes: AddonAPI<ThemeMeta>;

  ContextMenu: ContextMenu;
  ReactUtils: ReactUtils;
  UI: UI;
  Utils: Utils;
  Webpack: Webpack;

  Data: Data;
  DOM: DOM;
  Patcher: Patcher;
}

export interface BoundBdApi extends Omit<BdApi, "Data" | "DOM" | "Patcher"> {
  Data: BoundData;
  DOM: BoundDOM;
  Patcher: BoundPatcher;
}
