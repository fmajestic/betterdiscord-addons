/**
 * @name EasyCopy
 * @author fmajestic
 * @description Adds a copy button to matching text segments
 * @version 0.0.1
 * @authorId 232960695434608640
 * @website https://gitlab.com/fmajestic/betterdiscord-addons
 * @source https://github.com/fmajestic/betterdiscord-addons/tree/master/EasyCopy
 */

/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

'use strict';

var betterdiscord = new BdApi("EasyCopy");
var react = BdApi.React;

// components/Copyable.tsx
function Copyable({ highlight, text, children }) {
	const ref = react.useRef(null);
	const classList = ["ec-copyable"];
	if (highlight !== "none") {
		classList.push(`ec-highlight-${highlight}`);
	}
	return BdApi.React.createElement("button", {
		ref,
		type: "button",
		"aria-label": "Click to copy",
		className: classList.join(" "),
		onClick: () => {
			DiscordNative.clipboard.copy(text || ref.current.innerText);
			BdApi.UI.showToast("Copied!", { type: "success", icon: false });
		}
	}, children);
}

// components/InputField.tsx
function InputField({ name, label, hint, value, onChange, type, ...inputProps }) {
	return BdApi.React.createElement("div", {
		className: "ec-form-control"
	}, BdApi.React.createElement("div", null, BdApi.React.createElement("label", {
		htmlFor: name
	}, label, hint && BdApi.React.createElement("small", null, "(", hint, ")"))), type === "textarea" ? BdApi.React.createElement("textarea", {
		id: name,
		name,
		value,
		onChange,
		...inputProps
	}) : BdApi.React.createElement("input", {
		type,
		id: name,
		name,
		value,
		onChange,
		...inputProps
	}));
}

// components/SettingsPanel.tsx
function SettingsPanel({ settings, setSettings }) {
	const [patternsString, setPatternsString] = react.useState(settings.patterns.map((p) => p.toString()).join("\n"));
	function onChange(e) {
		setPatternsString(e.target.value);
		setSettings({ ...settings, patterns: e.target.value.split("\n") });
	}
	return BdApi.React.createElement("form", {
		className: "ec-settings"
	}, BdApi.React.createElement(InputField, {
		name: "patterns",
		type: "textarea",
		value: patternsString,
		onChange,
		label: "Patterns",
		hint: "one per line, supports JavaScript /regular expressions/g",
		rows: 5
	}));
}

// common/data.ts
function useDataKey(key) {
	function load() {
		return betterdiscord.Data.load(key);
	}
	function save(value) {
		return betterdiscord.Data.save(key, value);
	}
	function deleteData() {
		return betterdiscord.Data.delete(key);
	}
	return [load, save, deleteData];
}

// common/settings.ts
const SETTINGS_VERSION = 1;
const defaultSettings = {
	version: SETTINGS_VERSION,
	highlight: "outline",
	patterns: []
};
function useSettings() {
	const [loadSettings, saveSettings] = useDataKey("settings");
	let settings = loadSettings();
	if (!settings || settings.version < SETTINGS_VERSION) {
		saveSettings(
			settings = {
				...defaultSettings,
				...settings,
				version: SETTINGS_VERSION
			}
		);
	}
	return [settings, loadSettings, saveSettings];
}

// regex.ts
function fromFixed(pattern) {
	return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
}
function parseRegex(pattern) {
	const match = /\/(.*)\/(d?g?i?m?s?u?y?)/.exec(pattern);
	return match ? new RegExp(match[1], match[2]) : fromFixed(pattern);
}

// style.scss
var css = ".ec-settings {\n  display: flex;\n  flex-direction: column;\n  color: var(--text-normal);\n}\n\n.ec-form-control {\n  margin-bottom: 1em;\n}\n.ec-form-control label {\n  display: block;\n  margin-bottom: 0.3em;\n}\n.ec-form-control small {\n  font-size: smaller;\n}\n.ec-form-control textarea {\n  width: 100%;\n  resize: vertical;\n}\n\n:root {\n  --ec-border-color: var(--border-color, darkslategray);\n  --ec-background-color: transparent;\n  --ec-background-color-hover: var(--button-background-hover, var(--background-modifier-hover, #354249));\n  --ec-background-color-active: var(--button-background-active, var(--background-modifier-active, #4D5F68));\n}\n\n.ec-copyable {\n  font: inherit;\n  color: inherit;\n  padding: 0 3px;\n  background-color: transparent;\n  border-radius: var(--border-radius-2, 8px);\n  /* box-shadow so we don't increase the size (outline doesn't respect border-radius) */\n}\n.ec-copyable:hover, .ec-copyable:focus-visible {\n  box-shadow: none !important;\n  background-color: var(--ec-background-color-hover);\n}\n.ec-copyable:active {\n  background-color: var(--ec-background-color-active);\n}\n.ec-copyable.ec-highlight-outline {\n  box-shadow: 0 0 0 1px var(--ec-border-color);\n}\n.ec-copyable.ec-highlight-full {\n  background-color: var(--ec-background-color-hover);\n}";

// index.tsx
function EasyCopy() {
	let [settings, , saveSettings] = useSettings();
	let patterns = settings.patterns.map(parseRegex);
	function start() {
		betterdiscord.DOM.addStyle(css);
		const parser = betterdiscord.Webpack.getModule(betterdiscord.Webpack.Filters.byProps("parse", "parseTopic"));
		betterdiscord.Patcher.after(parser, "parse", (_, __, parsedMessage) => {
			const newMessage = [];
			for (const element of parsedMessage) {
				if (typeof element === "string") {
					let chunks = [element];
					for (const pattern of patterns) {
						const nextChunks = [];
						for (const chunk of chunks) {
							if (typeof chunk !== "string") {
								nextChunks.push(chunk);
								continue;
							}
							let lastMatchEnd = 0;
							let matches;
							if (pattern.global) {
								matches = Array.from(chunk.matchAll(pattern));
							} else {
								const single = chunk.match(pattern);
								matches = single ? [single] : [];
							}
							for (const match of matches) {
								if (lastMatchEnd < match.index)
									nextChunks.push(chunk.substring(lastMatchEnd, match.index));
								nextChunks.push(BdApi.React.createElement(Copyable, {
									highlight: settings.highlight
								}, match[0]));
								lastMatchEnd = match.index + match[0].length;
							}
							if (lastMatchEnd < chunk.length) {
								nextChunks.push(chunk.substring(lastMatchEnd));
							}
						}
						chunks = nextChunks;
					}
					newMessage.push(...chunks);
				} else {
					console.warn("[EasyCopy] Couldn't process message element:", element);
					newMessage.push(element);
				}
			}
			return newMessage;
		});
	}
	function getSettingsPanel() {
		return BdApi.React.createElement(SettingsPanel, {
			settings,
			setSettings: (next) => saveSettings(settings = next)
		});
	}
	function stop() {
		betterdiscord.Patcher.unpatchAll();
		betterdiscord.DOM.removeStyle();
	}
	return { start, stop, getSettingsPanel };
}

module.exports = EasyCopy;

/*@end@*/