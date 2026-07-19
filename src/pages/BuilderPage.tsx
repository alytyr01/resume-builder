import { useUIStore } from '@/store/uiStore';
import { SectionPanel } from '@/components/builder/SectionPanel';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { Button } from '@/components/ui';
import { Settings, Maximize2, Minimize2, FileText, Edit3 } from 'lucide-react';

export function BuilderPage() {
  const isFullscreen = useUIStore((s) => s.isPreviewFullscreen);
  const toggleFullscreen = useUIStore((s) => s.togglePreviewFullscreen);
  const setSettingsOpen = useUIStore((s) => s.setSettingsOpen);
  const activeMobileView = useUIStore((s) => s.activeMobileView);
  const setActiveMobileView = useUIStore((s) => s.setActiveMobileView);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-indigo-600">
            <FileText className="h-5 w-5" />
            <span className="hidden sm:inline">Resume Builder</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile view toggle */}
          <div className="flex sm:hidden rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setActiveMobileView('form')}
              className={`px-3 py-1.5 text-xs font-medium ${activeMobileView === 'form' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveMobileView('preview')}
              className={`px-3 py-1.5 text-xs font-medium ${activeMobileView === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
            >
              <FileText className="h-4 w-4" />
            </button>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} title={isFullscreen ? 'Split view' : 'Full preview'}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Form */}
        <div className={`${isFullscreen ? 'hidden' : 'w-full sm:w-1/2 lg:w-[45%]'} ${activeMobileView === 'preview' ? 'hidden sm:block' : 'block'} overflow-y-auto border-r border-slate-200 dark:border-slate-800`}>
          <div className="p-4 sm:p-6">
            <SectionPanel />
          </div>
        </div>

        {/* Right panel - Preview */}
        <div className={`${isFullscreen ? 'w-full' : 'w-full sm:w-1/2 lg:w-[55%]'} ${activeMobileView === 'form' ? 'hidden sm:block' : 'block'} overflow-y-auto bg-slate-100 dark:bg-slate-900`}>
          <div className="flex justify-center p-4 sm:p-8">
            <div className="scale-[0.6] sm:scale-[0.7] lg:scale-[0.8] origin-top">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>

      <SettingsPanel />
    </div>
  );
}