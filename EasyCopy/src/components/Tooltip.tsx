import {FC, ReactNode} from "react";

interface TooltipProps {
  text: ReactNode;
  position?: "top" | "right" | "bottom" | "left" | "center";
  children: (props: TooltipProps) => ReactNode;
  color?: "primary" | "black" | "grey" | "brand" | "red" | "green" | "yellow";
  delay?: number;
  spacing?: number;
  hide?: boolean;
  hideOnClick?: boolean;
  shouldShow?: boolean;
  forceOpen?: boolean;
  allowOverflow?: boolean;
  "aria-label"?: string;
  tooltipClassName?: string;
}

const Tooltip: FC<TooltipProps> = BdApi.Webpack.getModule(
  m => m.toString().includes("shouldShowTooltip") && m.Positions
);

export default Tooltip;
