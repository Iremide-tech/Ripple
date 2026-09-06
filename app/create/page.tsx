"use client";

import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Wrench,
  Share2,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

type Ripple = {
  category: string;
  need: string;
  impact: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
  description: string;
};

export default function CreatePage() {
  const [need, setNeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const examples = [
    "A primary school near me needs computers for their students.",
    "A local community needs clean drinking water.",
    "A student needs a laptop to continue learning.",
  ];

  async function createRipple() {
  if (!need.trim()) return;

  console.log("🚀 Button clicked!");

  setLoading(true);

  try {
    console.log("📡 Calling API...");

    const response = await fetch("/api/analyze-ripple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        need,
      }),
    });

    console.log("📨 Response received:", response.status);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    setRipple(data);
  } catch (error) {
    console.error("❌ Frontend error:", error);
    alert("We couldn't create your Ripple. Check the console.");
  } finally {
    setLoading(false);
  }
}

  function reset() {
    setRipple(null);
    setNeed("");
  }

  if (ripple) {
    return (
      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">

          <button
            onClick={reset}
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-cyan-300"
          >
            <RotateCcw size={16} />
            Create another
          </button>

          <div className="mt-16">
            <div className="mb-5 flex items-center gap-2 text-cyan-300">
              <CheckCircle2 size={20} />
              <span className="text-sm font-medium">
                Your Ripple is ready
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              Someone needs help.
              <span className="block text-cyan-300">
                Now people can help.
              </span>
            </h1>
          </div>

          {/* Ripple Card */}
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-8">

            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-300">
                  {ripple.category}
                </span>

                <span className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-semibold text-red-300">
                  {ripple.urgency} URGENCY
                </span>
              </div>

              <h2 className="mt-8 text-3xl font-bold">
                {ripple.need}
              </h2>

              <p className="mt-4 leading-7 text-zinc-400">
                {ripple.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <InfoCard
                  title="People impacted"
                  value={ripple.impact}
                  icon={<Users size={20} />}
                />

                <InfoCard
                  title="Ways you can help"
                  value="Give • Volunteer • Skills • Share"
                  icon={<Heart size={20} />}
                />

              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-semibold text-black transition hover:bg-cyan-200">
                Share this Ripple
                <Share2 size={18} />
              </button>

            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Every Ripple starts with one person caring enough to act.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        <a
          href="/"
          className="text-sm text-zinc-500 transition hover:text-cyan-300"
        >
          ← Back to Ripple
        </a>

        <div className="mt-12">
          <div className="mb-4 flex items-center gap-2 text-cyan-300">
            <Sparkles size={18} />
            <span className="text-sm font-medium">
              Create a Ripple
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Turn a need into
            <span className="block text-cyan-300">
              an opportunity to help.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Describe what someone needs in your own words.
            Ripple will transform it into a clear, actionable cause.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

          <label className="mb-3 block text-sm font-medium text-zinc-300">
            What does someone need?
          </label>

          <textarea
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="Tell us what's happening..."
            rows={7}
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-5 text-lg text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50"
          />

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-zinc-600">
              Be specific. Every detail helps.
            </p>

            <button
              onClick={createRipple}
              disabled={!need.trim() || loading}
              className="flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Creating...
                </>
              ) : (
                <>
                  Create Ripple
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </div>
        </div>

        <div className="mt-8">
          <p className="mb-4 text-sm text-zinc-500">
            Not sure what to write? Try one:
          </p>

          <div className="grid gap-3">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setNeed(example)}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-left text-sm text-zinc-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] hover:text-zinc-200"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        <section className="mt-24">

          <p className="text-sm font-medium text-cyan-300">
            GENEROSITY HAS MANY FORMS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            You don't always have to give money.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <HelpCard
              icon={<Heart size={20} />}
              title="Give"
              description="Contribute resources or funds."
            />

            <HelpCard
              icon={<Users size={20} />}
              title="Volunteer"
              description="Give your time to a cause."
            />

            <HelpCard
              icon={<Wrench size={20} />}
              title="Skills"
              description="Use what you know to help."
            />

            <HelpCard
              icon={<Share2 size={20} />}
              title="Share"
              description="Help a ripple reach further."
            />

          </div>
        </section>

      </div>
    </main>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-sm text-zinc-400">{title}</span>
      </div>

      <p className="font-semibold">{value}</p>
    </div>
  );
}

function HelpCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-cyan-400/20">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}