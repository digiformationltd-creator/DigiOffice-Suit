import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as os from "os";
import { DocumentType, OfficeFile, AISettings } from "../shared/types";

let mainWindow: BrowserWindow | null = null;

// Defensive symbols for Windows 7 SP1 & 32-bit execution
if (process.platform === "win32") {
  app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
  app.commandLine.appendSwitch("enable-features", "PlatformHEVCDecoderSupport");
  // Hardware acceleration fallback for older iGPU / software rasterizer
  if (os.release().startsWith("6.1")) {
    app.disableHardwareAcceleration();
  }
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    frame: false,
    titleBarStyle: "hidden",
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    icon: path.join(__dirname, "../../assets/icon.ico"),
  });

  // Enable Sheesha Frosted Glass effects on Windows
  if (process.platform === "win32") {
    try {
      // DWM Blur / Mica fallback on modern Windows
      mainWindow.setBackgroundMaterial?.("mica");
    } catch {
      // Graceful fallback on Windows 7 / 8
    }
  }

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// In-memory mock document registry
const mockRecentFiles: OfficeFile[] = [
  {
    id: "f-1",
    name: "Untitled Spreadsheet.xlsx",
    path: "C:\\Users\\User\\Documents\\Untitled Spreadsheet.xlsx",
    type: "xlsx",
    size: 4096,
    modifiedAt: "Today · 11:41 AM",
    isPinned: true,
  },
  {
    id: "f-2",
    name: "Sample Document.pdf",
    path: "C:\\Users\\User\\Documents\\Sample Document.pdf",
    type: "pdf",
    size: 52224,
    modifiedAt: "Yesterday",
    isPinned: false,
  },
];

// IPC Handlers
ipcMain.handle("dialog:openFile", async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      { name: "Office Documents", extensions: ["docx", "xlsx", "pptx", "pdf", "md", "html"] },
      { name: "Word Documents", extensions: ["docx", "doc", "odt"] },
      { name: "Spreadsheets", extensions: ["xlsx", "xls", "csv"] },
      { name: "Presentations", extensions: ["pptx", "ppt"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  const ext = path.extname(filePath).slice(1).toLowerCase() as DocumentType;
  return {
    id: `f-${Date.now()}`,
    name: path.basename(filePath),
    path: filePath,
    type: ext,
    size: 1024,
    modifiedAt: "Just now",
    isPinned: false,
  };
});

ipcMain.handle("files:getRecent", async () => {
  return mockRecentFiles;
});

ipcMain.handle("files:togglePin", async (_, fileId: string) => {
  const file = mockRecentFiles.find((f) => f.id === fileId);
  if (file) {
    file.isPinned = !file.isPinned;
    return true;
  }
  return false;
});

ipcMain.on("window:minimize", () => mainWindow?.minimize());
ipcMain.on("window:maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on("window:close", () => mainWindow?.close());

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
