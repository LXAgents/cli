/**
 * Configuration — single responsibility: resolve runtime settings from env
 * and defaults. Holds no network, CLI, or parsing logic.
 */

const DEFAULT_MODEL = "openai/gpt-4o-mini";
const DEFAULT_BASE_URL = "https://openrouter.ai/api/v1";

export function resolveConfig({ env = process.env } = {}) {
  return {
    apiKey: env.OPENROUTER_API_KEY,
    baseUrl: env.OPENROUTER_BASE_URL || DEFAULT_BASE_URL,
    defaultModel: env.OPENROUTER_DEFAULT_MODEL || DEFAULT_MODEL,
    referer: env.OPENROUTER_HTTP_REFERER || "https://github.com/claude-mirror",
    title: env.OPENROUTER_X_TITLE || "claude-mirror",
  };
}

export { DEFAULT_MODEL, DEFAULT_BASE_URL };
