/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Neste ambiente na nuvem, usa o Chromium que já vem instalado.
const CLOUD_CHROMIUM =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
if (require("fs").existsSync(CLOUD_CHROMIUM)) {
  Config.setBrowserExecutable(CLOUD_CHROMIUM);
}
