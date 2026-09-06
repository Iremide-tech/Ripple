import Link from "next/link";
import RippleAnimation from "@/components/RippleAnimations";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
     
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-300px] left-[-100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>


      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
            <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
          </div>

          <span className="text-xl font-semibold tracking-tight">
            ripple<span className="text-cyan-400">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <Link
            href="/explore"
            className="transition hover:text-white"
          >
            Explore
          </Link>

          <Link
            href="/impact"
            className="transition hover:text-white"
          >
            Impact
          </Link>

          <Link
            href="/create"
            className="rounded-full border border-white/10 px-5 py-2.5 text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            Create a Ripple
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 pb-24 pt-12 lg:px-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              Generosity, amplified.
            </div>

            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              Small acts.
              <br />
              <span className="text-cyan-400">Infinite impact.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Ripple connects people who need help with people ready to give
              it — through money, skills, time, and resources.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/explore"
                className="rounded-full bg-white px-7 py-3.5 text-center font-medium text-black transition hover:scale-[1.02] hover:bg-cyan-300"
              >
                Explore causes →
              </Link>

              <Link
                href="/create"
                className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-center font-medium text-white backdrop-blur transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                Start a Ripple
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-zinc-500">
              <div>
                <p className="text-xl font-semibold text-white">128</p>
                <p>Ripples started</p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-xl font-semibold text-white">₦2.4M</p>
                <p>Impact created</p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-xl font-semibold text-white">842</p>
                <p>People helped</p>
              </div>
            </div>
          </div>

        <div className="relative">
  <RippleAnimation />

  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
    <p className="text-sm font-medium text-zinc-300">
      One act starts a ripple.
    </p>

    <p className="mt-1 text-xs text-zinc-600">
      And it can travel further than you think.
    </p>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}