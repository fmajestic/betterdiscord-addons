/**
 * `Utils` is a utility containing commonly reused functions.
 * Instance is accessible through the {@link BdApi}.
 */
export default interface Utils {
  /**
   * Finds a value, subobject, or array from a tree that matches a specific filter. This is a DFS.
   *
   * @param tree Tree that should be walked
   * @param searchFilter Filter to check against each object and subobject
   * @param options Additional options to customize the search
   */
  findInTree(
    tree: any,
    searchFilter: (node: any) => boolean,
    options?: {
      /** Array of strings to use as keys that are allowed to be walked on. Null value indicates all keys are walkable */
      walkable?: string[];
      /** Array of strings to use as keys to exclude from the search, most helpful when `walkable = null`. */
      ignore?: string[];
    }
  ): any;

  /**
   * Deep extends an object with a set of other objects. Objects later in the list
   * of `extenders` have priority, that is to say if one sets a key to be a primitive,
   * it will be overwritten with the next one with the same key. If it is an object,
   * and the keys match, the object is extended. This happens recursively.
   *
   * @param extendee - Object to be extended
   * @param extenders - Objects to extend with
   * @returns - A reference to `extendee`
   */
  // TODO: This is an extremely cursed type
  //       See if we can use the Parameters infer trick + some nested merging type from the internet,
  //       or write a bunch of overloads for 1..n arguments
  extend<T>(extendee: T, ...extenders: any[]): T & Record<any, any>;

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds.
   *
   * Adapted from the version by David Walsh (https://davidwalsh.name/javascript-debounce-function)
   *
   * @param executor - The function to debounce
   * @param delay - The delay until the function fires
   */
  debounce<T extends (...args: any) => any>(executor: T, delay: number): (...args: Parameters<T>) => void;

  /**
   * Takes a string of html and escapes it using the brower's own escaping mechanism.
   *
   * @param html - html to be escaped
   */
  escapeHTML(html: string): string;

  /**
   * Builds a classname string from any number of arguments. This includes arrays and objects.
   * When given an array all values from the array are added to the list.
   * When given an object they keys are added as the classnames if the value is truthy.
   *
   * Copyright (c) 2018 Jed Watson https://github.com/JedWatson/classnames MIT License
   *
   * @param argument - anything that should be used to add classnames.
   */
  className(...argument: any[]): string;
}
