"use client"

import React from "react"
import { motion } from "framer-motion"

const BENEFITS = [
  "Secure private journaling",
  "Speech-to-text voice notes",
  "Sentiment mood scoring",
  "7-day negative trend alerts",
]

function PulseBoard() {
  const bars = [
    22, 28, 34, 26, 36, 42, 30, 38, 46, 32, 40, 48, 34, 30, 44, 50, 36, 42, 28,
    46, 54, 40, 34, 48,
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-[#F2D6BF] bg-[#FFFCF8] p-5 shadow-[0_22px_60px_-35px_rgba(234,88,12,0.45)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(251,146,60,0.18), transparent 52%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-[0.2em] text-orange-500 uppercase">
          Live Campus Signal
        </p>
        <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-600">
          Consent-led AI
        </span>
      </div>

      <div className="relative mt-4 rounded-2xl border border-[#F0E4D8] bg-white p-4">
        <div className="mb-3 flex flex-col gap-1 text-[10px] font-semibold text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <span className="leading-none">7-day emotional load</span>
          <span className="leading-none">Updated now</span>
        </div>

        <div className="flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                background:
                  i > bars.length - 6
                    ? "linear-gradient(180deg, #FB7185, #F97316)"
                    : "linear-gradient(180deg, #FDBA74, #FB923C)",
                minWidth: 4,
                maxWidth: 10,
              }}
              animate={{
                height: [
                  `${h * 0.58}px`,
                  `${h}px`,
                  `${h * 0.72}px`,
                  `${h * 0.92}px`,
                ],
                opacity: [0.75, 1, 0.82, 1],
              }}
              transition={{
                duration: 1.5 + (i % 6) * 0.1,
                delay: i * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
          <p className="text-[11px] font-semibold text-rose-700">
            Proactive suggestion triggered
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-rose-600">
            Detected a consistent low trend. Suggesting campus counseling
            resources with student consent.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function CtaSection() {
  return (
    <section className="border-b border-[#F2EBDD] bg-linear-to-b from-[#FFFEFC] via-[#FFF7EE] to-[#FFFDF9]">
      <div className="mx-auto max-w-6xl border-x border-[#F2EBDD] px-6 py-16 md:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#F2DDC9] bg-[#FFFDFB] p-6 shadow-[0_20px_70px_-45px_rgba(194,65,12,0.45)] md:p-9">
          <div className="pointer-events-none absolute -top-16 -left-16 h-60 w-60 rounded-full bg-orange-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-24 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-orange-600 uppercase"
              >
                Campus Mental Health AI
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 text-[2rem] leading-[1.02] font-semibold tracking-tight text-balance text-neutral-900 md:text-[3.05rem]"
              >
                Catch burnout patterns
                <span className="block text-orange-500">
                  before students crash.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600"
              >
                MoodSphere combines secure journaling, voice capture, NLP
                sentiment scoring, and proactive resource suggestions so your
                team can intervene early with empathy and consent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 grid gap-2 sm:grid-cols-2"
              >
                {BENEFITS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[13px] font-medium text-neutral-700"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[11px] text-orange-700">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.26 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 8px 24px -12px rgba(249,115,22,0.75)",
                      "0 14px 34px -14px rgba(249,115,22,0.88)",
                      "0 8px 24px -12px rgba(249,115,22,0.75)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 px-7 text-sm font-semibold text-white"
                >
                  Get Started
                </motion.button>

                <a
                  href="#how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E8DDD1] bg-white px-7 text-sm font-semibold text-neutral-800 transition-colors hover:border-orange-200 hover:text-orange-600"
                >
                  Explore the workflow
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="mt-7 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-neutral-500"
              >
                {[
                  "AES-256 encrypted",
                  "Consent-first nudges",
                  "Built for campus teams",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#EFE3D6] bg-white px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <PulseBoard />
          </div>
        </div>
      </div>
    </section>
  )
}
