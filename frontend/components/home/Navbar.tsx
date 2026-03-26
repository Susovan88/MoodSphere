"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative h-16 w-full border-y border-neutral-200 bg-white px-6"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-[22px] font-bold tracking-tight text-transparent">
              MoodSphere
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button className="h-[40px] rounded-full bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 px-7 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.header
        className="fixed top-3 left-1/2 z-50 h-14 w-[min(100%-1.5rem,54rem)] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white/95 px-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-md"
        initial={false}
        animate={
          isScrolled
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -18, scale: 0.98 }
        }
        transition={{ duration: 0.24, ease: "easeOut" }}
        style={{ pointerEvents: isScrolled ? "auto" : "none" }}
      >
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-[22px] font-bold tracking-tight text-transparent">
              MoodSphere
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button className="h-[40px] rounded-full bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 px-7 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </motion.header>
    </>
  )
}
