"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  Users,
  Heart,
  GraduationCap,
  Trees,
  HandHeart,
  Filter,
} from "lucide-react";

const ripples = [
  {
    id: 1,
    category: "Education",
    title: "Help 200 students access digital education",
    description:
      "A community school has over 200 students but only two working computers.",
    impact: "200 students",
    progress: 65,
    contributors: 24,
    icon: GraduationCap,
  },
  {
    id: 2,
    category: "Environment",
    title: "Restore clean drainage in our community",
    description:
      "Blocked drainage systems are causing flooding during heavy rainfall.",
    impact: "500 residents",
    progress: 42,
    contributors: 18,
    icon: Trees,
  },
  {
    id: 3,
    category: "Community",
    title: "Support elderly residents with weekly groceries",
    description:
      "Volunteers are needed to help elderly people access essential groceries.",
    impact: "35 residents",
    progress: 78,
    contributors: 41,
    icon: HandHeart,
  },
  {
    id: 4,
    category: "Education",
    title: "Give a young learner access to a laptop",
    description:
      "A student needs a laptop and internet access to continue online learning.",
    impact: "1 student",
    progress: 30,
    contributors: 7,
    icon: GraduationCap,
  },
  {
    id: 5,
    category: "Community",
    title: "Build a safe learning space for children",
    description:
      "A local youth center needs books, furniture, and volunteer tutors.",
    impact: "80 children",
    progress: 55,
    contributors: 29,
    icon: Heart,
  },
  {
    id: 6,
    category: "Environment",
    title: "Plant trees to protect our neighborhood",
    description:
      "A community initiative is working to restore green spaces and reduce heat.",
    impact: "Local community",
    progress: 21,
    contributors: 12,
    icon: Trees,
  },
];

const categories = ["All", "Education", "Environment", "Community"];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredRipples = useMemo(() => {
    return ripples.filter((ripple) => {
      const matchesCategory =
        activeCategory === "All" ||
        ripple.category === activeCategory;

      const matchesSearch =
        ripple.title.toLowerCase().includes(search.toLowerCase()) ||
        ripple.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-400px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
              <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
            </div>

            <span className="text-xl font-semibold">
              ripple<span className="text-cyan-400">.</span>
            </span>
          </a>

          <a
            href="/create"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            Create a Ripple
          </a>
        </nav>

        {/* Header */}
        <section className="mt-24 max-w-3xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            LIVE COMMUNITY NEEDS
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Find a ripple.
            <span className="block text-cyan-300">
              Become part of it.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Every ripple represents someone, somewhere, who could use a little
            help. Explore causes and discover how you can make an impact.
          </p>
        </section>

        {/* Search */}
        <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
            <Search size={20} className="text-zinc-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a cause..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Filter size={16} />
            {filteredRipples.length} ripples found
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                activeCategory === category
                  ? "bg-cyan-300 text-black"
                  : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-cyan-400/30 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredRipples.map((ripple) => {
            const Icon = ripple.icon;

            return (
           <Link
  href={`/explore/${ripple.id}`}
  key={ripple.id}
  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
>
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.04] blur-3xl transition group-hover:bg-cyan-400/[0.1]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                      <Icon size={21} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-zinc-600 transition group-hover:text-cyan-300"
                    />
                  </div>

                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                    {ripple.category}
                  </p>

                  <h2 className="mt-3 text-xl font-semibold leading-snug">
                    {ripple.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {ripple.description}
                  </p>

                  {/* Progress */}
                  <div className="mt-7">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Ripple progress
                      </span>

                      <span className="font-medium text-white">
                        {ripple.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-cyan-300 transition-all duration-1000"
                        style={{ width: `${ripple.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Users size={15} />
                      {ripple.impact}
                    </div>

                    <div className="flex items-center gap-2">
                      <Heart size={15} />
                      {ripple.contributors}
                    </div>
                  </div>
                </div>
                </Link>
            );
          })}
        </section>

        {/* Empty state */}
        {filteredRipples.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg text-zinc-400">
              No ripples found.
            </p>

            <p className="mt-2 text-sm text-zinc-600">
              Maybe you're the one who needs to start one.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <section className="relative mt-28 overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-cyan-400/[0.03] px-8 py-16 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

          <div className="relative">
            <p className="text-sm font-medium text-cyan-300">
              HAVE SOMETHING WORTH CHANGING?
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Start the next ripple.
            </h2>

            <a
              href="/create"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-7 py-3.5 font-semibold text-black transition hover:scale-105"
            >
              Create a Ripple
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}