import React from 'react';
import { Palette, Type, LayoutTemplate, Scaling } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DesignSettings({ resumeData, onUpdate, template, setTemplate }) {
  const { settings = {} } = resumeData;
  const themeColor = settings.themeColor || '#6366f1';
  const fontFamily = settings.fontFamily || 'font-sans';
  const fontSize = settings.fontSize || 1;

  const handleSettingsChange = (field, value) => {
    onUpdate('settings', { ...settings, [field]: value });
  };

  const templates = [
    { id: 'US', name: 'US Standard' },
    { id: 'UK', name: 'UK Professional' },
    { id: 'India', name: 'India Structured' },
    { id: 'Minimalist', name: 'Modern Minimalist' },
    { id: 'Creative', name: 'Creative Two-Column' },
    { id: 'Executive', name: 'Executive Dark' }
  ];

  const colors = [
    { id: '#6366f1', name: 'Indigo' },
    { id: '#10b981', name: 'Emerald' },
    { id: '#f43f5e', name: 'Rose' },
    { id: '#f59e0b', name: 'Amber' },
    { id: '#0ea5e9', name: 'Sky' },
    { id: '#64748b', name: 'Slate' },
    { id: '#8b5cf6', name: 'Violet' },
    { id: '#14b8a6', name: 'Teal' }
  ];

  const fonts = [
    { id: 'font-sans', name: 'System Sans' },
    { id: 'font-serif', name: 'System Serif' },
    { id: 'font-mono', name: 'System Mono' },
    { id: 'font-[Arial]', name: 'Arial' },
    { id: 'font-[Georgia]', name: 'Georgia' },
    { id: 'font-[Helvetica]', name: 'Helvetica' },
    { id: 'font-[Tahoma]', name: 'Tahoma' },
    { id: 'font-[Trebuchet_MS]', name: 'Trebuchet MS' }
  ];

  const sectionClass = "mb-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 shadow-lg relative overflow-hidden";
  const sectionTitleClass = "text-lg font-bold mb-5 flex items-center gap-2 text-white border-b border-slate-800 pb-3";

  return (
    <div className="bg-slate-900 border-r border-slate-800 shadow-2xl h-full overflow-y-auto">
      <div className="p-8 flex flex-col gap-4">
        
        {/* Header */}
        <div className="mb-2 px-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Design Studio</h1>
            <p className="text-indigo-300 text-sm opacity-80">Customize the look and feel of your resume.</p>
        </div>

        {/* ── Template ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><LayoutTemplate size={20} className="text-indigo-400" /> Resume Template</h2>
          <div className="flex flex-col gap-3">
             <p className="text-sm text-slate-400 mb-2 leading-relaxed">
                 You are currently using the <strong className="text-indigo-300 font-bold px-1.5 py-0.5 bg-indigo-500/20 rounded">{template}</strong> template.
             </p>
             <Link 
                to="/templates" 
                className="w-full py-3.5 px-4 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 shadow-md rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm group"
             >
                <LayoutTemplate size={18} className="text-indigo-400 group-hover:text-white transition-colors" /> 
                Browse Template Gallery
             </Link>
          </div>
        </div>

        {/* ── Accent Color ── */}
        <div className={sectionClass}>
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <h2 className={sectionTitleClass}><Palette size={20} className="text-indigo-400" /> Accent Color</h2>
            
            <div className="flex flex-wrap gap-4 mb-5">
              {colors.map((c) => (
                  <button
                  key={c.id}
                  onClick={() => handleSettingsChange('themeColor', c.id)}
                  className={`w-10 h-10 rounded-full transition-all shadow-md flex items-center justify-center ${themeColor === c.id ? 'ring-2 ring-offset-2 ring-offset-slate-900 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
                  style={{ background: c.id, ringColor: c.id }}
                  title={c.name}
                  >
                  {themeColor === c.id && <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>}
                  </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <input 
                    type="color" 
                    value={themeColor} 
                    onChange={(e) => handleSettingsChange('themeColor', e.target.value)}
                    className="w-12 h-12 bg-transparent border-0 cursor-pointer rounded overflow-hidden"
                />
                <div>
                   <div className="text-sm font-bold text-slate-300">Custom Color</div>
                   <div className="text-xs text-slate-500 font-mono tracking-widest">{themeColor.toUpperCase()}</div>
                </div>
            </div>
        </div>

        {/* ── Typography ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><Type size={20} className="text-indigo-400" /> Typography</h2>
          
          <div className="mb-5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Font Family</label>
              <div className="flex flex-col gap-2">
                {fonts.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSettingsChange('fontFamily', f.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${fontFamily === f.id
                      ? 'bg-indigo-500/20 border-indigo-500 ring-1 ring-indigo-500'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                  >
                    <span className={`font-semibold ${fontFamily === f.id ? 'text-indigo-300' : 'text-slate-300'} ${f.id}`}>{f.name}</span>
                    {fontFamily === f.id && <div className="w-2 h-2 rounded-full bg-indigo-400"></div>}
                  </button>
                ))}
              </div>
          </div>

          <div>
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2"><Scaling size={14}/> Text Size</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{Math.round(fontSize * 100)}%</span>
             </label>
             <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                 <span className="text-slate-500 text-xs font-black">A</span>
                 <input 
                    type="range" 
                    min="0.75" 
                    max="1.3" 
                    step="0.05" 
                    value={fontSize} 
                    onChange={(e) => handleSettingsChange('fontSize', parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                 />
                 <span className="text-slate-300 text-lg font-black">A</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
