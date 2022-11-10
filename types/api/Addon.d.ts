export type AddonMeta = {
  // Provided by addon metadata
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

  // Provided by AddonManager
  id: string;
  slug: string;
  filename: string;
  added: number;
  modified: number;
  size: number;
  fileContent: string;
};

export interface PluginMeta extends Omit<AddonMeta, 'fileContent'> {
  format: "jsdoc" | "json";
}

export interface ThemeMeta extends Omit<AddonMeta, 'fileContent'> {
  css: string;
}

export interface AddonAPI<T> {
  /**
   * The path to the addon folder.
   */
  folder: string;

  /**
   * Determines if a particular addon is enabled.
   * @param idOrFile Addon ID or filename.
   * @returns Whether the addon is enabled.
   */
  isEnabled(idOrFile: string): boolean;

  /**
   * Enables the given addon.
   * @param idOrFile Addon ID or filename.
   */
  enable(idOrFile: string): void;

  /**
   * Disables the given addon.
   * @param idOrFile Addon ID or filename.
   */
  disable(idOrFile: string): void;

  /**
   * Toggles the given addon.
   * @param idOrFile Addon ID or filename.
   */
  toggle(idOrFile: string): void;

  /**
   * Reloads the given addon.
   * @param idOrFile Addon ID or filename.
   */
  reload(idOrFile: string): void;

  /**
   * Gets a particular addon.
   * @param idOrFile Addon ID or filename.
   * @returns Addon instance.
   */
  get(idOrFile: string): T;

  /**
   * Gets all addons of this type.
   * @returns Array of all addon instances.
   */
  getAll(): T[];
}
