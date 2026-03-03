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
      throw new Error(`AxiomVault log failed: ${res.status} ${text}`);
    }

    const data = (await res.json()) as LogResponse;
    return { auth: data.auth, saved: data.saved };
  }
}
