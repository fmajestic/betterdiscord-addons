import pluginName from "pluginName";

const instance = new BdApi(pluginName);

export const {
  React,
  ReactDOM,
  Plugins,
  Themes,
  ContextMenu,
  ReactUtils,
  UI,
  Utils,
  Webpack,
  Data,
  DOM,
  Patcher,
} = instance;

export default instance;
