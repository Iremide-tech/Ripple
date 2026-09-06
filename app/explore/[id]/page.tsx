"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Users,
  Clock,
  Share2,
  HandHeart,
  Wrench,
  Package,
  CircleDollarSign,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const ripples = [
  {
    id: "1",
    category: "Education",
    title: "Help 200 students access digital education",
    description:
      "A community school has over 200 students but only two working computers. The school wants to give students access to digital learning and programming resources.",
    impact: "200 students",
    progress: 65,
    contributors: 24,
    location: "Local Community",
    urgency: "HIGH",
  },
  {
    id: "2",
    category: "Environment",
    title: "Restore clean drainage in our community",
    description:
      "Blocked drainage systems are causing flooding during heavy rainfall. Community members are working together to restore and maintain safe drainage.",
    impact: "500 residents",
    progress: 42,
    contributors: 18,
    location: "Local Community",
    urgency: "MEDIUM",
  },
  {
    id: "3",
    category: "Community",
    title: "Support elderly residents with weekly groceries",
    description:
      "Volunteers are needed to help elderly people access essential groceries and support within their community.",
    impact: "35 residents",
    progress: 78,
    contributors: 41,
    location: "Local Community",
    urgency: "MEDIUM",
  },
];

const waysToHelp = [
  {
    title: "Donate",
    description: "Contribute funds toward the resources needed.",
    icon: CircleDollarSign,
  },
  {
    title: "Volunteer",
    description: "Give some of your time and help directly.",
    icon: HandHeart,
  },
  {
    title: "Share a Skill",
    description: "Use what you know to make an impact.",
    icon: Wrench,
  },
  {
    title: "Give Resources",
    description: "Donate useful items or equipment.",
    icon: Package,
  },
];

export default function RippleDetailPage() {
  const params = useParams();
  const id = params.id;

  const ripple = ripples.find((r) => r.id === id) || ripples[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 lg:px-10">

        {/* Nav */}
        <nav className="flex items-center justify-between">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          <Link
            href="/create"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            Create a Ripple
          </Link>
        </nav>

        {/* Hero */}
        <section className="mt-20 max-w-4xl">

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-wider text-cyan-300">
              {ripple.category.toUpperCase()}
            </span>

            <span className="rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-medium text-red-300">
              {ripple.urgency} URGENCY
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
            {ripple.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
            {ripple.description}
          </p>
        </section>

        {/* Stats */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">

          <StatCard
            icon={<Users size={20} />}
            label="People impacted"
            value={ripple.impact}
          />

          <StatCard
            icon={<Heart size={20} />}
            label="People helping"
            value={`${ripple.contributors}`}
          />

          <StatCard
            icon={<Clock size={20} />}
            label="Location"
            value={ripple.location}
          />

        </section>

        {/* Progress */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Ripple progress</p>
              <p className="mt-1 text-sm text-zinc-500">
                Small actions are creating bigger impact.
              </p>
            </div>

            <span className="text-2xl font-bold text-cyan-300">
              {ripple.progress}%
            </span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-cyan-300 transition-all duration-1000"
              style={{ width: `${ripple.progress}%` }}
            />
          </div>

        </section>

        {/* Ripple Visualization */}
        <section className="relative mt-20 overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-cyan-400/[0.03] px-6 py-20 text-center">

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-28 w-28 rounded-full border border-cyan-400/40 animate-ping opacity-20" />
            <div className="absolute h-52 w-52 rounded-full border border-cyan-400/20" />
            <div className="absolute h-80 w-80 rounded-full border border-cyan-400/10" />
          </div>

          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-300 text-black shadow-[0_0_60px_rgba(103,232,249,0.3)]">
              <Heart size={30} fill="currentColor" />
            </div>

            <h2 className="mt-10 text-3xl font-bold md:text-4xl">
              One act can travel further than you think.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Every person who contributes creates another wave of possibility.
              That's how generosity grows.
            </p>
          </div>

        </section>

        {/* Ways to help */}
        <section className="mt-24">

          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wider text-cyan-300">
              TAKE ACTION
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              How can you help?
            </h2>

            <p className="mt-4 text-zinc-400">
              Generosity isn't limited to money. Choose the way that works for you.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            {waysToHelp.map((way) => {
              const Icon = way.icon;

              return (
                <button
                  key={way.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.03]"
                >
                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                      <Icon size={23} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-zinc-600 transition group-hover:text-cyan-300"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {way.title}
                  </h3>

                  <p className="mt-2 leading-7 text-zinc-500">
                    {way.description}
                  </p>

                </button>
              );
            })}

          </div>
        </section>

        {/* Share */}
        <section className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:flex-row">

          <div>
            <h3 className="text-xl font-semibold">
              Can't help directly?
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Sharing this ripple might connect it with someone who can.
            </p>
          </div>

          <button
            onClick={() => navigator.share?.({
              title: ripple.title,
              text: ripple.description,
              url: window.location.href,
            })}
            className="flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Share Ripple
            <Share2 size={18} />
          </button>

        </section>

      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-sm text-zinc-500">{label}</span>
      </div>

      <p className="mt-4 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}