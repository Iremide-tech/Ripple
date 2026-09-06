"use client";

import { motion } from "framer-motion";

const rings = [0, 1, 2, 3];

export default function RippleAnimation() {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center">
      {/* Expanding waves */}
      {rings.map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-400/20"
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 100 + ring * 100, 100 + ring * 100],
            height: [100, 100 + ring * 100, 100 + ring * 100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: ring * 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Orbiting nodes */}
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]"
        animate={{
          x: [0, 170, 0, -170, 0],
          y: [-120, 0, 120, 0, -120],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]"
        animate={{
          x: [120, 0, -120, 0, 120],
          y: [0, 120, 0, -120, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Core */}
      <motion.div
        className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10"
        animate={{
          boxShadow: [
            "0 0 30px rgba(34,211,238,0.1)",
            "0 0 90px rgba(34,211,238,0.35)",
            "0 0 30px rgba(34,211,238,0.1)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <motion.div
          className="h-5 w-5 rounded-full bg-cyan-300"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}