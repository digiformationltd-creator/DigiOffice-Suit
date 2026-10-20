import React, { useState, useEffect } from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode,
  FileType,
  FolderOpen,
  Pin,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  Sun,
  Moon,
  Minus,
  Square,
  X,
  Plus,
} from "lucide-react";
import { OfficeFile, DocumentType, ThemeMode } from "../shared/types";

export default function App(): JSX.Element {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [files, setFiles] = useState<OfficeFile[]>([
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
  ]);

  const quickTiles: { type: DocumentType; label: string; ext: string; icon: any; color: string }[] = [
    { type: "docx", label: "AI Docs", ext: ".docx", icon: FileText, color: "#2563EB" },
    { type: "xlsx", label: "AI Sheets", ext: ".xlsx", icon: FileSpreadsheet, color: "#16A34A" },
    { type: "pptx", label: "AI Slides", ext: ".pptx", icon: Presentation, color: "#EA580C" },
    { type: "md", label: "AI Markdown", ext: ".md", icon: FileCode, color: "#9333EA" },
    { type: "html", label: "AI HTML", ext: ".html", icon: FileType, color: "#0D9488" },
    { type: "pdf", label: "AI PDF", ext: ".pdf", icon: FileText, color: "#DC2626" },
  ];

  const handleTogglePin = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isPinned: !f.isPinned } : f))
    );
  };

  const handleOpenLocal = async () => {
    if (window.digiOfficeAPI?.openFile) {
      const file = await window.digiOfficeAPI.openFile();
      if (file) {
        setFiles((prev) => [file, ...prev]);
      }
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans select-none ${theme === "dark" ? "bg-zinc-950 text-white" : "bg-slate-50 text-slate-800"}`}>
      {/* ── LEFT SIDEBAR ────────────────────────────────────── */}
      <aside className={`flex w-64 flex-col justify-between border-r p-4 ${theme === "dark" ? "border-zinc-800 bg-zinc-900/60" : "border-slate-200 bg-white"}`}>
        <div className="flex flex-col gap-5">
          {/* Brand Lockup */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <span className="font-display font-black text-lg">D</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-slate-900">DigiOffice</span>
                <span className="rounded bg-indigo-600 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white uppercase">
                  Suite
                </span>
              </div>
            </div>
          </div>

          {/* Theme Toggles */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 transition ${theme === "light" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              <Sun size={13} className="text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 transition ${theme === "dark" ? "bg-zinc-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              <Moon size={13} className="text-blue-400" />
              <span>Dark</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <button className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-slate-400" />
                <span>Recent</span>
              </div>
              <span className="font-mono text-xs text-slate-400">2</span>
            </button>
            <button className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100">
              <div className="flex items-center gap-2.5">
                <Pin size={16} className="text-slate-400" />
                <span>Pinned</span>
              </div>
              <span className="font-mono text-xs text-slate-400">1</span>
            </button>
            <button className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-100">
              <Sparkles size={16} className="text-indigo-600" />
              <span>Ask AI</span>
            </button>
          </nav>
        </div>

        {/* ── CLOUD OS 3-DAY FREE TRIAL CARD ──────────────────── */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold tracking-wider text-blue-600 uppercase">
              Cloud OS
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
              3-Day Free Trial
            </span>
          </div>
          <div className="mt-2 font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span className="text-amber-500">⚡</span>
            <span>Digi biz OS</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            All-in-one Cloud Business Operating System for Windows.
          </p>
          <a
            href="https://www.digibizos.co.uk/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-lg bg-blue-600 py-1.5 text-center font-display text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Try Digi biz OS ↗
          </a>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ───────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Top Titlebar */}
        <header className="flex h-12 items-center justify-between border-b px-6 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
            <span className="font-bold">DigiOffice Suite</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.digibizos.co.uk/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 font-display text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-100"
            >
              <span>⚡ Try Digi biz OS</span>
              <span className="rounded bg-blue-600 px-1 py-0.2 font-mono text-[9px] text-white uppercase">
                Free Trial
              </span>
            </a>
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => window.digiOfficeAPI?.minimizeWindow()}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200"
              >
                <Minus size={13} />
              </button>
              <button
                onClick={() => window.digiOfficeAPI?.maximizeWindow()}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200"
              >
                <Square size={11} />
              </button>
              <button
                onClick={() => window.digiOfficeAPI?.closeWindow()}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-red-500 hover:text-white"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </header>

        {/* Home Screen Hero */}
        <div className="p-8 md:p-12">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            Good afternoon.
          </h1>
          <p className="mt-1 text-lg text-slate-600">What are you working on?</p>

          {/* ── FROSTED SHEESHA ACRYLIC TILES ───────────────── */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {quickTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <button
                  key={tile.type}
                  onClick={() => window.digiOfficeAPI?.createDocument(tile.type)}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm transition group-hover:scale-105"
                    style={{ backgroundColor: tile.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="font-display text-xs font-bold text-slate-800">
                      {tile.label}
                    </span>
                    <span className="rounded bg-blue-50 px-1 py-0.2 font-mono text-[9px] font-bold text-blue-600">
                      AI
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{tile.ext}</span>
                </button>
              );
            })}

            {/* Open Local */}
            <button
              onClick={handleOpenLocal}
              className="group flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <FolderOpen size={24} />
              </div>
              <span className="mt-3 font-display text-xs font-bold text-slate-800">
                Open Local...
              </span>
              <span className="font-mono text-[10px] text-slate-400">.docx / .xlsx / ...</span>
            </button>
          </div>

          {/* ── RECENT DOCUMENTS TABLE ───────────────────────── */}
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                {["All", "Docs", "Sheets", "Slides", "PDF", "Markdown", "HTML"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 transition ${activeFilter === filter ? "bg-slate-900 text-white shadow-sm" : "hover:bg-slate-200/60"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center">
                <Search size={14} className="absolute left-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search file names and contents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white py-1.5 pr-4 pl-9 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Files List */}
            <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between px-4 py-3 text-xs transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-700">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-slate-400">
                    <span className="font-mono">{file.modifiedAt}</span>
                    <button
                      onClick={() => handleTogglePin(file.id)}
                      className={`transition ${file.isPinned ? "text-amber-500" : "text-slate-300 hover:text-slate-500"}`}
                    >
                      <Pin size={14} className={file.isPinned ? "fill-amber-500" : ""} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
