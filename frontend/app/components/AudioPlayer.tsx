
"use client";

interface AudioPlayerProps {
  generated: boolean;
  audioUrl: string | null;
}

export default function AudioPlayer({
  generated,
  audioUrl,
}: AudioPlayerProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/80">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
          ♫
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Your Audio
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Preview your generated speech
          </p>
        </div>

        {generated && audioUrl && (
          <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
            Ready
          </span>
        )}
      </div>

      {/* Audio content */}
      <div className="p-5">
        {generated && audioUrl ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-500/20 dark:bg-slate-800/70">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm dark:bg-slate-700 dark:text-emerald-400">
                <span className="text-lg">▶</span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Speech generated successfully
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your audio is ready to play.
                </p>
              </div>
            </div>

            <audio
              key={audioUrl}
              controls
              preload="metadata"
              className="w-full"
              src={audioUrl}
            >
              Your browser does not support audio playback.
            </audio>

            <a
              href={audioUrl}
              download="vocalis-speech.mp3"
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <span>↓</span>
              Download Audio
            </a>
          </div>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-800/40">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-2xl text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-400">
              ♫
            </div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Your audio will appear here
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Write something in the text editor and click Generate Speech
              to listen to your voice.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
