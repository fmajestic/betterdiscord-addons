export type ModuleFilter = (exports: any, module?: any, moduleId?: string) => boolean;

/**
 * Series of Filters to be used for finding Webpack modules.
 */
export interface Filters {
  /**
   * Generates a function that filters by a set of properties.
   *
   * @param props List of property names.
   * @returns A filter that checks for a set of properties.
   */
  byProps(...props: string[]): ModuleFilter;

  /**
   * Generates a function that filters by a set of properties on the object's prototype.
   *
   * @param props List of property names.
   * @returns A filter that checks for a set of properties on the object's prototype.
   */
  byPrototypeFields(...props: string[]): ModuleFilter;

  /**
   * Generates a function that filters by a regex.
   *
   * @param regex A RegExp to check on the module.
   * @returns A filter that checks for a regex match.
   */
  byRegex(regex: RegExp): ModuleFilter;

  /**
   * Generates a function that filters by strings.
   *
   * @param strings A list of strings.
   * @returns {function} A filter that checks for a set of strings.
   */
  byStrings(...strings: string[]): ModuleFilter;

  /**
   * Generates a function that filters by a name.
   *
   * @param name Name the module should have.
   * @returns A filter that checks for a name.
   */
  byDisplayName(name: string): ModuleFilter;

  /**
   * Generates a combined function from a list of filters.
   *
   * @param filters A list of filters.
   * @returns Combinatory filter of all arguments.
   */
  combine(...filters: ModuleFilter[]): ModuleFilter;
}

export interface QueryOptions {
  /** Whether to return only the first matching module. */
  first?: boolean;

  /** Whether to return default export when matching the default export. */
  defaultExport?: boolean;

  /** Whether to execute the filter on webpack export getters. */
  searchExports?: boolean;
}

export interface BulkQueryOptions extends QueryOptions {
  /** A function to use to filter modules */
  filter: ModuleFilter;
}

/**
 * `Webpack` is a utility class for getting internal Webpack modules.
 * This is extremely useful for interacting with the internals of Discord.
 */
export default interface Webpack {
  Filters: Filters;

  /**
   * Finds a module using a filter function.
   *
   * @param filter A function to use to filter modules.s
   * @param options Set of options to customize the search.
   * @return The found module.
   */
  getModule(filter: ModuleFilter, options?: QueryOptions): any;

  /**
   * Finds multiple modules using multiple filters.
   *
   * @param queries Whether to return only the first matching module.
   * @return The found modules.
   */
  getBulk(...queries: BulkQueryOptions[]): any[];

  /**
   * Finds a module that lazily loaded.
   *
   * @param filter A function to use to filter module.
   * @param options Set of options to customize the search.
   * @returns A promise that resolves to the found module.
   */
  waitForModule(
    filter: ModuleFilter,
    options?: {
      /** AbortSignal of an AbortController to cancel the promise */
      signal?: AbortSignal;
      /** Whether to return default export when matching the default export */
      defaultExport?: boolean;
      /** Whether to execute the filter on webpack exports */
      searchExports?: boolean;
    }
  ): Promise<any>;
}
