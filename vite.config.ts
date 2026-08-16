import vinext from "vinext";
import { existsSync, readFileSync } from "node:fs";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

type HostingConfig = {
  d1: string | null;
  r2: string | null;
};

function readHostingConfig(): HostingConfig {
  const hostingConfigPath = new URL("./.openai/hosting.json", import.meta.url);

  if (!existsSync(hostingConfigPath)) {
    return { d1: null, r2: null };
  }

  return JSON.parse(readFileSync(hostingConfigPath, "utf8")) as HostingConfig;
}

const hostingConfig = readHostingConfig();
const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "site-creator-d1",
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async ({ command, mode }) => {
  const useCloudflareRuntime =
    command === "serve" ||
    mode === "cloudflare" ||
    process.env.LUXORA_BUILD_TARGET === "cloudflare";

  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  if (!useCloudflareRuntime) {
    process.env.NITRO_PRESET ??= "vercel";
  }

  const plugins = [vinext()];

  if (useCloudflareRuntime) {
    // Wrangler snapshots its log path while the Cloudflare plugin is imported.
    const { cloudflare } = await import("@cloudflare/vite-plugin");

    plugins.push(
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      })
    );
  } else {
    plugins.push(nitro());
  }

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins,
  };
});
