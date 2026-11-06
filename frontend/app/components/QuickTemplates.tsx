
"use client";

type QuickTemplatesProps = {
  onSelect: (templateText: string) => void;
};

const templates = [
  {
    title: "Welcome",
    description: "A warm introduction",
    text: "Welcome to Vocalis. Turn your words into natural, expressive speech.",
    icon: "✦",
    iconStyle:
      "from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-400/20 dark:to-teal-400/10 dark:text-emerald-300",
    glow: "bg-emerald-300/25 dark:bg-emerald-400/10",
  },
  {
    title: "Podcast",
    description: "Opening for a podcast",
    text: "Hello and welcome back to the podcast. Today, we're exploring ideas, stories, and conversations that inspire.",
    icon: "◉",
    iconStyle:
      "from-cyan-100 to-sky-100 text-cyan-700 dark:from-cyan-400/20 dark:to-sky-400/10 dark:text-cyan-300",
    glow: "bg-cyan-300/25 dark:bg-cyan-400/10",
  },
  {
    title: "Presentation",
    description: "Professional presentation",
    text: "Good morning everyone. Thank you for joining us today. Let's take a closer look at the ideas and opportunities ahead.",
    icon: "▣",
    iconStyle:
      "from-violet-100 to-indigo-100 text-violet-700 dark:from-violet-400/20 dark:to-indigo-400/10 dark:text-violet-300",
    glow: "bg-violet-300/20 dark:bg-violet-400/10",
  },
  {
    title: "Storytelling",
    description: "A cinematic opening",
    text: "It was a quiet evening when everything changed. The city was still, the lights were glowing, and a new story was about to begin.",
    icon: "✧",
    iconStyle:
      "from-amber-100 to-orange-100 text-amber-700 dark:from-amber-400/20 dark:to-orange-400/10 dark:text-amber-300",
    glow: "bg-amber-300/25 dark:bg-amber-400/10",
  },
  {
    title: "Social Media",
    description: "Short promotional copy",
    text: "Big ideas deserve to be heard. Create engaging voice content with Vocalis and bring your message to life.",
    icon: "◌",
    iconStyle:
      "from-pink-100 to-rose-100 text-pink-700 dark:from-pink-400/20 dark:to-rose-400/10 dark:text-pink-300",
    glow: "bg-pink-300/20 dark:bg-pink-400/10",
  },
  {
    title: "Announcement",
    description: "Clear and friendly",
    text: "We have an exciting announcement to share with you. Stay tuned as we reveal what's coming next.",
    icon: "◆",
    iconStyle:
      "from-teal-100 to-cyan-100 text-teal-700 dark:from-teal-400/20 dark:to-cyan-400/10 dark:text-teal-300",
    glow: "bg-teal-300/25 dark:bg-teal-400/10",
  },
];

export default function QuickTemplates({
  onSelect,
}: QuickTemplatesProps) {
  return (
    <section
      className="
        relative isolate overflow-hidden rounded-2xl
        border border-emerald-200/70 bg-white
        p-5
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
          h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl
          dark:bg-cyan-400/5
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-24 -left-20 -z-10
          h-48 w-48 rounded-full bg-emerald-300/15 blur-3xl
          dark:bg-emerald-400/5
        "
      />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="
                flex h-8 w-8 items-center justify-center rounded-lg
                border border-emerald-200/70
                bg-gradient-to-br from-emerald-100 to-cyan-100
                text-sm text-emerald-700
                dark:border-emerald-400/15
                dark:from-emerald-400/15 dark:to-cyan-400/10
                dark:text-emerald-300
              "
            >
              ✦
            </span>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Quick start
            </h2>
          </div>

          <p className="mt-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            Choose a template and make it your own.
          </p>
        </div>

        <span
          className="
            shrink-0 rounded-full border border-emerald-200/80
            bg-gradient-to-r from-emerald-50 to-cyan-50
            px-3 py-1.5 text-[10px] font-semibold text-emerald-700
            dark:border-emerald-800/60
            dark:from-emerald-950/50 dark:to-cyan-950/40
            dark:text-emerald-300
          "
        >
          {templates.length} templates
        </span>
      </div>

      {/* Template cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <button
            key={template.title}
            type="button"
            onClick={() => onSelect(template.text)}
            aria-label={`Use ${template.title} template`}
            className="
              group relative isolate min-w-0 overflow-hidden
              rounded-xl border border-slate-200/90
              bg-gradient-to-br from-white via-white to-emerald-50/70
              p-4 text-left
              transition-all duration-300 ease-out
              hover:-translate-y-1 hover:border-emerald-300
              hover:shadow-[0_12px_28px_rgba(16,185,129,0.11)]
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-emerald-500
              active:translate-y-0
              dark:border-slate-700/90
              dark:from-[#192630] dark:via-[#17242c] dark:to-[#102b2b]
              dark:hover:border-emerald-700/80
              dark:hover:shadow-[0_12px_28px_rgba(16,185,129,0.09)]
            "
          >
            {/* Card glow */}
            <span
              aria-hidden="true"
              className={`
                pointer-events-none absolute -right-8 -top-8 -z-10
                h-24 w-24 rounded-full blur-2xl
                transition-transform duration-500
                group-hover:scale-150 ${template.glow}
              `}
            />

            {/* Icon and arrow */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl
                  border border-white/80 bg-gradient-to-br text-base
                  shadow-[0_3px_12px_rgba(15,23,42,0.06)]
                  transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-3
                  dark:border-white/5 ${template.iconStyle}
                `}
              >
                {template.icon}
              </span>

              <span
                aria-hidden="true"
                className="
                  flex h-7 w-7 items-center justify-center rounded-full
                  border border-slate-200/80 bg-white/80
                  text-sm text-slate-400
                  transition-all duration-300
                  group-hover:translate-x-0.5
                  group-hover:border-emerald-200
                  group-hover:bg-emerald-50 group-hover:text-emerald-600
                  dark:border-slate-700 dark:bg-slate-800/70
                  dark:text-slate-500
                  dark:group-hover:border-emerald-800
                  dark:group-hover:bg-emerald-950/50
                  dark:group-hover:text-emerald-300
                "
              >
                →
              </span>
            </div>

            {/* Card copy */}
            <h3 className="text-xs font-semibold text-slate-800 transition-colors group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-300">
              {template.title}
            </h3>

            <p className="mt-1.5 min-h-8 text-[10px] leading-4 text-slate-500 dark:text-slate-400">
              {template.description}
            </p>

            <div
              className="
                mt-3 h-px w-full
                bg-gradient-to-r from-emerald-200/80 via-cyan-200/60 to-transparent
                transition-opacity duration-300
                group-hover:from-emerald-400 group-hover:via-cyan-400
                dark:from-emerald-900/70 dark:via-cyan-900/50
                dark:group-hover:from-emerald-600 dark:group-hover:via-cyan-600
              "
            />

            <p className="mt-2 text-[9px] font-medium text-slate-400 transition-colors group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-300">
              Use template
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
