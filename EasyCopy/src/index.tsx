import { ReactNode } from "react";

import { DOM, Patcher, Webpack } from './common/api';
import { parseRegex } from "./regex";
import { useSettings } from "./common/settings";
import Copyable from "./components/Copyable";
import SettingsPanel from "./components/SettingsPanel";
import { PluginMeta } from "../../types";

import style from './style.scss';

export default (meta: PluginMeta) => {
  let [settings, reloadSettings, saveSettings] = useSettings();

  let patterns = settings.patterns.map(parseRegex);

  function start() {
    DOM.addStyle(style);

    // https://github.com/TheCommieAxolotl/BetterDiscord-Stuff/blob/c524bcb4e87d10874c280a3a59be44054c2f121a/BetterSyntax/BetterSyntax.plugin.js#L419
    const parser = Webpack.getModule(Webpack.Filters.byProps('parse', 'parseTopic'));

    // It would be much nicer to add a new "rule" to parser.defaultRules, but that would be a pain in the ass to reverse-engineer
    Patcher.after(parser, 'parse', (_, __, parsedMessage: ReactNode[]) => {
      const newMessage = [];

      for (const element of parsedMessage) {
        if (typeof element === "string") {
          let chunks: ReactNode[] = [element];

          for (const pattern of patterns) {
            const nextChunks: ReactNode[] = [];

            for (const chunk of chunks) {
              if (typeof chunk !== "string") {
                nextChunks.push(chunk);
                continue;
              }

              let lastMatchEnd = 0;
              let matches: RegExpMatchArray[];

              if (pattern.global) {
                matches = Array.from(chunk.matchAll(pattern));
              } else {
                const single = chunk.match(pattern);
                matches = single ? [single] : [];
              }

              for (const match of matches) {
                if (lastMatchEnd < match.index!) nextChunks.push(chunk.substring(lastMatchEnd, match.index));
                nextChunks.push(<Copyable highlight={settings.highlight}>{match[0]}</Copyable>);
                lastMatchEnd = match.index! + match[0].length;
              }

              if (lastMatchEnd < chunk.length) {
                nextChunks.push(chunk.substring(lastMatchEnd));
              }
            }

            chunks = nextChunks;
          }

          newMessage.push(...chunks);
        }
        else {
          // TODO: handle text in formatted chunks (bold, underline, inline code, ...)
          // TODO: extra special cases:
          //  - code block:
          //    - syntax highliting might complain
          //  - spoiler:
          //    - can't do it on click
          //    - maybe try a ctrl+click and put "Copy with Ctrl+Click" in a tooltip
          newMessage.push(element);
        }

        return newMessage;
      }
    });
  }

  function getSettingsPanel() {
    return <SettingsPanel settings={settings} setSettings={next => saveSettings(settings = next)} />;
  }

  function stop() {
    // TODO: messages remain modified until the next re-render, see if we can force that
    Patcher.unpatchAll();
    DOM.removeStyle();
  }

  return { start, stop, getSettingsPanel };
};
