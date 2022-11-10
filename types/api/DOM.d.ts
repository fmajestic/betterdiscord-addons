export default interface DOM {
  /** Current width of the user's screen. */
  get screenWidth(): number;

  /** Current height of the user's screen. */
  get screenHeight(): number;

  /**
   * Adds a listener for when the node is removed from the document body.
   * @param node Node to be observed.
   * @param callback Callback function to run when fired.
   */
  onRemoved(node: HTMLElement, callback: () => void): void;

  /**
   * Adds a `<style>` to the document with the given ID.
   *
   * @param {string} id ID to use for style element
   * @param {string} css CSS to apply to the document
   */
  addStyle(id: string, css: string): void;

  /**
   * Removes a `<style>` from the document corresponding to the given ID.
   *
   * @param {string} id ID used for the style element
   */
  removeStyle(id: string): void;


  /**
   * Utility to help smoothly animate using JavaScript
   *
   * @param update render function indicating the style should be updated
   * @param duration duration in ms to animate for
   * @param options options to customize the animation
   */
  animate<T = number>(
    update: (progress: T) => void,
    duration: number,
    options: {
      /** Custom function to transform the delta time */
      timing?: (dt: number) => T;
    }
  ): void;

  /**
   * Utility function to make creating DOM elements easier. Acts similarly
   * to `React.createElement`
   *
   * @param tag HTML tag name to create
   * @param options options object to customize the element
   * @param child child node to add
   * @returns The created element
   */
  createElement(
    tag: string,
    options?: {
      /** Class name(s) to add to the element */
      className?: string;
      /** Id to set for the element */
      id?: string;
      /** Target element to automatically append to */
      target?: HTMLElement;
    },
    child?: HTMLElement
  ): HTMLElement;

  /**
   * Parses a string of HTML and returns the results. If the second parameter is true,
   * the parsed HTML will be returned as a document fragment {@see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment}.
   * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
   *
   * If the second parameter is false, then the return value will be the list of parsed
   * nodes and there were multiple top level nodes, otherwise the single node is returned.
   * @param html - HTML to be parsed
   * @param [fragment=false] - Whether or not the return should be the raw `DocumentFragment`
   * @returns - The result of HTML parsing
   */
  parseHTML(html: string, fragment?: boolean): DocumentFragment | NodeList | HTMLElement;

}
