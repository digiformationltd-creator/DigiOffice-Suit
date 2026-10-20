import { contextBridge, ipcRenderer } from "electron";
import * as os from "os";
import { DocumentType, DigiOfficeAPI } from "../shared/types";

const api: DigiOfficeAPI = {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  createDocument: (type: DocumentType) => ipcRenderer.invoke("files:create", type),
  saveFile: (fileId: string, content: string | Uint8Array) =>
    ipcRenderer.invoke("files:save", fileId, content),
  getRecentFiles: () => ipcRenderer.invoke("files:getRecent"),
  togglePin: (fileId: string) => ipcRenderer.invoke("files:togglePin", fileId),
  getAISettings: () => ipcRenderer.invoke("ai:getSettings"),
  saveAISettings: (settings) => ipcRenderer.invoke("ai:saveSettings", settings),
  minimizeWindow: () => ipcRenderer.send("window:minimize"),
  maximizeWindow: () => ipcRenderer.send("window:maximize"),
  closeWindow: () => ipcRenderer.send("window:close"),
  platform: {
    os: os.type(),
    arch: process.arch as "x64" | "ia32" | "arm64",
    isWindows7: os.release().startsWith("6.1"),
  },
};

contextBridge.exposeInMainWorld("digiOfficeAPI", api);
