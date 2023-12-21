export interface DownloadTemplateOptions {
  source: string;
  options?: {
    dir?: string;
    provider?: string;
    repo?: string;
    ref?: string;
    subdir?: string;
    force?: boolean;
    forceClean?: boolean;
    offline?: boolean;
    preferOffline?: boolean;
    cwd?: string;
    auth?: string;
  };
}
