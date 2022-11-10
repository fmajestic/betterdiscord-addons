import Data from "./Data";
import DOM from "./DOM";
import ReactUtils from "./ReactUtils";
import UI from "./UI";
import Webpack, { ModuleFilter } from "./Webpack";

/**
 * The deprecated legacy API.
 * @deprecated
 */
export default interface LegacyAPI {
  /**
   * A reference object to BetterDiscord's settings.
   * @deprecated
   */
  settings: any;

  /**
   * A reference object to BetterDiscord's emotes.
   * @deprecated
   */
  emotes: any;

  /**
   * Adds a `<style>` to the document with the given ID.
   * @param id ID to use for style element.
   * @param css CSS to apply to the document.
   * @deprecated since 1.8.0. Use {@linkcode DOM.addStyle} instead.
   */
  injectCSS: DOM["addStyle"];

  /**
   * Removes a `<style>` from the document corresponding to the given ID.
   * @param id ID used for the style element.
   * @deprecated since 1.8.0. Use {@linkcode DOM.removeStyle} instead.
   */
  clearCSS: DOM["removeStyle"];

  /**
   * Automatically creates and links a remote JS script.
   * @param id ID of the script element.
   * @param url URL of the remote script.
   * @returns Promise resolved upon onload event.
   * @deprecated
   */
  linkJS(id: string, url: string): Promise<void>;

  /**
   * Removes a remotely linked JS script.
   * @param id ID of the script element.
   * @deprecated
   */
  unlinkJS(id: string): void;

  /**
   * Shows a generic but very customizable modal.
   * @param title Title of the modal.
   * @param content Content to display in the modal.
   * @deprecated Since 1.8.0. Use {@linkcode UI.alert} instead.
   */
  alert: UI["alert"];

  /**
   * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
   * @param title Title of the modal.
   * @param content A single or mixed array of React elements and strings. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
   * @param [options] Options to modify the modal.
   * @param [options.danger] Whether the main button should be red or not.
   * @param [options.confirmText] Text for the confirmation/submit button.
   * @param [options.cancelText] Text for the cancel button.
   * @param [options.onConfirm] Callback to occur when clicking the submit button.
   * @param [options.onCancel] Callback to occur when clicking the cancel button.
   * @deprecated Since 1.8.0. Use {@linkcode UI.showConfirmationModal} instead.
   */
  showConfirmationModal: UI["showConfirmationModal"];

  /**
   * Shows a toast similar to android towards the bottom of the screen.
   * @param content The content to show in the toast.
   * @param [options] Options object. Optional parameter.
   * @param [options.type] Changes the type of the toast stylistically and semantically.
   * @param [options.icon] Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. Default: true.
   * @param [options.timeout] Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Default: 3000.
   * @param [options.forceShow] Whether to force showing the toast and ignore the BetterDiscord Setting. Default: false.
   * @deprecated Since 1.8.0. Use {@linkcode UI.showToast} instead.
   */
  showToast: UI["showToast"];

  /**
   * Show a notice above discord's chat layer.
   * @param content Content of the notice.
   * @param [options] Options for the notice
   * @param [options.type] Type for the notice. Will affect the color.
   * @param [options.buttons] Buttons that should be added next to the notice text.
   * @param [options.timeout] Timeout until the notice is closed. Won't fire if it's set to 0.
   * @deprecated Since 1.8.0. Use {@linkcode UI.showNotice} instead.
   */
  showNotice: UI["showNotice"];

  /**
   * Finds a Webpack module using a filter.
   * @param filter A filter given the exports, module, and moduleId. Returns true if the module matches.
   * @returns Either the matching module or `undefined`.
   * @deprecated Use {@link Webpack.getModule} instead.
   */
  findModule(filter: ModuleFilter): any;

  /**
   * Finds multple Webpack modules using a filter.
   * @param filter A filter given the exports, module, and moduleId. Returns true if the module matches.
   * @returns Either an array of matching modules or an empty array.
   * @deprecated Use {@link Webpack.getModule} instead.
   */
  findAllModules(filter: ModuleFilter): any[];

  /**
   * Finds a Webpack module by own properties.
   * @param props Any desired properties.
   * @returns Either the matching module or `undefined`.
   * @deprecated Use {@link Webpack.Filters} instead.
   */
  findModuleByProps: Webpack["Filters"]["byProps"];

  /**
   * Finds a Webpack module by own prototypes.
   * @param protos Any desired prototype properties.
   * @returns Either the matching module or `undefined`.
   * @deprecated Use {@link Webpack.Filters} instead.
   */
  findModuleByPrototypes: Webpack["Filters"]["byPrototypeFields"];

  /**
   * Finds a Webpack module by displayName property.
   * @param name Desired displayName property.
   * @returns Either the matching module or `undefined`.
   * @deprecated Use {@link Webpack.Filters} instead.
   */
  findModuleByDisplayName: Webpack["Filters"]["byDisplayName"];

  /**
   * Get the internal React data of a specified node.
   * @param node Node to get the React data from.
   * @returns Either the found data or `undefined`.
   * @deprecated Since 1.8.0. Use {@linkcode ReactUtils} instead.
   */
  getInternalInstance: ReactUtils["getInternalInstance"];

  /**
   * Loads previously stored data.
   * @param pluginName Name of the plugin loading data.
   * @param key Which piece of data to load.
   * @returns The stored data.
   * @deprecated Since 1.8.0. Use {@linkcode Data.load} instead.
   */
  loadData: Data["load"];

  /**
   * Loads previously stored data.
   * @param pluginName Name of the plugin loading data.
   * @param key Which piece of data to load.
   * @returns The stored data.
   * @deprecated Since 1.8.0. Use {@linkcode Data.load} instead.
   */
  getData: Data["load"];

  /**
   * Saves JSON-serializable data.
   * @param pluginName Name of the plugin saving data.
   * @param key Which piece of data to store.
   * @param data The data to be saved.
   * @deprecated Since 1.8.0. Use {@linkcode Data.save} instead.
   */
  saveData: Data["save"];

  /**
   * Saves JSON-serializable data.
   * @param pluginName Name of the plugin saving data.
   * @param key Which piece of data to store.
   * @param data The data to be saved.
   * @deprecated Since 1.8.0. Use {@linkcode Data.save} instead.
   */
  setData: Data["save"];

  /**
   * Deletes a piece of stored data, this is different than saving as null or undefined.
   * @param pluginName Name of the plugin deleting data.
   * @param key Which piece of data to delete.
   * @deprecated Since 1.8.0. Use {@linkcode Data.delete} instead.
   */
  deleteData: Data["delete"];

  /**
   * This function monkey-patches a method on an object. The patching callback may be run before, after or instead of target method.
   *  - Be careful when monkey-patching. Think not only about original functionality of target method and your changes, but also about developers of other plugins, who may also patch this method before or after you. Try to change target method behaviour as little as possible, and avoid changing method signatures.
   *  - Display name of patched method is changed, so you can see if a function has been patched (and how many times) while debugging or in the stack trace. Also, patched methods have property `__monkeyPatched` set to `true`, in case you want to check something programmatically.
   * @param what Object to be patched. You can can also pass class prototypes to patch all class instances.
   * @param methodName name of the function to be patched.
   * @param options Options object to configure the patch.
   * @param [options.after] Callback that will be called after original target method call. You can modify return value here, so it will be passed to external code which calls target method. Can be combined with `before`.
   * @param [options.before] Callback that will be called before original target method call. You can modify arguments here, so it will be passed to original method. Can be combined with `after`.
   * @param [options.instead] Callback that will be called instead of original target method call. You can get access to original method using `originalMethod` parameter if you want to call it, but you do not have to. Can't be combined with `before` or `after`.
   * @param [options.once] Set to `true` if you want to automatically unpatch method after first call.
   * @param [options.silent] Set to `true` if you want to suppress log messages about patching and unpatching.
   * @returns A function that cancels the monkey-patch.
   * @deprecated Use {@linkcode Patcher} instead.
   */
  monkeyPatch(
    what: any,
    methodName: string,
    options: {
      after?: Function;
      before?: Function;
      instead?: Function;
      once?: boolean;
      silent?: boolean;
    }
  ): () => void;

  /**
   * Adds a listener for when the node is removed from the document body.
   * @param node Node to be observed.
   * @param callback Callback function to run when fired.
   * @deprecated Since 1.8.0. Use {@linkcode DOM} instead.
   */
  onRemoved: DOM["onRemoved"];

  /**
   * Wraps a given function in a `try..catch` block.
   * @param method Function to wrap.
   * @param message Additional messasge to print when an error occurs
   * @returns The mew wrapped function.
   * @deprecated
   */
  suppressErrors(method: Function, message: string): Function;

  /**
   * Tests a given object to determine if it is valid JSON.
   * @param data Data to be tested.
   * @returns Result of the test.
   * @deprecated
   */
  testJSON(data: any): boolean;

  /**
   * Gets a specific setting's status from BetterDiscord.
   * @param collection Collection ID.
   * @param category Category ID in the collection.
   * @param id Setting ID in the category.
   * @returns If the setting is enabled.
   * @deprecated
   */
  isSettingEnabled(collection: string, category: string, id: string): boolean;

  /**
   * Gets a specific setting's status from BetterDiscord.
   * @param category Category ID in the collection `settings`.
   * @param id Setting ID in the category.
   * @returns If the setting is enabled.
   * @deprecated
   */
  isSettingEnabled(category: string, id: string): boolean;

  /**
   * Enables a BetterDiscord setting by IDs.
   * @param collection Collection ID.
   * @param category Category ID in the collection.
   * @param id Setting ID in the category.
   * @deprecated
   */
  enableSetting(collection: string, category: string, id: string): void;

  /**
   * Enables a BetterDiscord setting by IDs.
   * @param category Category ID in the collection `settings`.
   * @param id Setting ID in the category.
   * @deprecated
   */
  enableSetting(category: string, id: string): void;

  /**
   * Disables a BetterDiscord setting by IDs.
   * @param collection Collection ID.
   * @param category Category ID in the collection.
   * @param id Setting ID in the category.
   * @deprecated
   */
  disableSetting(collection: string, category: string, id: string): void;

  /**
   * Disables a BetterDiscord setting by IDs.
   * @param category Category ID in the collection `settings`.
   * @param id Setting ID in the category.
   * @deprecated
   */
  disableSetting(category: string, id: string): void;

  /**
   * Toggle a BetterDiscord setting by IDs.
   * @param collection Collection ID.
   * @param category Category ID in the collection.
   * @param id Setting ID in the category.
   * @deprecated
   */
  toggleSetting(collection: string, category: string, id: string): void;

  /**
   * Toggle a BetterDiscord setting by IDs.
   * @param category Category ID in the collection `settings`.
   * @param id Setting ID in the category.
   * @deprecated
   */
  toggleSetting(category: string, id: string): void;

  /**
   * Gets some data in BetterDiscord's misc data.
   * @param key Key of the data to load.
   * @returns The stored data.
   * @deprecated
   */
  getBDData(key: string): any;

  /**
   * Sets some data in BetterDiscord's misc data.
   * @param key Key of the data to store.
   * @param data Data to store.
   * @deprecated
   */
  setBDData(key: string, data: any): void;

  /**
   * Gives access to Electron's Dialog API. See {@link https://www.electronjs.org/docs/latest/api/dialog}.
   *
   * @param options Options object to configure the dialog.
   * @param [options.mode] Determines whether the dialog should open or save files.
   * @param [options.defaultPath] Path the dialog should show on launch.
   * @param [options.filters] An array of file filters: {@link https://www.electronjs.org/docs/latest/api/structures/file-filter}.
   * @param [options.title] Title for the titlebar.
   * @param [options.message] Message for the dialog.
   * @param [options.showOverwriteConfirmation] Whether the user should be prompted when overwriting a file.
   * @param [options.showHiddenFiles] Whether hidden files should be shown in the dialog.
   * @param [options.promptToCreate] Whether the user should be prompted to create non-existant folders.
   * @param [options.openDirectory] Whether the user should be able to select a directory as a target.
   * @param [options.openFile] Whether the user should be able to select a file as a target.
   * @param [options.multiSelections] Whether the user should be able to select multiple targets.
   * @param [options.modal] Whether the dialog should act as a modal to the main window.
   * @returns A `Promise` that resolves to an `object` that has a `boolean` cancelled and a `filePath` string for saving and a `filePaths` string array for opening.
   * @deprecated Since 1.8.0. Use {@linkcode UI.openDialog} instead.
   */
  openDialog: UI["openDialog"];
}
