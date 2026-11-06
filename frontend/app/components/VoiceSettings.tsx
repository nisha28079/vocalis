
"use client";

import { useEffect, useState } from "react";

interface VoiceSettingsProps {
  onSettingsChange?: (settings: {
    language: string;
    voice: string;
    style: string;
    speed: number;
  }) => void;
  onPreview?: () => void;
  previewLoading?: boolean;
}

const voices = [
  {
    name: "Sofia",
    description: "Warm & natural",
    icon: "♀",
    colors:
      "from-rose-100 to-pink-100 text-rose-700 dark:from-rose-400/20 dark:to-pink-400/10 dark:text-rose-300",
  },
  {
    name: "Emma",
    description: "Clear & friendly",
    icon: "✧",
    colors:
      "from-cyan-100 to-sky-100 text-cyan-700 dark:from-cyan-400/20 dark:to-sky-400/10 dark:text-cyan-300",
  },
  {
    name: "James",
    description: "Deep & confident",
    icon: "♂",
    colors:
      "from-violet-100 to-indigo-100 text-violet-700 dark:from-violet-400/20 dark:to-indigo-400/10 dark:text-violet-300",
  },
  {
    name: "Daniel",
    description: "Smooth & composed",
    icon: "◈",
    colors:
      "from-amber-100 to-orange-100 text-amber-700 dark:from-amber-400/20 dark:to-orange-400/10 dark:text-amber-300",
  },
];

const styles = [
  {
    name: "Natural",
    description: "Relaxed and conversational",
    icon: "◉",
  },
  {
    name: "Professional",
    description: "Polished and confident",
    icon: "◇",
  },
  {
    name: "Friendly",
    description: "Warm and approachable",
    icon: "☺",
  },
  {
    name: "Expressive",
    description: "Emotional and lively",
    icon: "✦",
  },
];

export default function VoiceSettings({
  onSettingsChange,
  onPreview,
  previewLoading = false,
}: VoiceSettingsProps) {
  const [language, setLanguage] = useState("English (US)");
  const [voice, setVoice] = useState("Sofia");
  const [style, setStyle] = useState("Natural");
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    onSettingsChange?.({
      language,
      voice,
      style,
      speed,
    });
  }, [language, voice, style, speed, onSettingsChange]);

  const cardClass = (selected: boolean) =>
    `group relative min-w-0 overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
      selected
        ? "border-emerald-400/90 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 shadow-[0_5px_18px_rgba(16,185,129,0.09)] dark:border-emerald-400/60 dark:from-emerald-950/40 dark:via-[#17242c] dark:to-cyan-950/30"
        : "border-slate-200/90 bg-white/90 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_7px_18px_rgba(16,185,129,0.07)] dark:border-slate-700 dark:bg-[#111b23] dark:hover:border-emerald-700/80"
    }`;

  return (
    <section
      className="
        group relative isolate overflow-hidden rounded-2xl
        border border-emerald-200/70 bg-white p-5
        shadow-[0_8px_30px_rgba(15,70,52,0.045)]
        transition-colors duration-300
        dark:border-slate-700/80 dark:bg-[#17242c]
        dark:shadow-[0_12px_35px_rgba(0,0,0,0.16)]
        sm:p-6
      "
    >
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-20 -top-24 -z-10
          h-48 w-48 rounded-full bg-emerald-300/15 blur-3xl
          dark:bg-emerald-400/5
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-24 -left-20 -z-10
          h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl
          dark:bg-cyan-400/5
        "
      />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
            border border-emerald-200/70
            bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100
            text-lg text-emerald-700
            shadow-[0_3px_12px_rgba(16,185,129,0.10)]
            dark:border-emerald-400/15
            dark:from-emerald-400/15 dark:via-teal-400/10 dark:to-cyan-400/10
            dark:text-emerald-300
          "
        >
          ♫
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Voice Settings
          </h2>

          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Personalize your speech experience
          </p>
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <label
          htmlFor="language"
          className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          Language
        </label>

        <div className="relative">
          <select
            id="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="
              h-11 w-full appearance-none rounded-xl
              border border-slate-200/90
              bg-gradient-to-r from-emerald-50/70 to-cyan-50/60
              px-3 pr-10 text-xs font-medium text-slate-700 outline-none
              transition-all duration-200
              hover:border-emerald-300
              focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/70
              dark:border-slate-700 dark:from-[#111e26] dark:to-[#112329]
              dark:text-slate-200 dark:focus:border-emerald-500/60
              dark:focus:ring-emerald-900/30
            "
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Hindi</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-emerald-600 dark:text-emerald-300"
          >
            ⌄
          </span>
        </div>
      </div>

      {/* Voice selection */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Choose a voice
          </h3>

          <span className="rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            {voice} selected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {voices.map((item) => {
            const selected = voice === item.name;

            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setVoice(item.name)}
                className={cardClass(selected)}
              >
                {selected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 top-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  />
                )}

                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-xl
                      bg-gradient-to-br text-sm
                      shadow-sm transition-transform duration-300
                      group-hover:scale-105 ${item.colors}
                    `}
                  >
                    {item.icon}
                  </span>

                  {selected ? (
                    <span
                      aria-label="Selected"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white dark:bg-emerald-400 dark:text-slate-950"
                    >
                      ✓
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-slate-200 transition-colors group-hover:bg-emerald-300 dark:bg-slate-700"
                    />
                  )}
                </div>

                <p className="mt-3 text-xs font-semibold text-slate-800 dark:text-slate-100">
                  {item.name}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice style */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Voice style
          </h3>

          <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
            {style}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {styles.map((item) => {
            const selected = style === item.name;

            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setStyle(item.name)}
                className={cardClass(selected)}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-xl
                      text-sm shadow-sm transition-all duration-300
                      ${
                        selected
                          ? "bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-700 dark:from-emerald-400/20 dark:to-cyan-400/10 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-emerald-950/50 dark:group-hover:text-emerald-300"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {selected && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300">
                      ✓
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs font-semibold text-slate-800 dark:text-slate-100">
                  {item.name}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speech speed */}
      <div className="rounded-xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/70 p-4 dark:border-slate-700/80 dark:from-emerald-950/25 dark:via-[#17242c] dark:to-cyan-950/20">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <label
              htmlFor="speed"
              className="text-xs font-semibold text-slate-800 dark:text-slate-100"
            >
              Speech speed
            </label>

            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              Adjust the speaking pace
            </p>
          </div>

          <span className="rounded-lg border border-emerald-200/80 bg-white/90 px-2.5 py-1.5 text-xs font-bold tabular-nums text-emerald-700 shadow-sm dark:border-emerald-800/60 dark:bg-slate-800 dark:text-emerald-300">
            {speed.toFixed(1)}x
          </span>
        </div>

        <input
          id="speed"
          type="range"
          min="0.7"
          max="1.2"
          step="0.1"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          aria-label="Speech speed"
          className="h-2 w-full cursor-pointer accent-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400">
          <span>0.7x · Slower</span>
          <span>1.0x · Normal</span>
          <span>1.2x · Faster</span>
        </div>
      </div>

      {/* Current selection summary */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-cyan-100/80 bg-gradient-to-r from-cyan-50/70 to-emerald-50/70 px-3.5 py-3 dark:border-slate-700/80 dark:from-cyan-950/20 dark:to-emerald-950/20">
        <span className="mt-0.5 text-sm text-teal-600 dark:text-teal-300">
          ✦
        </span>

        <p className="text-[10px] leading-5 text-slate-600 dark:text-slate-300">
          Selected: <strong>{voice}</strong> · <strong>{style}</strong> ·{" "}
          <strong>{speed.toFixed(1)}x</strong>
        </p>
      </div>

      {/* Preview Voice */}
      <button
        type="button"
        onClick={onPreview}
        disabled={!onPreview || previewLoading}
        className="
          group mt-5 flex min-h-11 w-full items-center justify-center gap-2
          rounded-xl border border-emerald-200/80
          bg-gradient-to-r from-emerald-50 to-cyan-50
          px-4 py-3 text-xs font-semibold text-emerald-700
          shadow-sm transition-all duration-300
          hover:-translate-y-0.5 hover:border-emerald-300
          hover:shadow-[0_7px_18px_rgba(16,185,129,0.10)]
          disabled:cursor-not-allowed disabled:opacity-60
          dark:border-emerald-800/60
          dark:from-emerald-950/30 dark:to-cyan-950/30
          dark:text-emerald-300
        "
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {previewLoading ? "◌" : "▶"}
        </span>

        {previewLoading ? "Preparing preview..." : "Preview Voice"}

        {!previewLoading && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        )}
      </button>
    </section>
  );
}
