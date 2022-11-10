import type * as React from "react";
import { ReactNode } from "react";

/**
 * Base menu item component.
 *
 * The type parameter `T` is necessary for {@linkcode render} to be typed correctly.
 */
interface BaseMenuItemProps<T> {
  /**
   * ID of the item, unique to this menu.
   *
   * Computed from the label if not provided.
   * If there is more than one item with the same label, issues with hover effects can occur.
   */
  id?: string;

  /** Item text */
  label: string;

  /** Hint to show on the right hand side */
  hint?: string;

  /** Description to show underneath */
  subtext?: string;

  /** URL of an image to show on the side */
  image?: ReactNode;

  /** Component to render on the side */
  icon?: ReactNode;

  /** Show as danger (red) */
  danger?: boolean;

  /** Mark disabled (not clickable) */
  disabled?: boolean;

  /** Function to run on click */
  onClick?: (event: React.MouseEvent) => void;

  // Alias of onClick, omitted for consistency
  // action?: (event: React.MouseEvent) => void;

  /** Function to run when the menu closes */
  onClose?: () => void;

  /** Prevent closing on click */
  closeOnClick?: boolean;

  /** Custom style */
  style?: React.CSSProperties;

  /** Custom render function */
  render?: React.FunctionComponent<T>;
}

/**
 * Basic text item.
 */
interface MenuTextItemProps extends BaseMenuItemProps<MenuTextItemProps> {
  type: "text";
}

/**
 * Custom control item.
 *
 * Used to render custom controls like sliders, etc.
 */
interface MenuControlItemProps extends BaseMenuItemProps<MenuControlItemProps> {
  type: "control";

  /** Function that renders the control */
  control: React.FunctionComponent<MenuControlItemProps>;
}

/**
 * Base class for "toggleable" items.
 */
interface CheckedMenuItemProps extends Omit<BaseMenuItemProps<CheckedMenuItemProps>, "onClick"> {
  /** Is the item checked (selected/toggled) */
  checked?: boolean;
}

/**
 * Checkbox/toggle item.
 */
interface MenuToggleItemProps extends CheckedMenuItemProps {
  type: "toggle";
}

/**
 * Radio button item.
 *
 * Note: without the {@linkcode forceUpdate} option enabled, you will need to manually
 * manage the component's state. If you do not, the toggle will appear to not update.
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 */
interface MenuRadioItemProps extends CheckedMenuItemProps {
  type: "radio";

  /** Should the component force-update when selected */
  forceUpdate?: boolean;
}

interface MenuSubmenuItemProps {
  type: "submenu";

  /** Child menu items to render */
  items?: MenuItemProps[];

  /**
   * React component(s) to render.
   * Overrides the {@linkcode items} config.
   */
  children?: ReactNode;
}

interface MenuSeparatorItemProps {
  type: "separator";
}

export type MenuItemProps =
  | MenuTextItemProps
  | MenuControlItemProps
  | MenuToggleItemProps
  | MenuRadioItemProps
  | MenuSubmenuItemProps
  | MenuSeparatorItemProps;

export type MenuComponent = React.ComponentType<MenuItemProps>;

export class MenuComponents {
  static Separator: MenuComponent;
  static Item: MenuComponent;
  static CheckboxItem: MenuComponent;
  static RadioItem: MenuComponent;
  static ControlItem: MenuComponent;
  static Group: MenuComponent;
}

/**
 * `ContextMenu` is a module to help patch and create context menus. Instance is accessible through the {@link BdApi}.
 */
export default class ContextMenu {
  /**
   * Allows you to patch a given context menu. Acts as a wrapper around the `Patcher`.
   *
   * @param {string} navId Discord's internal navId used to identify context menus
   * @param {function} callback callback function that accepts the react render tree
   * @returns {function} a function that automatically unpatches
   */
  static patch<T>(navId: string, callback: (res: React.ComponentType<T>, props: T) => void): void;

  /**
   * Allows you to remove the patch added to a given context menu.
   *
   * @param {string} navId the original navId from patching
   * @param {function} callback the original callback from patching
   */
  static unpatch<T>(navId: string, callback: (res: React.ComponentType<T>, props: T) => void): void;

  /**
   * Builds a single menu item. The only prop shown here is the type, the rest should
   * match the actual component being built. View those to see what options exist
   * for each, they often have less in common than you might think.
   *
   * @param {MenuItemProps} props - props used to build the item
   * @param {string} [props.type="text"] - type of the item, options: text, submenu, toggle, radio, custom, separator
   * @returns {MenuComponent} the created component
   *
   * @example
   * // Creates a single menu item that prints "MENU ITEM" on click
   * ContextMenu.buildItem({
   *      label: "Menu Item",
   *      onClick: () => {console.log("MENU ITEM");}
   * });
   *
   * @example
   * // Creates a single toggle item that starts unchecked
   * // and print the new value on every toggle
   * ContextMenu.buildItem({
   *      type: "toggle",
   *      label: "Item Toggle",
   *      checked: false,
   *      onClick: (event) => {console.log(event.target.value);}
   * });
   */
  static buildItem(props: MenuItemProps): MenuComponent;

  /**
   * Creates the all the items **and groups** of a context menu recursively.
   * There is no hard limit to the number of groups within groups or number
   * of items in a menu.
   *
   * @param setup - array of item props used to build items. See {@link ContextMenu.buildItem}
   * @returns array of the created component
   *
   * @example
   * // Creates a single item group item with a toggle item
   * ContextMenu.buildMenuChildren([{
   *      type: "submenu",
   *      items: [{
   *          type: "toggle",
   *          label: "Item Toggle",
   *          active: false,
   *          onClick: (event) => {console.log(event);}
   *      }]
   * }]);
   *
   * @example
   * // Creates two item groups with a single toggle item each
   * ContextMenu.buildMenuChildren([{
   *     type: "submenu",
   *     items: [{
   *         type: "toggle",
   *         label: "Item Toggle",
   *         active: false,
   *         onClick: (event) => {
   *             console.log(event);
   *         }
   *     }]
   * }, {
   *     type: "submenu",
   *     items: [{
   *         type: "toggle",
   *         label: "Item Toggle",
   *         active: false,
   *         onClick: (event) => {
   *             console.log(event);
   *         }
   *     }]
   * }]);
   */
  static buildMenuChildren(setup: MenuItemProps[]): MenuComponent[];

  /**
   * Creates the menu *component* including the wrapping `ContextMenu`.
   * Calls {@link ContextMenu.buildMenuChildren} under the covers.
   * Used in combination with {@link ContextMenu.open}.
   *
   * @param setup - array of item props used to build items. See {@link ContextMenu.buildMenuChildren}
   * @returns the unique context menu component
   */
  buildMenu(setup: MenuItemProps[]): React.ComponentType;

  /**
   * Function that allows you to open an entire context menu. Recommended to build the menu with this module.
   *
   * @param event - The context menu event. This can be emulated, requires target, and all X, Y locations.
   * @param menuComponent - Component to render. This can be any react component or output of {@link ContextMenu.buildMenu}
   * @param config - Configuration/props for the context menu
   */
  open(
    event: React.MouseEvent,
    menuComponent: React.ReactNode,
    config?: {
      /** Position for the menu, default: right */
      position?: "left" | "right";

      /** Alignment for the menu, default: top */
      align?: "top" | "bottom";

      /** Function to run when the menu is closed */
      onClose?: () => void;

      /** No clue */
      noBlurEvent?: false;
    }
  ): void;

  /**
   * Closes the current opened context menu immediately.
   */
  close(): void;
}
