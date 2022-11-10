/**
 * `Data` is a simple utility class for the management of plugin data. An instance is available on {@link BdApi}.
 */
export default interface Data {
  /**
   * Loads previously stored data.
   * @param pluginName Name of the plugin loading data.
   * @param key Which piece of data to load.
   * @returns The stored data.
   */
  load(pluginName: string, key: string): any;

  /**
   * Saves JSON-serializable data.
   * @param pluginName Name of the plugin saving data.
   * @param key Which piece of data to store.
   * @param data The data to be saved.
   */
  save(pluginName: string, key: string, data: any): void;

  /**
   * Deletes a piece of stored data, this is different than saving as null or undefined.
   * @param pluginName Name of the plugin deleting data.
   * @param key Which piece of data to delete.
   */
  delete(pluginName: string, key: string): void;
}
