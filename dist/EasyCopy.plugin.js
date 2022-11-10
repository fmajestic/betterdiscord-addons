/**
 * @name EasyCopy
 * @author fmajestic
 * @description Adds a copy button to matching text segments
 * @version 0.0.1
 * @authorId 232960695434608640
 * @website https://gitlab.com/fmajestic/betterdiscord-addons
 * @source https://github.com/fmajestic/betterdiscord-addons/tree/master/EasyCopy
 */
(() => {
	"use strict";
	var __webpack_modules__ = {
		169: (module, __webpack_exports__, __webpack_require__) => {
			__webpack_require__.d(__webpack_exports__, {
				Z: () => __WEBPACK_DEFAULT_EXPORT__
			});
			var styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(703);
			var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(882);
			var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
			var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(268);
			var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
			var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
			___CSS_LOADER_EXPORT___.push([module.id, ".ec-settings{display:flex;flex-direction:column;color:var(--text-normal)}.ec-form-control{margin-bottom:1em}.ec-form-control label{display:block;margin-bottom:.3em}.ec-form-control small{font-size:smaller}.ec-form-control textarea{width:100%;resize:vertical}:root{--ec-border-color: var(--border-color, darkslategray);--ec-background-color: transparent;--ec-background-color-hover: var(--button-background-hover, var(--background-modifier-hover, #354249));--ec-background-color-active: var(--button-background-active, var(--background-modifier-active, #4D5F68))}.ec-copyable{font:inherit;color:inherit;padding:0 3px;background-color:rgba(0,0,0,0);border-radius:var(--border-radius-2, 8px)}.ec-copyable:hover,.ec-copyable:focus-visible{box-shadow:none !important;background-color:var(--ec-background-color-hover)}.ec-copyable:active{background-color:var(--ec-background-color-active)}.ec-copyable.ec-highlight-outline{box-shadow:0 0 0 1px var(--ec-border-color)}.ec-copyable.ec-highlight-full{background-color:var(--ec-background-color-hover)}", ""]);
			(0, styles__WEBPACK_IMPORTED_MODULE_2__.z)("style.scss", ___CSS_LOADER_EXPORT___.toString());
			const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___.toString()
		},
		703: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
			__webpack_require__.d(__webpack_exports__, {
				z: () => load
			});
			let _styles = "";

			function load(path, css) {
				_styles += `/* ${path} */\n${css}\n`
			}

			function styles() {
				return _styles
			}
		},
		268: module => {
			module.exports = function(cssWithMappingToString) {
				var list = [];
				list.toString = function toString() {
					return this.map((function(item) {
						var content = "";
						var needLayer = "undefined" !== typeof item[5];
						if (item[4]) content += "@supports (".concat(item[4], ") {");
						if (item[2]) content += "@media ".concat(item[2], " {");
						if (needLayer) content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
						content += cssWithMappingToString(item);
						if (needLayer) content += "}";
						if (item[2]) content += "}";
						if (item[4]) content += "}";
						return content
					})).join("")
				};
				list.i = function i(modules, media, dedupe, supports, layer) {
					if ("string" === typeof modules) modules = [
						[null, modules, void 0]
					];
					var alreadyImportedModules = {};
					if (dedupe)
						for (var k = 0; k < this.length; k++) {
							var id = this[k][0];
							if (null != id) alreadyImportedModules[id] = true
						}
					for (var _k = 0; _k < modules.length; _k++) {
						var item = [].concat(modules[_k]);
						if (dedupe && alreadyImportedModules[item[0]]) continue;
						if ("undefined" !== typeof layer)
							if ("undefined" === typeof item[5]) item[5] = layer;
							else {
								item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
								item[5] = layer
							} if (media)
							if (!item[2]) item[2] = media;
							else {
								item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
								item[2] = media
							} if (supports)
							if (!item[4]) item[4] = "".concat(supports);
							else {
								item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
								item[4] = supports
							} list.push(item)
					}
				};
				return list
			}
		},
		882: module => {
			module.exports = function(i) {
				return i[1]
			}
		},
		113: module => {
			module.exports = BdApi.React
		}
	};
	var __webpack_module_cache__ = {};

	function __webpack_require__(moduleId) {
		var cachedModule = __webpack_module_cache__[moduleId];
		if (void 0 !== cachedModule) return cachedModule.exports;
		var module = __webpack_module_cache__[moduleId] = {
			id: moduleId,
			exports: {}
		};
		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		return module.exports
	}(() => {
		__webpack_require__.n = module => {
			var getter = module && module.__esModule ? () => module["default"] : () => module;
			__webpack_require__.d(getter, {
				a: getter
			});
			return getter
		}
	})();
	(() => {
		__webpack_require__.d = (exports, definition) => {
			for (var key in definition)
				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
					enumerable: true,
					get: definition[key]
				})
		}
	})();
	(() => {
		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
	})();
	var __webpack_exports__ = {};
	(() => {
		__webpack_require__.d(__webpack_exports__, {
			default: () => src
		});
		const external_EasyCopy_namespaceObject = "EasyCopy";
		var external_EasyCopy_default = __webpack_require__.n(external_EasyCopy_namespaceObject);
		const instance = new BdApi(external_EasyCopy_default());
		const {
			React,
			ReactDOM,
			Plugins,
			Themes,
			ContextMenu,
			ReactUtils,
			UI,
			Utils,
			Webpack,
			Data,
			DOM,
			Patcher
		} = instance;
		const api = null && instance;

		function fromFixed(pattern) {
			return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
		}

		function parseRegex(pattern) {
			const match = /\/(.*)\/(d?g?i?m?s?u?y?)/.exec(pattern);
			return match ? new RegExp(match[1], match[2]) : fromFixed(pattern)
		}

		function useDataKey(key) {
			function load() {
				return Data.load(key)
			}

			function save(value) {
				return Data.save(key, value)
			}

			function deleteData() {
				return Data["delete"](key)
			}
			return [load, save, deleteData]
		}
		const SETTINGS_VERSION = 1;
		const defaultSettings = {
			version: SETTINGS_VERSION,
			highlight: "outline",
			patterns: []
		};

		function useSettings() {
			const [loadSettings, saveSettings] = useDataKey("settings");
			let settings = loadSettings();
			if (!settings || settings.version < SETTINGS_VERSION) saveSettings(settings = {
				...defaultSettings,
				...settings,
				version: SETTINGS_VERSION
			});
			return [settings, loadSettings, saveSettings]
		}
		var external_BdApi_React_ = __webpack_require__(113);
		var Copyable_React = __webpack_require__(113);

		function Copyable({
			highlight,
			text,
			children
		}) {
			const ref = (0, external_BdApi_React_.useRef)(null);
			const classList = ["ec-copyable"];
			if ("none" !== highlight) classList.push(`ec-highlight-${highlight}`);
			return Copyable_React.createElement("button", {
				ref,
				type: "button",
				"aria-label": "Click to copy button text",
				className: classList.join(" "),
				onClick: () => {
					DiscordNative.clipboard.copy(text || ref.current.innerText);
					BdApi.UI.showToast("Copied!", {
						type: "success",
						icon: false
					})
				}
			}, children)
		}
		var InputField_React = __webpack_require__(113);

		function InputField({
			name,
			label,
			hint,
			value,
			onChange,
			type,
			...inputProps
		}) {
			return InputField_React.createElement("div", {
				className: "ec-form-control"
			}, InputField_React.createElement("div", null, InputField_React.createElement("label", {
				htmlFor: name
			}, label, hint && InputField_React.createElement("small", null, " (", hint, ")"))), "textarea" === type ? InputField_React.createElement("textarea", {
				id: name,
				name,
				value,
				onChange,
				...inputProps
			}) : InputField_React.createElement("input", {
				type,
				id: name,
				name,
				value,
				onChange,
				...inputProps
			}))
		}
		var SettingsPanel_React = __webpack_require__(113);

		function SettingsPanel({
			settings,
			setSettings
		}) {
			const [patternsString, setPatternsString] = (0, external_BdApi_React_.useState)(settings.patterns.map((p => p.toString())).join("\n"));

			function onChange(e) {
				setPatternsString(e.target.value);
				setSettings({
					...settings,
					patterns: e.target.value.split("\n")
				})
			}
			return SettingsPanel_React.createElement("form", {
				className: "ec-settings"
			}, SettingsPanel_React.createElement(InputField, {
				name: "patterns",
				type: "textarea",
				value: patternsString,
				onChange,
				label: "Patterns",
				hint: "one per line, supports JavaScript /regular expressions/g",
				rows: 5
			}))
		}
		var style = __webpack_require__(169);
		var src_React = __webpack_require__(113);
		const src = meta => {
			let [settings, reloadSettings, saveSettings] = useSettings();
			let patterns = settings.patterns.map(parseRegex);

			function start() {
				DOM.addStyle(style.Z);
				const parser = Webpack.getModule(Webpack.Filters.byProps("parse", "parseTopic"));
				Patcher.after(parser, "parse", ((_, __, parsedMessage) => {
					const newMessage = [];
					for (const element of parsedMessage) {
						if ("string" === typeof element) {
							let chunks = [element];
							for (const pattern of patterns) {
								const nextChunks = [];
								for (const chunk of chunks) {
									if ("string" !== typeof chunk) {
										nextChunks.push(chunk);
										continue
									}
									let lastMatchEnd = 0;
									let matches;
									if (pattern.global) matches = Array.from(chunk.matchAll(pattern));
									else {
										const single = chunk.match(pattern);
										matches = single ? [single] : []
									}
									for (const match of matches) {
										if (lastMatchEnd < match.index) nextChunks.push(chunk.substring(lastMatchEnd, match.index));
										nextChunks.push(src_React.createElement(Copyable, {
											highlight: settings.highlight
										}, match[0]));
										lastMatchEnd = match.index + match[0].length
									}
									if (lastMatchEnd < chunk.length) nextChunks.push(chunk.substring(lastMatchEnd))
								}
								chunks = nextChunks
							}
							newMessage.push(...chunks)
						} else newMessage.push(element);
						return newMessage
					}
				}))
			}

			function getSettingsPanel() {
				return src_React.createElement(SettingsPanel, {
					settings,
					setSettings: next => saveSettings(settings = next)
				})
			}

			function stop() {
				Patcher.unpatchAll();
				DOM.removeStyle()
			}
			return {
				start,
				stop,
				getSettingsPanel
			}
		}
	})();
	module.exports = __webpack_exports__["default"]
})();