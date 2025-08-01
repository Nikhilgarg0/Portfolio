"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MinimalSplashProps {
  onComplete?: () => void
  duration?: number
}

export default function MinimalSplash({ onComplete, duration = 2500 }: MinimalSplashProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete?.(), 400)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/20"
        >
          {/* Enhanced Abstract Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary floating elements */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 1600,
                  y: Math.random() * 1000,
                  rotate: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * 1000],
                  x: [null, Math.random() * 1600],
                  rotate: [0, 360, 720],
                  scale: [0, 1, 0.7, 0],
                  opacity: [0, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                <div
                  className={`w-${2 + Math.floor(Math.random() * 4)} h-${
                    2 + Math.floor(Math.random() * 4)
                  } bg-gradient-to-br ${
                    Math.random() > 0.7
                      ? "from-blue-400 to-purple-500"
                      : Math.random() > 0.5
                        ? "from-purple-400 to-pink-400"
                        : "from-indigo-400 to-blue-400"
                  } ${
                    Math.random() > 0.6 ? "rounded-full" : Math.random() > 0.3 ? "rounded-lg" : "rounded-none rotate-45"
                  } opacity-40`}
                />
              </motion.div>
            ))}

            {/* Large flowing gradient orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1.2, 1],
                opacity: [0.3, 0.7, 0.5, 0.3],
                x: [0, 100, -50, 0],
                y: [0, -80, 60, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"
              animate={{
                scale: [1.5, 1, 1.4, 1.5],
                opacity: [0.7, 0.3, 0.6, 0.7],
                x: [0, -80, 40, 0],
                y: [0, 70, -40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 6,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-400/6 to-cyan-400/6 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 0.8, 1],
                opacity: [0.2, 0.5, 0.3, 0.2],
                x: [-200, -120, -250, -200],
                y: [-200, -280, -120, -200],
              }}
              transition={{
                duration: 14,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </div>

          {/* Simple Loading Section */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Loading Message */}
              <motion.p
                className="text-gray-600 text-lg font-light tracking-wide"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Getting things ready for you
              </motion.p>

              {/* Elegant Thin Progress Bar */}
              <div className="w-80 h-0.5 bg-gray-200/60 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Refined corner elements */}
          {[
            { position: "top-6 left-6", delay: 0.2 },
            { position: "top-6 right-6", delay: 0.4 },
            { position: "bottom-6 left-6", delay: 0.6 },
            { position: "bottom-6 right-6", delay: 0.8 },
          ].map((corner, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ delay: corner.delay, duration: 1.5 }}
              className={`absolute ${corner.position}`}
            >
              <div
                className={`w-16 h-16 border ${
                  index === 0
                    ? "border-l border-t border-blue-400/20 rounded-tl-2xl"
                    : index === 1
                      ? "border-r border-t border-purple-400/20 rounded-tr-2xl"
                      : index === 2
                        ? "border-l border-b border-purple-400/20 rounded-bl-2xl"
                        : "border-r border-b border-pink-400/20 rounded-br-2xl"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
