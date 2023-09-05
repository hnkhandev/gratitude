"use client";

import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

const HERO_KEY_WORDS = ["Mindfulness", "Well-being", "Gratitude"];

export function Hero() {
  return (
    <section className="flex flex-col w-full max-w-md gap-2 pt-8">
      {HERO_KEY_WORDS.map((word, index) => (
        <motion.div
          key={word}
          className={cn(
            "text-3xl font-bold",
            word === "Gratitude" ? "text-primary" : "text-foreground"
          )}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: index * 0.5, // stagger delay for each item
          }}
        >
          {word}
        </motion.div>
      ))}
      <motion.div
        className="flex flex-col gap-3 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 1.5,
          duration: 1,
        }}
      >
        Unlock the transformative power of gratitude with our simple yet
        impactful app. Designed to seamlessly integrate into your daily routine,
        Gratitude helps you focus on the positive, connect with your inner self,
        and cultivate a happier, more fulfilled life. Why wait? Begin your
        journey of gratitude today.
        <a
          href="https://whop.com/gratitude/"
          target="_blank"
          className="flex items-center gap-1 text-sm text-yellow-500 text-muted-foreground hover:transition-transform hover:translate-x-1"
        >
          Start your free trial now <ArrowRightIcon className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
