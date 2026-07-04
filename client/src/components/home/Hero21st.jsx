"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";

export interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "spring" } },
  };

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-bloom-50 via-white to-cream-50",
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-bloom-200/40 blur-xl"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + (i * 12) % 90}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244, 198, 206, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 198, 206, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Content */}
          <div className="flex flex-col items-start lg:items-start text-center lg:text-left">
            <motion.div variants={badgeVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bloom-100/80 text-bloom-700 text-xs font-medium uppercase tracking-wider backdrop-blur-sm border border-bloom-200/50">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                <span>New Season 2026 Collection</span>
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.02] tracking-tight text-navy-900"
            >
              Discover Your{" "}
              <span className="italic text-bloom-500">Radiant</span> Side
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-navy-500 max-w-lg font-light leading-relaxed"
            >
              Curated beauty essentials for the modern ritual. Premium formulas,
              conscious ingredients, and transformative results.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/categories"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full",
                  "text-sm font-semibold uppercase tracking-wider",
                  "bg-navy-900 text-white",
                  "hover:bg-navy-700 active:bg-navy-800",
                  "transition-all duration-300 ease-out",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2",
                  "shadow-lg shadow-navy-900/20 hover:shadow-xl hover:shadow-navy-900/30"
                )}
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full",
                  "text-sm font-medium uppercase tracking-wider",
                  "bg-white/80 text-navy-900 border border-navy-200",
                  "hover:bg-white hover:border-navy-300",
                  "transition-all duration-300 ease-out",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-bloom-500 focus-visible:ring-offset-2",
                  "backdrop-blur-sm"
                )}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Consultation
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center gap-6 text-sm text-navy-400"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bloom-400" aria-hidden="true" />
                <span>Clean Ingredients</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bloom-400" aria-hidden="true" />
                <span>Cruelty-Free</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bloom-400" aria-hidden="true" />
                <span>Dermatologist Tested</span>
              </span>
            </motion.div>
          </div>

          {/* Right: Product showcase / Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-lg mx-auto lg:mx-0">
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-bloom-200/30 via-transparent to-transparent rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              {/* Main product image - using existing hero image */}
              <div className="relative z-10 aspect-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="/images/heros.png"
                  alt="PureBloom Beauty New Season Collection"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating accent cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-bloom-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-bloom-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-bloom-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Signature Serum</p>
                    <p className="text-xs text-navy-500">Bestseller · 4.9★</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 right-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-bloom-100"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-bloom-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-bloom-500" />
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-navy-900 text-sm">Glow Mist</p>
                    <p className="text-xs text-navy-500">New Arrival</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <motion.div
            className="w-1 h-6 bg-gradient-to-b from-bloom-300 to-transparent rounded-full"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}