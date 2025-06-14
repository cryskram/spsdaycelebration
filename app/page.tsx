"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const photos = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
  "/photos/photo6.jpg",
  "/photos/photo7.jpg",
  "/photos/photo8.jpg",
];

function CakeSVG({ blownOut }: { blownOut: boolean }) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewBox="0 0 400 400"
      className={`${
        blownOut ? "animate-none" : "animate-subtle-bounce"
      } w-[550px] h-[400px] `}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect x="50" y="290" width="300" height="50" rx="12" fill="#065f46" />
        <rect x="70" y="230" width="260" height="50" rx="12" fill="#10b981" />
        <rect x="90" y="140" width="220" height="80" rx="12" fill="#bbf7d0" />
      </g>

      <image
        href="/sps-logo.png"
        x="160"
        y="130"
        width="80"
        height="100"
        preserveAspectRatio="xMidYMid meet"
      />

      {[190, 200, 210].map((x, i) => (
        <g key={`candle-${i}`}>
          <rect x={x} y={100} width={6} height={40} fill="#facc15" rx={2} />
          {!blownOut && (
            <motion.ellipse
              cx={x + 3}
              cy={95}
              rx={4}
              ry={6}
              fill="#f97316"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
            />
          )}
        </g>
      ))}
    </motion.svg>
  );
}

export default function HomePage() {
  const [blownOut, setBlownOut] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-green-950 text-white flex flex-col items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl mb-6 text-center">
          IEEE SPS Bangalore Chapter Celebrates
        </h1>
        <h1 className="text-xl md:text-3xl font-bold">🎉 IEEE SPS Day 🎉</h1>
      </div>

      <div className="cursor-pointer" onClick={() => setBlownOut(true)}>
        <CakeSVG blownOut={blownOut} />
      </div>

      {blownOut && (
        <Confetti width={window.innerWidth} height={window.innerHeight / 2} />
      )}

      <AnimatePresence>
        {blownOut && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-4 mt-10"
          >
            {photos.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt={`Celebration ${i + 1}`}
                className="h-auto w-auto object-contain rounded-lg shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.4 }}
                onClick={() => setModalImg(src)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalImg && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setModalImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={modalImg}
              alt="Enlarged"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
