export interface TooltipOptions {
  /** Default: `primary` */
  style?: "primary" | "info" | "success" | "warn" | "danger";
  /** Default: `top` */
  side?: "top" | "right" | "bottom" | "left";
  /** Prevents moving the tooltip to the opposite side if it is too big or goes offscreen */
  preventFlip?: boolean;
  /** Whether the tooltip should be disabled from showing on hover */
  disabled?: boolean;
}

export class Tooltip {
  /**
   * @param node - DOM node to monitor and show the tooltip on
   * @param text - string to show in the tooltip
   * @param options - additional options for the tooltip
  */
  constructor(node: HTMLElement, text: string | HTMLElement, options?: TooltipOptions);

  /**
   * Alias for the constructor.
   */
  static create(node: HTMLElement, text: string | HTMLElement, options?: TooltipOptions): Tooltip;

  /** Container where the tooltip will be appended. */
  get container(): HTMLElement;

  /** Boolean representing if the tooltip will fit on screen above the element */
  get canShowAbove(): boolean;

  /** Boolean representing if the tooltip will fit on screen below the element */
  get canShowBelow(): boolean;

  /** Boolean representing if the tooltip will fit on screen to the left of the element */
  get canShowLeft(): boolean;

  /** Boolean representing if the tooltip will fit on screen to the right of the element */
  get canShowRight(): boolean;

  /** Hides the tooltip. Automatically called on mouseleave. */
  hide(): void;

  /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
  show(): void;

  /** Force showing the tooltip above the node. */
  showAbove(): void;

  /** Force showing the tooltip below the node. */
  showBelow(): void;

  /** Force showing the tooltip to the left of the node. */
  showLeft(): void;

  /** Force showing the tooltip to the right of the node. */
  showRight(): void;

  /** Centers the tooltip horizontally */
  centerHorizontally(): void;

  /** Centers the tooltip vertically */
  centerVertically(): void;
}
