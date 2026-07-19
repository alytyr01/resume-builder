import { Button } from '@/components/ui';
import { FileText, Palette, Download, Layers, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Layers, title: 'Multiple Templates', description: 'Choose from 5 professionally designed resume templates including Modern, Minimal, Professional, ATS-friendly, and Creative.' },
  { icon: Palette, title: 'Full Customization', description: 'Customize colors, fonts, spacing, and layout. Show or hide sections and reorder them with drag and drop.' },
  { icon: Download, title: 'Export & Share', description: 'Export as PDF, print directly, or save/load your resume as JSON. Auto-saves to local storage.' },
  { icon: Zap, title: 'Live Preview', description: 'See changes instantly as you type. The preview updates in real-time and looks exactly like your final resume.' },
];

const templates = [
  { name: 'Modern', desc: 'Bold color header', color: 'bg-indigo-500' },
  { name: 'Minimal', desc: 'Clean & elegant', color: 'bg-slate-500' },
  { name: 'Professional', desc: 'Corporate ready', color: 'bg-blue-600' },
  { name: 'ATS', desc: 'Parser optimized', color: 'bg-emerald-600' },
  { name: 'Creative', desc: 'Bold sidebar', color: 'bg-purple-600' },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Nav */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <FileText className="h-6 w-6" />
            <span>Resume Builder</span>
          </div>
          <a href="/builder">
            <Button>Get Started</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" />
            Build your professional resume in minutes
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Create a Resume That
            <span className="block text-indigo-600">Gets You Hired</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            A modern, free resume builder with live preview, multiple templates, and powerful customization.
            No sign-up required. Your data stays on your device.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="/builder">
              <Button size="lg" className="gap-2">
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="/builder">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Everything You Need</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600 dark:text-slate-400">
            Professional tools to create a standout resume that lands interviews.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Choose Your Template</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600 dark:text-slate-400">
            5 professionally designed templates. Same data, different look.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {templates.map((t) => (
              <div key={t.name} className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <div className={`mx-auto mb-4 h-20 w-16 rounded-lg ${t.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <h3 className="font-semibold text-slate-900 dark:text-white">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-indigo-600 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Build Your Resume?</h2>
          <p className="mx-auto mt-4 max-w-lg text-indigo-100">No sign-up, no cost, no limits. Start building your professional resume right now.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="/builder">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-indigo-700 hover:bg-indigo-50">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold mb-2">
            <FileText className="h-4 w-4" /> Resume Builder
          </div>
          Built with React, TypeScript, and Tailwind CSS. All data stored locally.
        </div>
      </footer>
    </div>
  );
}