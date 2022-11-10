import {ReactNode, useRef} from "react";

interface CopyableProps {
  /** Should the component be highlighted even when not hovered/focused. */
  highlight?: "none" | "outline" | "full";

  /** Optional custom text to copy. */
  text?: string;

  /** The components to wrap. Copies text of all child elements by default. */
  children: ReactNode;
}

/** Wraps its children in a button that copies their text, or a custom value. */
export default function Copyable({highlight, text, children}: CopyableProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const classList = ["ec-copyable"];

  if (highlight !== "none") {
    classList.push(`ec-highlight-${highlight}`);
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Click to copy"
      className={classList.join(" ")}
      onClick={() => {
        DiscordNative.clipboard.copy(text || ref.current!.innerText);
        BdApi.UI.showToast("Copied!", {type: "success", icon: false});
      }}
    >
      {children}
    </button>
  );
}
