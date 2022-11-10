import Data from '../Data';

/**
 * Bound instance of {@linkcode Data}.
 */
export default interface BoundData {
  new(pluginName: string);

  /**
   * Loads previously stored data.
   * @param key Which piece of data to load.
   * @returns The stored data.
   */
  load(key: string): any;

  /**
   * Saves JSON-serializable data.
   * @param key Which piece of data to store.
   * @param data The data to be saved.
   */
  save(key: string, data: any): void;

  /**
   * Deletes a piece of stored data, this is different than saving as null or undefined.
   * @param key Which piece of data to delete.
   */
  delete(key: string): void;
}
