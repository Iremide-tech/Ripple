"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Ripple link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-black transition hover:scale-105"
    >
      Share Ripple
      <Share2 size={18} />
    </button>
  );
}