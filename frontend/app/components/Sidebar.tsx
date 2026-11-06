
"use client";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const menuItems = [
  { label: "Speech Studio", icon: "✦" },
  { label: "My Audio", icon: "♫" },
  { label: "Templates", icon: "▦" },
];

export default function Sidebar({
  activeSection,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] shrink-0 flex-col overflow-y-auto border-r border-slate-200/80 bg-[#f4f8f7] transition-colors duration-300 dark:border-slate-800 dark:bg-[#111820] max-lg:hidden lg:flex">
      <div className="px-7 pb-7 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-bold text-white shadow-[0_6px_18px_rgba(16,185,129,0.18)] dark:from-emerald-400 dark:to-cyan-400 dark:text-slate-950">
            V
          </div>
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
              vocalis.
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              Speech Studio
            </p>
          </div>
        </div>
      </div>

      <nav className="px-4">
        <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
          Workspace
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const active = activeSection === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.label)}
                aria-current={active ? "page" : undefined}
                className={`group flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 ${
                  active
                    ? "border-emerald-100 bg-white text-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.04)] dark:border-emerald-900/40 dark:bg-[#17242c] dark:text-white"
                    : "border-transparent text-slate-500 hover:border-slate-200/70 hover:bg-white/60 hover:text-slate-900 dark:text-slate-500 dark:hover:border-slate-800 dark:hover:bg-[#17242c]/60 dark:hover:text-slate-200"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-600 dark:from-emerald-400/15 dark:to-cyan-400/10 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="flex-1 px-5 pb-5 pt-6">
        <div className="relative h-full max-h-[260px] overflow-hidden rounded-2xl border border-emerald-100/80 bg-gradient-to-br from-emerald-50 via-white/80 to-cyan-50 dark:border-slate-800 dark:from-emerald-950/30 dark:via-[#17242c] dark:to-cyan-950/20">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-400/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-400/10" />

          <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white/80 text-lg shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70">
              ◉
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              Your voice workspace
            </p>
            <p className="mt-1.5 text-[9px] leading-4 text-slate-400 dark:text-slate-500">
              Create natural speech from your ideas.
            </p>
            <div className="mt-5 flex items-center gap-1">
              {[8, 14, 20, 11, 17, 23, 13, 19, 9, 16, 22].map(
                (height, index) => (
                  <span
                    key={index}
                    className="w-[3px] rounded-full bg-gradient-to-t from-emerald-500 to-cyan-400 opacity-70"
                    style={{ height: `${height}px` }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80 px-5 py-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-600 text-xs font-semibold text-white dark:from-emerald-400 dark:to-cyan-400 dark:text-slate-950">
            N
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
              Nisha Singh
            </p>
            <p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
              Creator workspace
            </p>
          </div>
          <span className="ml-auto text-xs text-slate-400">⋯</span>
        </div>
      </div>
    </aside>
  );
}
