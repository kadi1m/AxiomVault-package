/** Log severity/type for each log entry */
export const LOG_TYPES = [
  "TRACE",
  "DEBUG",
  "INFO",
  "NOTICE",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "SECURITY",
  "AUDIT",
] as const;

export type LogType = (typeof LOG_TYPES)[number];

export interface LogPayload {
  /** Service name (e.g. "api", "worker"). Shown in panel sidebar; filter logs by service. */
  service?: string;
  type: LogType;
  event: string;
  actor?: string;
  target?: string;
  metadata?: Record<string, unknown>;
}

export interface LogResponse {
  auth: boolean;
  saved: boolean;
}
