
"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "./components/Sidebar";
import VoiceSettings from "./components/VoiceSettings";
import TextEditor from "./components/TextEditor";
import AudioPlayer from "./components/AudioPlayer";
import QuickTemplates from "./components/QuickTemplates";
import ThemeToggle from "./components/ThemeToggle";

interface SpeechSettings {
  language: string;
  voice: string;
  style: string;
  speed: number;
}

type Section = "Speech Studio" | "My Audio" | "Templates";

const DEFAULT_SETTINGS: SpeechSettings = {
  language: "English (US)",
  voice: "Sofia",
  style: "Natural",
  speed: 1,
};

const VOICE_ID_MAP: Record<string, string> = {
  Sofia: "EXAVITQu4vr4xnSDxMaL",
  Emma: "Xb7hH8MSUJpSbSDYk0k2",
  James: "IKne3meq5aSn9XLyUdCD",
  Daniel: "onwK4e9ZLuTAKqWW03F9",
};

const getFriendlyError = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (
    error instanceof TypeError ||
    (error instanceof Error &&
      /failed to fetch|networkerror|load failed/i.test(error.message))
  ) {
    return "Unable to connect to the server. Please make sure the backend is running and try again.";
  }

  return error instanceof Error ? error.message : fallbackMessage;
};

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  const [activeSection, setActiveSection] =
    useState<Section>("Speech Studio");

  const [speechSettings, setSpeechSettings] =
    useState<SpeechSettings>(DEFAULT_SETTINGS);

  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      previewAudioRef.current?.pause();

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  const clearGeneratedAudio = () => {
    setGenerated(false);
    setAudioUrl(null);
  };

  const handleTextChange = (value: string) => {
    setText(value);

    if (value.trim()) {
      setValidationError("");
    }

    clearGeneratedAudio();
  };

  const handleTemplateSelect = (templateText: string) => {
    setText(templateText);
    setValidationError("");
    clearGeneratedAudio();
    setActiveSection("Speech Studio");
  };

  const handlePreview = async () => {
    if (previewLoading || loading) return;

    const actualVoiceId = VOICE_ID_MAP[speechSettings.voice];

    if (!actualVoiceId) {
      alert("Selected voice is not configured.");
      return;
    }

    const previewText =
      speechSettings.language === "Hindi"
        ? "नमस्ते! Vocalis में आपका स्वागत है।"
        : "Hello! Welcome to Vocalis. Let's turn your words into expressive speech.";

    setPreviewLoading(true);

    try {
      previewAudioRef.current?.pause();

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      const response = await fetch(
        "https://vocalis-q9qf.onrender.com/api/tts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: previewText,
            voice: actualVoiceId,
            speed: speechSettings.speed,
            language: speechSettings.language,
            style: speechSettings.style,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error ||
            errorData?.message ||
            "Voice preview failed. Please try again."
        );
      }

      const audioBlob = await response.blob();

      if (!audioBlob.size) {
        throw new Error("The server returned an empty audio file.");
      }

      const newPreviewUrl = URL.createObjectURL(audioBlob);
      previewUrlRef.current = newPreviewUrl;

      const previewAudio = new Audio(newPreviewUrl);
      previewAudioRef.current = previewAudio;

      previewAudio.onended = () => {
        if (previewUrlRef.current === newPreviewUrl) {
          URL.revokeObjectURL(newPreviewUrl);
          previewUrlRef.current = null;
          previewAudioRef.current = null;
        }
      };

      await previewAudio.play();
    } catch (error) {
      console.error("Voice preview error:", error);

      alert(
        getFriendlyError(
          error,
          "Something went wrong while previewing the voice."
        )
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleGenerate = async () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setValidationError(
        "Please enter some text to generate speech."
      );
      return;
    }

    if (loading) return;

    setValidationError("");

    const actualVoiceId = VOICE_ID_MAP[speechSettings.voice];

    if (!actualVoiceId) {
      alert("Selected voice is not configured.");
      return;
    }

    setLoading(true);
    clearGeneratedAudio();

    try {
      const response = await fetch(
        "https://vocalis-q9qf.onrender.com/api/tts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: trimmedText,
            voice: actualVoiceId,
            speed: speechSettings.speed,
            language: speechSettings.language,
            style: speechSettings.style,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error ||
            errorData?.message ||
            "Audio generation failed. Please try again."
        );
      }

      const audioBlob = await response.blob();

      if (!audioBlob.size) {
        throw new Error("The server returned an empty audio file.");
      }

      const newAudioUrl = URL.createObjectURL(audioBlob);

      setAudioUrl(newAudioUrl);
      setGenerated(true);
    } catch (error) {
      console.error("Audio generation error:", error);

      alert(
        getFriendlyError(
          error,
          "Something went wrong while generating audio."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const renderPageHeader = (
    title: string,
    description: string
  ) => (
    <header className="relative mb-8 flex flex-col items-center justify-center text-center">
      <div className="absolute right-0 top-0">
        <ThemeToggle />
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
        Vocalis Studio
      </p>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h1>

      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#f5f9f8] text-slate-900 transition-colors duration-300 dark:bg-[#080e12] dark:text-slate-100">
      <Sidebar
        activeSection={activeSection}
        onNavigate={(section) => setActiveSection(section as Section)}
      />

      <main className="ml-[260px] min-h-screen transition-colors duration-300 max-lg:ml-0">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-7 lg:px-9">

          {/* SPEECH STUDIO */}
          {activeSection === "Speech Studio" && (
            <>
              {renderPageHeader(
                "Speech Studio",
                "Turn your words into expressive speech."
              )}

              <section className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-6 min-[1100px]:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.8fr)]">

                <div className="min-w-0 space-y-5">
                  <TextEditor
                    text={text}
                    setText={handleTextChange}
                  />

                  {/* ORIGINAL QUICK TEMPLATES RESTORED */}
                  <QuickTemplates
                    onSelect={handleTemplateSelect}
                  />

                  <AudioPlayer
                    generated={generated}
                    audioUrl={audioUrl}
                  />
                </div>

                <div className="min-w-0 space-y-4">
                  <VoiceSettings
                    onSettingsChange={setSpeechSettings}
                    onPreview={handlePreview}
                    previewLoading={previewLoading}
                  />

                  <div className="relative z-20 block w-full">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading}
                      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading
                        ? "Generating audio..."
                        : "✦ Generate Speech"}
                    </button>

                    {validationError && (
                      <p
                        role="alert"
                        className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600 dark:border-red-500/20 dark:bg-red-400/10 dark:text-red-400"
                      >
                        ⚠ {validationError}
                      </p>
                    )}
                  </div>

                  {/* STUDIO INSIGHTS */}
                  <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/70">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                        ✦
                      </span>

                      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Studio Insights
                      </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Add your text, choose your preferred voice, and generate
                      audio to preview your speech.
                    </p>

                    <div className="mt-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800/80">
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        Quick tip
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                        Use punctuation and short sentences to make speech
                        sound more natural.
                      </p>
                    </div>
                  </section>
                </div>
              </section>
            </>
          )}

          {/* MY AUDIO */}
          {activeSection === "My Audio" && (
            <>
              {renderPageHeader(
                "My Audio",
                "Access and manage your generated speech."
              )}

              <section className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-slate-200 bg-white/90 px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-2xl text-emerald-600 dark:from-emerald-400/15 dark:to-cyan-400/10 dark:text-emerald-400">
                    ♫
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Your audio library
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Your generated audio history will appear here. Start
                    creating speech in Vocalis Studio.
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveSection("Speech Studio")}
                    className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110"
                  >
                    ✦ Create Speech
                  </button>
                </div>
              </section>
            </>
          )}

          {/* TEMPLATES PAGE */}
          {activeSection === "Templates" && (
            <>
              {renderPageHeader(
                "Quick Templates",
                "Choose a ready-made template to start creating speech."
              )}

              <section className="mx-auto max-w-[1200px]">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-7">
                  <QuickTemplates
                    onSelect={handleTemplateSelect}
                  />
                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
fetch