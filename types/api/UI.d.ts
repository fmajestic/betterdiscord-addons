import type { ReactNode } from "react";
import type { TooltipOptions, Tooltip } from "./Tooltip";

export interface DialogResult {
  canceled: boolean;
  filePath?: string;
  filePaths?: string[];
}

export default interface UI {
  /**
   * Shows a generic but very customizable modal.
   *
   * @param title Title of the modal.
   * @param content Content to display in the modal.
   */
  alert(title: string, content: React.ReactNode): void;

  /**
   * Creates a tooltip to automatically show on hover.
   *
   * @param node - DOM node to monitor and show the tooltip on
   * @param content - string to show in the tooltip
   * @param options - additional options for the tooltip
   * @returns the tooltip that was generated
   */
  createTooltip(node: HTMLElement, content: string | HTMLElement, options?: TooltipOptions): Tooltip;

  /**
   * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
   *
   * @param title title of the modal
   * @param content The modal content. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
   * @param options options to modify the modal
   */
  showConfirmationModal(
    title: string,
    content: ReactNode,
    options?: {
      /** whether the main button should be red or not. Default: `false */
      danger?: boolean;
      /** text for the confirmation/submit button. Default: `Okay` */
      confirmText?: string;
      /** text for the cancel button. Default: `Cancel`*/
      cancelText?: string;
      /** callback to occur when clicking the submit button. */
      onConfirm?: () => void;
      /** callback to occur when clicking the cancel button */
      onCancel?: () => void;
    }
  ): any;

  /**
   * Shows a toast similar to android towards the bottom of the screen.
   *
   * @param content The content to show in the toast.
   * @param options Options object. Optional parameter.
   */
  showToast(
    content: string,
    options?: {
      /** Changes the type of the toast stylistically and semantically */
      type?: "info" | "success" | "error" | "warning";
      /** Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. Default: `true` */
      icon?: boolean;
      /** Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Default: `3000` */
      timeout?: number;
      /** Whether to force showing the toast and ignore the BetterDiscord Setting. Default: `false` */
      forceShow?: boolean;
    }
  ): void;

  /**
   * Show a notice above discord's chat layer.
   *
   * @param content Content of the notice.
   * @param options Options for the notice
   */
  showNotice(
    content: string | Node,
    options?: {
      /** Type for the notice. Will affect the color. */
      type?: "info" | "success" | "error" | "warning";
      /** Buttons that should be added next to the notice text. */
      buttons?: {
        /** Button text */
        label: string;
        /** Click handler */
        onClick: (immediately?: boolean) => void;
      }[];
      /** Timeout until the notice is closed. Won't fire if it's set to 0. */
      timeout?: number;
    }
  ): void;

  /**
   * Gives access to the [Electron Dialog](https://www.electronjs.org/docs/latest/api/dialog/) api.
   * Returns a `Promise` that resolves to an `object` that has a `boolean` cancelled
   * and a `filePath` string for saving and a `filePaths` string array for opening.
   *
   * @param options Options object to configure the dialog.
   * @returns Result of the dialog
   */
  openDialog(options: {
    /** Determines whether the dialog should open or save files. Default: `open` */
    mode?: "open" | "save";
    /** Path the dialog should show on launch. Default: `~` */
    defaultPath?: string;
    /** An array of [file filters](https://www.electronjs.org/docs/latest/api/structures/file-filter). Default: `[]` */
    filters?: Record<string, string[]>[];
    /** Title for the titlebar. */
    title?: string;
    /** Message for the dialog. */
    message?: string;
    /** Whether the user should be prompted when overwriting a file. Default: `false` */
    showOverwriteConfirmation?: boolean;
    /** Whether hidden files should be shown in the dialog. Default: `false` */
    showHiddenFiles?: boolean;
    /** Whether the user should be prompted to create non-existant folders. Default: `false` */
    promptToCreate?: boolean;
    /** Whether the user should be able to select a directory as a target. Default: `false` */
    openDirectory?: boolean;
    /** Whether the user should be able to select a file as a target. Default: `true` */
    openFile?: boolean;
    /** Whether the user should be able to select multiple targets. Default: `false` */
    multiSelections?: boolean;
    /** Whether the dialog should act as a modal to the main window. Default: `false` */
    modal?: boolean;
  }): Promise<DialogResult>;
}
