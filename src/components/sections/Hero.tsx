"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import Button from "@/components/ui/Button";
import AgentGraph from "@/components/sections/AgentGraph";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 pb-24 pt-28 md:flex-row md:items-center md:gap-12 md:pt-36">
      <div className="flex max-w-xl flex-col items-start text-left">
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-mono text-xs tracking-widest text-accent-bright uppercase"
        >
          Building Agentic AI &amp; Automation Systems
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="mt-4 font-display text-4xl font-semibold leading-tight text-fg sm:text-5xl"
        >
          I build agentic AI systems that take real action.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          Multi-agent LangGraph pipelines with real backend integrations —
          automating operational workflows like contract review and customer
          support, not just wrapping a chat API.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button href="#projects" variant="primary">
            View Projects
            <ArrowRight size={16} />
          </Button>
          <Button href="/resume.pdf" variant="secondary" external>
            Resume
            <FileDown size={16} />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-md shrink-0"
      >
        <AgentGraph />
      </motion.div>
    </section>
  );
}