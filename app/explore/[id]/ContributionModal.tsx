"use client";

import { useState } from "react";
import { X, Heart, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Props = {
  rippleId: string;
  helpType: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ContributionModal({
  rippleId,
  helpType,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await supabase.from("contributions").insert({
        ripple_id: rippleId,
        helper_name: name || "Anonymous",
        help_type: helpType,
        message,
      });

      if (error) throw error;

      // Update contributor count
      const { data: ripple } = await supabase
        .from("ripples")
        .select("contributors")
        .eq("id", rippleId)
        .single();

      if (ripple) {
        await supabase
          .from("ripples")
          .update({
            contributors: (ripple.contributors || 0) + 1,
          })
          .eq("id", rippleId);
      }

      setSuccess(true);

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1800);
    } catch (error) {
      console.error("Contribution error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              <CheckCircle2 size={34} />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              You're part of the ripple 🌊
            </h2>

            <p className="mt-3 text-zinc-400">
              Your willingness to help has been recorded. Small actions can
              travel further than we think.
            </p>
          </div>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Heart size={23} />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Join this Ripple
            </h2>

            <p className="mt-2 text-zinc-400">
              You're offering to <span className="text-cyan-300">{helpType}</span>.
              Tell the community a little about how you'd like to help.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Your name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous is okay too"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How would you like to help?"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-cyan-400/50"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 py-3.5 font-semibold text-black transition hover:bg-cyan-200 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Joining Ripple...
                  </>
                ) : (
                  <>
                    <Heart size={18} />
                    Join the Ripple
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}