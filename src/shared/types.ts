export type DocumentType = "docx" | "xlsx" | "pptx" | "pdf" | "md" | "html";

export interface OfficeFile {
  id: string;
  name: string;
  path: string;
  type: DocumentType;
  size: number;
  modifiedAt: string;
  isPinned: boolean;
}

export type ThemeMode = "light" | "dark";

export interface AISettings {
  provider: "gemini" | "groq" | "ollama" | "offline";
  apiKey?: string;
  model: string;
  temperature: number;
  trackChanges: boolean;
}

export interface DigiOfficeAPI {
  openFile: () => Promise<OfficeFile | null>;
  createDocument: (type: DocumentType) => Promise<OfficeFile>;
  saveFile: (fileId: string, content: string | Uint8Array) => Promise<boolean>;
  getRecentFiles: () => Promise<OfficeFile[]>;
  togglePin: (fileId: string) => Promise<boolean>;
  getAISettings: () => Promise<AISettings>;
  saveAISettings: (settings: Partial<AISettings>) => Promise<boolean>;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  platform: {
    os: string;
    arch: "x64" | "ia32" | "arm64";
    isWindows7: boolean;
  };
}

declare global {
  interface Window {
    digiOfficeAPI?: DigiOfficeAPI;
  }
}
