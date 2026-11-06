"use client";

interface StudioCompanionProps {
  text: string;
}

export default function StudioCompanion({
  text,
}: StudioCompanionProps) {
  const trimmedText = text.trim();

  const characters = text.length;
  const words = trimmedText
    ? trimmedText.split(/\s+/).length
    : 0;

  const estimatedSeconds = Math.ceil((words / 150) * 60);
  const duration =
    estimatedSeconds < 60
      ? `${estimatedSeconds} sec`
      : `${Math.floor(estimatedSeconds / 60)} min ${
          estimatedSeconds % 60
        } sec`;

  const waveform = [
    12, 20, 15, 29, 19, 35, 23, 16, 31, 22, 40, 25,
    17, 32, 21, 38, 27, 16, 30, 22, 36, 18, 27, 14,
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#17242c] p-5 text-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      {/* Heading */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">
            Voice Studio Companion
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Your script at a glance
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <span aria-hidden="true">♫</span>
        </div>
      </div>

      {/* Live statistics */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-slate-700/70 bg-[#111b23] p-3">
          <p className="text-[10px] text-slate-400">
            Characters
          </p>
          <p className="mt-1 text-lg font-semibold text-emerald-300">
            {characters}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/70 bg-[#111b23] p-3">
          <p className="text-[10px] text-slate-400">
            Words
          </p>
          <p className="mt-1 text-lg font-semibold text-cyan-300">
            {words}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/70 bg-[#111b23] p-3">
          <p className="text-[10px] text-slate-400">
            Est. duration
          </p>
          <p className="mt-1 text-sm font-semibold text-violet-300">
            {duration}
          </p>
        </div>
      </div>

      {/* Waveform visual */}
      <div className="mt-5 rounded-xl border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.08] to-cyan-400/[0.04] px-4 py-5">
        <div className="flex h-12 items-center justify-center gap-1">
          {waveform.map((height, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-cyan-300 opacity-80"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs font-medium text-slate-300">
          {words > 0
            ? "Your script is ready for the studio"
            : "Your next voice starts with a few words"}
        </p>

        <p className="mt-1 text-center text-[10px] text-slate-500">
          {words > 0
            ? "Estimated duration at 150 words per minute"
            : "Write your text to see live statistics"}
        </p>
      </div>
    </section>
  );
}