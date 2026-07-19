import { create } from 'zustand';

interface UIState {
  isPreviewFullscreen: boolean;
  togglePreviewFullscreen: () => void;
  activeMobileView: 'form' | 'preview';
  setActiveMobileView: (view: 'form' | 'preview') => void;
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  isTemplateModalOpen: boolean;
  setTemplateModalOpen: (open: boolean) => void;
  isImportModalOpen: boolean;
  setImportModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isPreviewFullscreen: false,
  togglePreviewFullscreen: () => set((state) => ({ isPreviewFullscreen: !state.isPreviewFullscreen })),
  activeMobileView: 'form',
  setActiveMobileView: (view) => set({ activeMobileView: view }),
  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  isTemplateModalOpen: false,
  setTemplateModalOpen: (open) => set({ isTemplateModalOpen: open }),
  isImportModalOpen: false,
  setImportModalOpen: (open) => set({ isImportModalOpen: open }),
}));
