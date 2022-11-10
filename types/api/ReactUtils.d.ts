import * as React from "react";

/**
 * `ReactUtils` is a utility class for interacting with React internals.
 * Instance is accessible through the {@linkcode BdApi}.
 * This is extremely useful for interacting with the internals of the UI.
 */
interface ReactUtils {
  get rootInstance(): typeof React;

  /**
   * Gets the internal react data of a specified node
   *
   * @param node Node to get the react data from
   * @returns Either the found data or `undefined`
   */
  getInternalInstance(node: HTMLElement): object | undefined;

  /**
   * Attempts to find the "owner" node to the current node. This is generally
   * a node with a stateNode--a class component.
   * @param node node to obtain react instance of
   * @param options - options for the search
   * @return the owner instance or undefined if not found.
   */
  getOwnerInstance(
    node: HTMLElement,
    options?: {
      /** list of items to include from the search */
      include?: string[];
      /** list of items to exclude from the search. Default: `[options.exclude=["Popout", "Tooltip", "Scroller", "BackgroundFlash"]` */
      exclude?: string[];
      /** filter to check the current instance with (should return a boolean). Default: `_ => _` */
      filter?: (currentInstance: React.ElementType) => boolean;
    }
  ): React.Component | undefined;

  /**
   * Creates an unrendered react component that wraps dom elements.
   * @param element - element or array of elements to wrap into a react component
   * @returns unrendered react component
   */
  wrapElement(element: HTMLElement): React.Component;
}

export default ReactUtils;
