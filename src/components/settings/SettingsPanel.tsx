import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import { useThemeStore } from '@/store/themeStore';
import { Button, Select, Input, Modal } from '@/components/ui';
import { templateInfo } from '@/components/templates';
import { Download, Upload, Printer, FileJson, RotateCcw, Sun, Moon, Monitor } from 'lucide-react';
import type { TemplateId } from '@/types/resume';

const fonts = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'system-ui', label: 'System UI' },
];

export function SettingsPanel() {
  const customization = useResumeStore((s) => s.customization);
  const updateCustomization = useResumeStore((s) => s.updateCustomization);
  const resume = useResumeStore((s) => s.resume);
  const importResume = useResumeStore((s) => s.importResume);
  const resetResume = useResumeStore((s) => s.resetResume);
  const isOpen = useUIStore((s) => s.isSettingsOpen);
  const setOpen = useUIStore((s) => s.setSettingsOpen);
  const themeMode = useThemeStore((s) => s.mode);
  const setThemeMode = useThemeStore((s) => s.setMode);

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          importResume(data);
        } catch { alert('Invalid JSON file'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handlePrint = () => window.print();

  const handleExportPDF = () => {
    // Use browser print to PDF
    window.print();
  };

  return (
    <Modal open={isOpen} onClose={() => setOpen(false)} title="Settings & Customization" className="max-w-2xl">
      <div className="space-y-6">
        {/* Theme */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Theme</h3>
          <div className="flex gap-2">
            <Button variant={themeMode === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setThemeMode('light')}>
              <Sun className="h-4 w-4 mr-1" /> Light
            </Button>
            <Button variant={themeMode === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setThemeMode('dark')}>
              <Moon className="h-4 w-4 mr-1" /> Dark
            </Button>
            <Button variant={themeMode === 'system' ? 'default' : 'outline'} size="sm" onClick={() => setThemeMode('system')}>
              <Monitor className="h-4 w-4 mr-1" /> System
            </Button>
          </div>
        </div>

        {/* Template */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Template</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {templateInfo.map((t) => (
              <button
                key={t.id}
                onClick={() => updateCustomization({ templateId: t.id as TemplateId })}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  customization.templateId === t.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                }`}
              >
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Customization */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Styling</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => updateCustomization({ primaryColor: e.target.value, accentColor: e.target.value })}
                  className="h-9 w-9 rounded-lg border border-slate-200 cursor-pointer"
                />
                <Input value={customization.primaryColor} onChange={(e) => updateCustomization({ primaryColor: e.target.value })} className="flex-1" />
              </div>
            </div>
            <Select
              label="Font Family"
              options={fonts}
              value={customization.fontFamily}
              onChange={(e) => updateCustomization({ fontFamily: e.target.value })}
            />
            <Input label="Font Size (px)" type="number" min={10} max={20} value={customization.fontSize} onChange={(e) => updateCustomization({ fontSize: Number(e.target.value) })} />
            <Input label="Line Spacing" type="number" min={1} max={2.5} step={0.1} value={customization.lineSpacing} onChange={(e) => updateCustomization({ lineSpacing: Number(e.target.value) })} />
            <Input label="Section Spacing (px)" type="number" min={8} max={40} value={customization.sectionSpacing} onChange={(e) => updateCustomization({ sectionSpacing: Number(e.target.value) })} />
          </div>
        </div>

        {/* Actions */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-1" /> Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON}>
              <FileJson className="h-4 w-4 mr-1" /> Export JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleImportJSON}>
              <Upload className="h-4 w-4 mr-1" /> Import JSON
            </Button>
            <Button variant="outline" size="sm" onClick={resetResume}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}