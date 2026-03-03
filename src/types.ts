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
