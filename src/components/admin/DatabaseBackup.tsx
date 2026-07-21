import React, { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DatabaseState } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const DatabaseBackup: React.FC = () => {
  const { exportDatabase, importDatabase, resetDatabase } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    soundFX.playSwoosh();
    exportDatabase();
    setMsg({ type: 'success', text: 'Database exported successfully to JSON file!' });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleImportClick = () => {
    soundFX.playClick();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as DatabaseState;
        if (json.profile && json.projects && json.skills) {
          importDatabase(json);
          soundFX.playSwoosh();
          setMsg({ type: 'success', text: 'Database imported and restored live!' });
        } else {
          setMsg({ type: 'error', text: 'Invalid database JSON file format.' });
        }
      } catch (err) {
        setMsg({ type: 'error', text: 'Failed to parse JSON file.' });
      }
      setTimeout(() => setMsg(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the database to default template seeds?')) {
      soundFX.playClick();
      resetDatabase();
      setMsg({ type: 'success', text: 'Database reset to default seed templates.' });
      setTimeout(() => setMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-violet shadow-glow-purple">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Database Backup & JSON Tools</h3>
            <p className="text-xs text-slate-400">
              Export your entire portfolio content as JSON, restore from a backup file, or reset to defaults.
            </p>
          </div>
        </div>

        {msg && (
          <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
            msg.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
          }`}>
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{msg.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          {/* Export */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center">
            <Download className="w-8 h-8 text-accent-cyan mx-auto" />
            <div>
              <h4 className="text-sm font-bold text-white">Export Database</h4>
              <p className="text-xs text-slate-400 mt-1">Download complete JSON backup of all portfolio content.</p>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-2.5 rounded-xl bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan text-xs font-bold hover:bg-accent-blue/30 cursor-pointer"
            >
              Export JSON
            </button>
          </div>

          {/* Import */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center">
            <Upload className="w-8 h-8 text-accent-violet mx-auto" />
            <div>
              <h4 className="text-sm font-bold text-white">Import Backup</h4>
              <p className="text-xs text-slate-400 mt-1">Restore your portfolio state from a JSON backup file.</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              className="w-full py-2.5 rounded-xl bg-accent-purple/20 border border-accent-purple/40 text-accent-violet text-xs font-bold hover:bg-accent-purple/30 cursor-pointer"
            >
              Upload & Restore JSON
            </button>
          </div>

          {/* Reset */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center">
            <RotateCcw className="w-8 h-8 text-rose-400 mx-auto" />
            <div>
              <h4 className="text-sm font-bold text-white">Reset Defaults</h4>
              <p className="text-xs text-slate-400 mt-1">Reset database back to initial default seeds.</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold hover:bg-rose-500/30 cursor-pointer"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
