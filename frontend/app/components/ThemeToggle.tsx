"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("vocalis-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("vocalis-theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("vocalis-theme", "dark");
      setDark(true);
    }
  };

  if (!mounted) {
    return (
      <div
        className="
          h-9 w-9 rounded-xl
          border border-slate-200
          bg-white
          dark:border-slate-700
          dark:bg-slate-900
        "
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        group relative
        flex h-9 w-9
        items-center justify-center
        overflow-hidden
        rounded-xl
        border border-slate-300
        bg-white
        text-sm
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-emerald-300
        hover:shadow-[0_7px_18px_rgba(16,185,129,0.12)]
        active:translate-y-0
        dark:border-slate-700
        dark:bg-slate-900
        dark:hover:border-emerald-700
      "
    >
      <span
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-br
          from-emerald-50
          to-cyan-50
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
          dark:from-emerald-400/10
          dark:to-cyan-400/10
        "
      />

      <span
        className="
          relative z-10
          text-sm
          transition-all duration-300
          group-hover:scale-110
          group-hover:rotate-12
        "
      >
        {dark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}