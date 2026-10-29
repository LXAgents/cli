/**
 * Stream parser — single responsibility: turn raw SSE text chunks into
 * assistant text deltas. Pure function: no network, no CLI, no state beyond
 * the current chunk.
 */

export class StreamParser {
  /**
   * Process one SSE text chunk. Returns the assembled delta text for this
   * chunk and invokes onText with each piece as it is parsed.
   */
  process(chunk, onText) {
    let out = "";
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") continue;
      const delta = this.extractDelta(payload);
      if (delta) {
        out += delta;
        if (onText) onText(delta);
      }
    }
    return out;
  }

  extractDelta(payload) {
    try {
      const parsed = JSON.parse(payload);
      return (
        parsed.choices?.[0]?.delta?.content ||
        parsed.choices?.[0]?.delta?.text ||
        ""
      );
    } catch {
      // Non-JSON data lines (heartbeats, etc.) are ignored.
      return "";
    }
  }
}
