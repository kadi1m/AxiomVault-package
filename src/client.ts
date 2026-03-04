import type { LogPayload, LogResponse } from "./types";

const LOG_ENDPOINT = "https://av.kmon.dev/api/v1/log";

export class Client {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Log an event. Sends POST to the AxiomVault API with Authorization: Bearer.
   * Backend sets timestamp and returns { auth, saved }.
   */
  async log(payload: LogPayload): Promise<LogResponse> {
    const res = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "User-Agent": "PostmanRuntime/7.44.1",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        type: payload.type,
        event: payload.event,
        ...(payload.actor !== undefined && { actor: payload.actor }),
        ...(payload.target !== undefined && { target: payload.target }),
        ...(payload.metadata !== undefined && { metadata: payload.metadata }),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      const isHtml = text.trimStart().toLowerCase().startsWith("<!doctype") || text.trimStart().toLowerCase().startsWith("<html");
      const message = isHtml
        ? `AxiomVault log failed: ${res.status} ${res.statusText} (origin server may be down or misconfigured)`
        : `AxiomVault log failed: ${res.status} ${text}`;
      throw new Error(message);
    }

    const data = (await res.json()) as LogResponse;
    return { auth: data.auth, saved: data.saved };
  }
}
