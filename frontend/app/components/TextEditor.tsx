
"use client";

interface TextEditorProps {
  text: string;
  setText: (value: string) => void;
}

export default function TextEditor({
  text,
  setText,
}: TextEditorProps) {
  const maxChars = 5000;
  const characterCount = text.length;

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const progress = Math.min(
    (characterCount / maxChars) * 100,
    100
  );

  const handleClear = () => {
    setText("");
  };

  return (
    <section
      className="
        group relative isolate overflow-hidden
        rounded-2xl border border-emerald-200/80
        bg-white
        shadow-[0_8px_30px_rgba(15,70,52,0.055)]
        transition-all duration-300
        hover:border-emerald-300
        hover:shadow-[0_12px_36px_rgba(16,185,129,0.09)]
        dark:border-slate-700/80
        dark:bg-[#17242c]
        dark:shadow-[0_14px_40px_rgba(0,0,0,0.18)]
        dark:hover:border-emerald-800/70
      "
    >
      {/* Ambient color glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-20 -top-24 -z-10
          h-56 w-56 rounded-full
          bg-emerald-300/20 blur-3xl
          transition-opacity duration-500
          group-hover:opacity-100
          dark:bg-emerald-400/8
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-28 -left-20 -z-10
          h-56 w-56 rounded-full
          bg-cyan-300/20 blur-3xl
          dark:bg-cyan-400/7
        "
      />

      {/* Header */}
      <div
        className="
          relative flex items-center justify-between gap-3
          border-b border-emerald-100/80
          bg-gradient-to-r from-emerald-50/80 via-white to-cyan-50/70
          px-5 py-4 sm:px-6
          dark:border-slate-700/80
          dark:from-emerald-950/30 dark:via-[#17242c] dark:to-cyan-950/20
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-emerald-200/70
              bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100
              text-sm font-bold text-emerald-800
              shadow-[0_3px_12px_rgba(16,185,129,0.10)]
              transition-transform duration-300
              group-hover:scale-105
              dark:border-emerald-400/15
              dark:from-emerald-400/15 dark:via-teal-400/10 dark:to-cyan-400/15
              dark:text-emerald-300
            "
          >
            Aa
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              Your text
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Write or paste your content
            </p>
          </div>
        </div>

        {text.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="
              rounded-lg border border-slate-200/90
              bg-white/90 px-3 py-2
              text-[11px] font-semibold text-slate-500
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-rose-200
              hover:bg-rose-50 hover:text-rose-600
              focus-visible:outline-2 focus-visible:outline-rose-400
              dark:border-slate-700 dark:bg-slate-800/80
              dark:text-slate-300
              dark:hover:border-rose-900/60 dark:hover:bg-rose-950/30
              dark:hover:text-rose-300
            "
          >
            Clear text
          </button>
        )}
      </div>

      {/* Editor body */}
      <div className="relative p-4 sm:p-6">
        <div
          className="
            relative overflow-hidden rounded-xl
            border border-emerald-200/80
            bg-gradient-to-br from-emerald-50/90 via-white to-cyan-50/70
            transition-all duration-300
            focus-within:border-emerald-400
            focus-within:from-emerald-50 focus-within:to-cyan-50
            focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.09),0_8px_24px_rgba(16,185,129,0.07)]
            dark:border-slate-700
            dark:from-[#101c23] dark:via-[#111e26] dark:to-[#102329]
            dark:focus-within:border-emerald-400/60
            dark:focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.08)]
          "
        >
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 top-0 z-10
              h-[2px] bg-gradient-to-r
              from-emerald-400 via-teal-400 to-cyan-400
              opacity-60 transition-opacity duration-300
              group-focus-within:opacity-100
            "
          />

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={maxChars}
            aria-label="Text to convert to speech"
            placeholder="Start writing something beautiful..."
            className="
              min-h-[230px] w-full resize-y
              border-0 bg-transparent
              px-4 py-5 pb-10
              text-sm leading-7 text-slate-800
              placeholder:bg-gradient-to-r
              placeholder:from-emerald-600
              placeholder:via-teal-600
              placeholder:to-cyan-600
              placeholder:bg-clip-text
              placeholder:text-transparent
              placeholder:opacity-90
              focus:outline-none focus:ring-0
              sm:min-h-[250px]
              dark:text-slate-100
              dark:placeholder:from-emerald-300
              dark:placeholder:via-teal-300
              dark:placeholder:to-cyan-300
              dark:placeholder:opacity-75
            "
          />

          {/* Character counter */}
          <div
            className="
              pointer-events-none absolute bottom-3 right-3
              rounded-lg border border-emerald-100/90
              bg-white/90 px-2.5 py-1.5
              text-[10px] font-medium tabular-nums
              text-emerald-700 shadow-sm backdrop-blur-md
              dark:border-slate-700 dark:bg-slate-800/90
              dark:text-emerald-300
            "
          >
            {characterCount.toLocaleString()} / {maxChars.toLocaleString()}
          </div>
        </div>

        {/* Footer statistics */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>

            <span className="h-3 w-px bg-slate-200 dark:bg-slate-700" />

            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {characterCount.toLocaleString()} characters
            </span>
          </div>

          <div
            className="flex w-24 items-center gap-2"
            aria-label={`${Math.round(progress)} percent of character limit used`}
          >
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-emerald-100 dark:bg-slate-700">
              <div
                className="
                  h-full rounded-full
                  bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400
                  transition-[width] duration-300
                "
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[9px] font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Helpful footer note */}
        <div
          className="
            mt-4 flex items-start gap-2 rounded-xl
            border border-cyan-100/80 bg-gradient-to-r
            from-cyan-50/70 to-emerald-50/70
            px-3 py-2.5
            dark:border-slate-700/80
            dark:from-cyan-950/20 dark:to-emerald-950/20
          "
        >
          <span className="mt-0.5 text-sm text-teal-600 dark:text-teal-300">
            ✦
          </span>
          <p className="text-[10px] leading-5 text-slate-600 dark:text-slate-300">
            Tip: Use punctuation and short paragraphs to make your speech sound more natural.
          </p>
        </div>
      </div>
    </section>
  );
}
