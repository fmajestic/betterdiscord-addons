import Patcher from '../Patcher';

/**
 * Bound instance of {@linkcode Patcher}
 */
export default interface BoundPatcher {
  /**
   * This method patches onto another function, allowing your code to run beforehand.
   * Using this, you are also able to modify the incoming arguments before the original method is run.
   * @param module Object with the function to be patched. Can also be an object's prototype.
   * @param method Name of the function to be patched.
   * @param callback Function to run before the original method. The function is given the `this` context and the `arguments` of the original function.
   * @returns Function that cancels the original patch.
   */
  before(
    module: object,
    method: string,
    callback: (thisContext: any, arguments: any) => void
  ): () => void;

  /**
   * This method patches onto another function, allowing your code to run instead.
   * Using this, you are also able to modify the return value, using the return of your code instead.
   * @param module Object with the function to be patched. Can also be an object's prototype.
   * @param method Name of the function to be patched.
   * @param callback Function to run before the original method. The function is given the `this` context, `arguments` of the original function, and also the original function.
   * @returns Function that cancels the original patch.
   */
  instead(
    module: object,
    method: string,
    callback: (thisContext: any, arguments: any, originalFunction: Function) => void
  ): () => void;

  /**
   * This method patches onto another function, allowing your code to run after.
   * Using this, you are also able to modify the return value.
   * @param module Object with the function to be patched. Can also be an object's prototype.
   * @param method Name of the function to be patched.
   * @param callback callback Function to run after the original method. The function is given the `this` context, the `arguments` of the original function, and the `return` value of the original function.
   * @returns Function that cancels the original patch.
   */
  after(
    module: object,
    method: string,
    callback: (thisContext: any, arguments: any[], returnValue: any) => void
  ): () => void;

  /**
   * Returns all patches by a particular caller. The patches all have an `unpatch()` method.
   * @returns Array of all the patch objects.
   */
  getPatchesByCaller(): Array<Function>;

  /**
   * Automatically cancels all patches created with a specific ID.
   */
  unpatchAll(): void;
}
