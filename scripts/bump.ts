import {execFileSync} from "node:child_process";
import {readFileSync, writeFileSync} from "node:fs";
import path from "node:path";

import {PluginConfig} from "../types";

function die(...messages: any[]): never {
  for (const message of messages) {
    console.error(message);
  }
  process.exit(1);
}

function next(which: string, version: string): string {
  const [major, minor, patch] = version.split(".", 3).map(Number);

  const v = (...n: any[]) => n.join(".");

  switch (which) {
    case "major":
      return v(major + 1, 0, 0);
    case "minor":
      return v(major, minor + 1, 0);
    case "patch":
      return v(major, minor, patch + 1);
    default:
      die(`[ERROR] Unknown version part '${which}'`);
  }
}

if (process.argv.length !== 4) {
  die(
    `Error: Invalid number of arguments: ${process.argv.length}`,
    "Usage: ts-node scripts/bump.ts <major|minor|patch> <plugin>"
  );
}

const [, , which, plugin] = process.argv;
const configPath = path.resolve(__dirname, "..", plugin, "src/plugin.json");
const config = JSON.parse(readFileSync(configPath, "utf-8")) as PluginConfig;

const nextVersion = next(which, config.version);
console.info(`${plugin}: ${config.version} -> ${nextVersion}`);
writeFileSync(configPath, JSON.stringify({...config, version: nextVersion}, null, "  "));

// Need to regenerate meta comment
execFileSync("npm", ["run", "bundle", plugin], {stdio: "inherit"});
