

"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  generated: boolean;
  audioUrl: string | null;
}

const waveform = [
  8, 14, 20, 11, 17, 24, 13, 19, 9, 22, 16, 26,
  12, 18, 23, 10, 15, 21, 13, 25, 17, 9, 19, 23,
  14, 26, 11, 18, 22, 13, 20, 10, 16, 24, 12, 19,
  15, 23,
];

export default function AudioPlayer({
  generated,
  audioUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [generated, audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio playback error:", error);
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;

    setCurrentTime(current);
    setDuration(total);
    setProgress(total ? (current / total) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newProgress = Number(event.target.value);
    const newTime =
      (newProgress / 100) * (audioRef.current.duration || 0);

    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const handleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <section
      className="
        group relative isolate overflow-hidden rounded-2xl
        border border-emerald-200/70 bg-white
        shadow-[0_8px_30px_rgba(15,70,52,0.05)]
        transition-all duration-300
        hover:border-emerald-300
        hover:shadow-[0_12px_36px_rgba(16,185,129,0.09)]
        dark:border-slate-700/80 dark:bg-[#17242c]
        dark:shadow-[0_14px_40px_rgba(0,0,0,0.18)]
      "
    >
      {/* Ambient colour accents */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-20 -top-20 -z-10
          h-48 w-48 rounded-full bg-emerald-300/15 blur-3xl
          transition-transform duration-700 group-hover:scale-125
          dark:bg-emerald-400/8
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-20 -left-20 -z-10
          h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl
          dark:bg-cyan-400/8
        "
      />

      {/* Header */}
      <div
        className="
          relative flex items-center justify-between gap-3
          border-b border-emerald-100/80
          bg-gradient-to-r from-emerald-50/70 via-white to-cyan-50/70
          px-5 py-4 sm:px-6
          dark:border-slate-700/80
          dark:from-emerald-950/25 dark:via-[#17242c] dark:to-cyan-950/20
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center rounded-xl
              border border-emerald-200/70
              bg-gradient-to-br from-emerald-100 to-cyan-100
              text-lg text-emerald-700
              shadow-[0_3px_12px_rgba(16,185,129,0.10)]
              transition-transform duration-300 group-hover:scale-105
              dark:border-emerald-400/15
              dark:from-emerald-400/15 dark:to-cyan-400/10
              dark:text-emerald-300
            "
          >
            ♫
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Your audio
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Generated speech preview
            </p>
          </div>
        </div>

        {generated && audioUrl && (
          <span
            className="
              inline-flex items-center gap-1.5 rounded-full
              border border-emerald-200/80 bg-emerald-50
              px-3 py-1.5 text-[10px] font-semibold text-emerald-700
              dark:border-emerald-800/70 dark:bg-emerald-950/40
              dark:text-emerald-300
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Ready
          </span>
        )}
      </div>

      {!generated || !audioUrl ? (
        /* Empty state */
        <div className="relative flex min-h-[250px] flex-col items-center justify-center px-5 py-10 text-center sm:px-8">
          <div className="relative mb-5 flex h-24 w-52 items-center justify-center">
            <div
              aria-hidden="true"
              className="
                absolute h-24 w-24 rounded-full
                bg-gradient-to-br from-emerald-200/50 to-cyan-200/50
                blur-2xl dark:from-emerald-400/10 dark:to-cyan-400/10
              "
            />

            <div
              className="
                relative flex h-[68px] w-[68px] items-center justify-center
                rounded-2xl border border-emerald-200/80
                bg-gradient-to-br from-emerald-50 via-white to-cyan-50
                shadow-[0_10px_30px_rgba(16,185,129,0.10)]
                transition-transform duration-500 group-hover:scale-105
                dark:border-emerald-500/20
                dark:from-emerald-400/10 dark:via-[#17242c] dark:to-cyan-400/10
              "
            >
              <span className="text-2xl text-emerald-600 dark:text-emerald-300">
                ♫
              </span>
            </div>

            <div
              aria-hidden="true"
              className="
                absolute inset-x-0 bottom-0 flex h-9
                items-center justify-center gap-[3px]
              "
            >
              {waveform.slice(0, 28).map((height, index) => (
                <span
                  key={index}
                  className="
                    w-[3px] rounded-full
                    bg-gradient-to-t from-emerald-400 to-cyan-400
                    opacity-50 transition-opacity duration-300
                    group-hover:opacity-90
                  "
                  style={{ height: `${Math.max(5, height / 2)}px` }}
                />
              ))}
            </div>
          </div>

          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Your next creation starts here
          </h3>

          <p className="mt-2 max-w-[330px] text-[11px] leading-5 text-slate-500 dark:text-slate-400">
            Enter your text and generate speech. Your audio will appear here,
            ready to play or download.
          </p>

          <div
            className="
              mt-5 inline-flex items-center gap-2 rounded-full
              border border-emerald-200/80
              bg-gradient-to-r from-emerald-50 to-cyan-50
              px-3.5 py-2 text-[10px] font-semibold text-emerald-700
              dark:border-emerald-800/60
              dark:from-emerald-950/50 dark:to-cyan-950/40
              dark:text-emerald-300
            "
          >
            <span>✦</span>
            <span>Ready for your first generation</span>
          </div>
        </div>
      ) : (
        /* Audio controls */
        <div className="relative p-5 sm:p-6">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            preload="metadata"
          />

          {/* Main player */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause audio" : "Play audio"}
              className="
                flex h-14 w-14 shrink-0 items-center justify-center
                rounded-full border border-white/30
                bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500
                text-base text-white
                shadow-[0_8px_24px_rgba(16,185,129,0.24)]
                transition-all duration-300
                hover:scale-105
                hover:shadow-[0_12px_30px_rgba(16,185,129,0.30)]
                active:scale-95
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-emerald-500
                dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300
                dark:text-slate-950
              "
            >
              {playing ? "Ⅱ" : "▶"}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                    Vocalis generated audio
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    Audio preview
                  </p>
                </div>

                <span className="shrink-0 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-medium tabular-nums text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Waveform */}
              <div
                className="mt-3 flex h-8 items-center gap-[3px] overflow-hidden"
                aria-hidden="true"
              >
                {waveform.map((height, index) => {
                  const active =
                    duration > 0 &&
                    (index / waveform.length) * 100 <= progress;

                  return (
                    <span
                      key={index}
                      className={`
                        w-[3px] shrink-0 rounded-full transition-colors duration-200
                        ${
                          active
                            ? "bg-gradient-to-t from-emerald-500 to-cyan-400"
                            : "bg-slate-200 dark:bg-slate-700"
                        }
                      `}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seek bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="audio-progress"
                className="text-[10px] font-medium text-slate-500 dark:text-slate-400"
              >
                Playback
              </label>
              <span className="text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
                {Math.round(progress)}%
              </span>
            </div>

            <input
              id="audio-progress"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              aria-label="Audio progress"
              className="
                h-1.5 w-full cursor-pointer appearance-none rounded-full
                bg-emerald-100 accent-emerald-500
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-emerald-500
                dark:bg-slate-700
              "
              style={{
                background: `linear-gradient(to right, #10b981 0%, #22d3ee ${progress}%, ${
                  typeof window === "undefined" ? "#d1fae5" : "#d1fae5"
                } ${progress}%, #d1fae5 100%)`,
              }}
            />
          </div>

          {/* Volume and download */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div
              className="
                flex items-center gap-3 rounded-xl
                border border-slate-200/80 bg-slate-50/80 px-3 py-2
                dark:border-slate-700 dark:bg-slate-800/50
              "
            >
              <label
                htmlFor="audio-volume"
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {volume === 0 ? "🔇" : "🔊"}
              </label>

              <input
                id="audio-volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                aria-label="Volume"
                className="
                  h-1.5 w-20 cursor-pointer accent-emerald-500
                  sm:w-24
                "
              />

              <span className="w-8 text-right text-[9px] tabular-nums text-slate-400 dark:text-slate-500">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <a
              href={audioUrl}
              download="vocalis-audio.mp3"
              className="
                group/download inline-flex items-center gap-2
                rounded-xl border border-emerald-200/80
                bg-gradient-to-r from-emerald-50 to-cyan-50
                px-4 py-2.5 text-[11px] font-semibold text-emerald-700
                transition-all duration-300
                hover:-translate-y-0.5 hover:border-emerald-300
                hover:shadow-[0_8px_20px_rgba(16,185,129,0.10)]
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-emerald-500
                dark:border-emerald-800/60
                dark:from-emerald-950/50 dark:to-cyan-950/40
                dark:text-emerald-300
              "
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/download:translate-y-0.5"
              >
                ↓
              </span>
              Download audio
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
