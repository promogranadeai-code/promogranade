"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  children,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.08,
}: TextRevealProps) {
  const words = useMemo(() => children.split(" "), [children]);
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-mask"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%" },
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function FadeUp({ children, className, delay = 0, y = 40 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
