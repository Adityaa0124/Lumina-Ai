import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Command, Zap, Shield, BookOpen, ChevronRight } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: Zap,
    title: 'Instant Intelligence',
    description: 'Lightning-fast responses powered by advanced language models.',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description: 'Complex topics broken down into precise, digestible explanations.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Your sessions and data are encrypted and strictly private.',
  },
]

const examplePrompts = [
  'Explain how neural networks work',
  'Help me debug this TypeScript error',
  'Summarize the key ideas of stoicism',
  'Write a Python function to parse JSON',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-[#222222] selection:text-[#FFFFFF] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 flex justify-center overflow-hidden">
        <div className="w-[1200px] h-[400px] bg-white opacity-[0.025] blur-[120px] -translate-y-[60%] rounded-full" />
      </div>

      <div className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-[1200px] mx-auto border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-text-primary text-background">
            <Command className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold tracking-tight text-[14px]">Wuup</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-[13px] font-medium bg-text-primary text-background hover:bg-[#D4D4D8] transition-colors px-3 py-1.5 rounded-[6px]"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <section className="relative z-10 pt-32 pb-24 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-elevated text-text-secondary text-[12px] font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success/80 animate-pulse" />
            Wuup Engine v2 is now live
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[56px] sm:text-[72px] md:text-[84px] font-bold tracking-[-0.04em] text-text-primary leading-[1.05] text-balance mb-6"
          >
            Think clearer.<br />Build faster.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[18px] text-text-secondary max-w-[600px] leading-relaxed text-balance mb-10"
          >
            Wuup provides structured, high-signal explanations to help you master complex topics in engineering and design.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4 flex-wrap justify-center mb-12">
            <Link
              to="/signup"
              className="group flex items-center gap-1.5 px-5 py-2.5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] text-[14px] font-medium transition-all duration-200"
            >
              Get started
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-[6px] border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary text-[14px] font-medium transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-wrap justify-center gap-2 max-w-[640px]"
          >
            {examplePrompts.map((prompt) => (
              <Link
                key={prompt}
                to="/signup"
                className="px-3 py-1.5 rounded-[6px] border border-border bg-surface hover:bg-surface-elevated text-[13px] text-text-secondary hover:text-text-primary transition-colors truncate max-w-[280px]"
              >
                {prompt}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 max-w-[900px] mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-[12px] bg-background border border-border shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_8px_40px_-12px_rgba(0,0,0,1)] overflow-hidden relative"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
          
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="mx-auto flex gap-6">
              <span className="text-[12px] text-text-secondary font-medium px-2 bg-surface-elevated rounded border border-border">Wuup</span>
            </div>
          </div>

          <div className="p-8 flex flex-col gap-8 bg-[#0A0A0A]">
            <div className="flex justify-end">
              <div className="max-w-[80%] px-4 py-2.5 rounded-[8px] bg-surface-elevated border border-border text-[14px] leading-relaxed text-text-primary">
                How does event delegation work in JavaScript?
              </div>
            </div>

            <div className="flex gap-4 max-w-[90%]">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-text-primary text-background flex-shrink-0 mt-0.5">
                <Command className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 text-[14px] text-text-secondary leading-relaxed">
                <p className="mb-4">
                  Event delegation is a pattern where you attach a <strong className="text-text-primary font-medium">single event listener</strong> to a parent element rather than multiple listeners to individual children.
                </p>
                <div className="bg-[#111111] rounded-[6px] p-4 border border-border font-mono text-[13px] leading-relaxed">
                  <span className="text-[#A1A1AA]">// Instead of this (O(n) memory)</span><br />
                  <span className="text-[#30A46C]">buttons</span>.<span className="text-[#818CF8]">forEach</span>(btn {'=>'} btn.<span className="text-[#818CF8]">addEventListener</span>('click', handler))<br />
                  <br />
                  <span className="text-[#A1A1AA]">// Do this (O(1) memory)</span><br />
                  <span className="text-[#30A46C]">container</span>.<span className="text-[#818CF8]">addEventListener</span>('click', (e) {'=>'} {'{'}<br />
                  {'  '}<span className="text-[#E5484D]">if</span> (e.target.matches('button')) {'{'}<br />
                  {'    '}<span className="text-[#818CF8]">handler</span>(e)<br />
                  {'  }'}<br />
                  {'}'})
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 max-w-[1000px] mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="group p-6 rounded-[12px] bg-surface border border-border hover:bg-surface-elevated transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-[6px] bg-background border border-border flex items-center justify-center mb-5 group-hover:border-text-disabled transition-colors">
                <feat.icon className="w-4 h-4 text-text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary text-[15px] mb-2 tracking-tight">{feat.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-[600px] mx-auto p-12 rounded-[16px] bg-surface border border-border relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
          <h2 className="text-[28px] font-semibold text-text-primary tracking-tight mb-4">
            Start learning today
          </h2>
          <p className="text-text-secondary text-[15px] mb-8 max-w-[400px] mx-auto">
            Join thousands of engineers and designers using Wuup to accelerate their work.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#E5E5E5] text-[#000000] text-[14px] font-medium transition-all duration-200"
          >
            Get started for free
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-border px-6 py-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[13px] text-text-muted font-medium">
          <div className="flex items-center gap-2">
            <Command className="w-3.5 h-3.5" />
            <span>Wuup © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-text-secondary transition-colors">Twitter</a>
            <a href="#" className="hover:text-text-secondary transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
