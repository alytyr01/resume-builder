import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export function Switch({ checked, onChange, label, id }: SwitchProps) {
  const switchId = id || React.useId();
  return (
    <label htmlFor={switchId} className="flex cursor-pointer items-center gap-3">
      <div className="relative">
        <input
          id={switchId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={cn(
            'h-6 w-11 rounded-full transition-colors',
            checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
          )}
        >
          <div
            className={cn(
              'h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
              checked ? 'translate-x-[22px]' : 'translate-x-[2px]'
            )}
          />
        </div>
      </div>
      {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}
