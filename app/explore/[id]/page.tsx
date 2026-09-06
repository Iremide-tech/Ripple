import { supabase } from "@/lib/supabase";
import Link from "next/link";
import WaysToHelp from "./WaysToHelp";
import { notFound } from "next/navigation";
import ShareButton from "./ShareButton";
import {
  ArrowLeft,
  Heart,
  Users,
  Clock,

} from "lucide-react";



export default async function RippleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: ripple, error } = await supabase
    .from("ripples")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !ripple) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {/* Navigation */}
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

            <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-medium text-orange-300">
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
            value={ripple.impact || "Not specified"}
          />

          <StatCard
            icon={<Heart size={20} />}
            label="People helping"
            value={`${ripple.contributors || 0}`}
          />

          <StatCard
            icon={<Clock size={20} />}
            label="Location"
            value={ripple.location || "Community"}
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
              {ripple.progress || 0}%
            </span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-cyan-300 transition-all duration-1000"
              style={{ width: `${ripple.progress || 0}%` }}
            />
          </div>
        </section>

        {/* Ripple Visualization */}
        <section className="relative mt-20 overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-cyan-400/[0.03] px-6 py-20 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-28 w-28 animate-ping rounded-full border border-cyan-400/40 opacity-20" />
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

       <WaysToHelp rippleId={ripple.id} />

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

          <ShareButton
            title={ripple.title}
            description={ripple.description}
          />
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

      <p className="mt-4 text-xl font-semibold">{value}</p>
    </div>
  );
}