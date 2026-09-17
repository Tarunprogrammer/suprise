import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check, Download, Upload, Sparkles, Globe } from 'lucide-react';
import { encodeSurpriseToUrlHash, exportSurpriseToJson, importSurpriseFromJsonFile } from '../../utils/storage';
import { playSfx } from '../../utils/sound';

export default function PublishModal({ data, isOpen, onClose, onImportData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareableUrl = encodeSurpriseToUrlHash(data);

  const handleCopyLink = () => {
    playSfx('magic');
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJson = () => {
    playSfx('click');
    exportSurpriseToJson(data);
  };

  const handleFileImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const importedData = await importSurpriseFromJsonFile(file);
        playSfx('cheer');
        onImportData(importedData);
        onClose();
      } catch (err) {
        alert(err.message || 'Error loading file');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-white/20 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Publish & Share 3D Surprise</h3>
              <p className="text-xs text-slate-400">Generates an instant standalone web link containing all photos & wishes!</p>
            </div>
          </div>

          {/* Shareable Link Output Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/15 space-y-3 mb-6">
            <label className="block text-xs font-semibold text-pink-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400" /> Shareable Web Link (Works Anywhere)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 select-all font-mono truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5 shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">Anyone opening this link will see your exact custom 3D birthday world instantly!</p>
          </div>

          {/* Backup Export / Import */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            <button
              onClick={handleExportJson}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export JSON Project</span>
            </button>

            <label className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer">
              <Upload className="w-4 h-4 text-purple-400" />
              <span>Import JSON Project</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
