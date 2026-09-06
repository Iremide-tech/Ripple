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

type Ripple = {
  id: string;
  category: string;
  title: string;
  description: string;
  impact: string;
  urgency: string;
  progress: number;
  contributors: number;
  location: string;
};

const categories = ["All", "Education", "Environment", "Community"];

export default function ExploreClient({
  ripples,
}: {
  ripples: Ripple[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredRipples = useMemo(() => {
    return ripples.filter((ripple) => {
      const matchesCategory =
        activeCategory === "All" ||
        ripple.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        ripple.title.toLowerCase().includes(search.toLowerCase()) ||
        ripple.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, ripples]);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "education":
        return GraduationCap;
      case "environment":
        return Trees;
      default:
        return HandHeart;
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-400px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
              <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
            </div>

            <span className="text-xl font-semibold">
              ripple<span className="text-cyan-400">.</span>
            </span>
          </Link>

          <Link
            href="/create"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            Create a Ripple
          </Link>
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
            const Icon = getIcon(ripple.category);

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
                        className="h-full rounded-full bg-cyan-300"
                        style={{ width: `${ripple.progress}%` }}
                      />
                    </div>
                  </div>

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

        {filteredRipples.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg text-zinc-400">
              No ripples found yet.
            </p>

            <Link
              href="/create"
              className="mt-4 inline-block text-sm text-cyan-300 hover:underline"
            >
              Be the first to start one →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}