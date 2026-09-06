"use client";

import { useState } from "react";
import {
  HandHeart,
  Wrench,
  Package,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react";

import ContributionModal from "./ContributionModal";

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

export default function WaysToHelp({
  rippleId,
}: {
  rippleId: string;
}) {
  const [selectedHelp, setSelectedHelp] = useState<string | null>(null);

  return (
    <>
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
                onClick={() => setSelectedHelp(way.title)}
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

      <ContributionModal
        rippleId={rippleId}
        helpType={selectedHelp || ""}
        isOpen={selectedHelp !== null}
        onClose={() => setSelectedHelp(null)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}