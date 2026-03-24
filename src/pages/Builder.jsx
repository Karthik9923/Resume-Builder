import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Target, Palette } from 'lucide-react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ATSAnalyzer from '../components/ATSAnalyzer';
import DesignSettings from '../components/DesignSettings';

const STORAGE_KEY = 'resumeBuilderData_v2';

const defaultResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    portfolio: ''
  },
  summary: '',
  experience: [],
  education: [],
  certifications: [],
  skills: [],
  settings: {
    themeColor: '#6366f1',
    fontFamily: 'font-sans'
  }
};

export default function Builder() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new fields exist for backward compat
        if (!parsed.summary) parsed.summary = defaultResumeData.summary;
        if (!parsed.certifications) parsed.certifications = defaultResumeData.certifications;
        if (!parsed.settings) parsed.settings = defaultResumeData.settings;
        return parsed;
      }
    } catch (e) { /* ignore */ }
    return defaultResumeData;
  });

  const [searchParams] = useSearchParams();
  const templateQuery = searchParams.get('template');
  const [template, setTemplate] = useState(templateQuery || 'US');
  const [activeTab, setActiveTab] = useState('build'); // 'build' or 'ats'

  // Auto-save every time resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) { /* ignore */ }
  }, [resumeData]);

  const handleUpdateInfo = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950">
      {/* Sidebar Navigation */}
      <div className="w-[70px] bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 shrink-0 z-20">
        <button
          onClick={() => setActiveTab('build')}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === 'build' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          title="Resume Builder"
        >
          <FileText size={22} />
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === 'ats' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          title="ATS Analyzer"
        >
          <Target size={22} />
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === 'design' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          title="Design Settings"
        >
          <Palette size={22} />
        </button>
      </div>

      {/* Control Panel (Form or ATS or Design) */}
      <div className="w-[30%] min-w-[320px] max-w-[500px] shrink-0 h-full bg-slate-50 border-r border-slate-300 relative z-10 flex flex-col overflow-hidden">
        {activeTab === 'build' ? (
          <ResumeForm
            resumeData={resumeData}
            onUpdate={handleUpdateInfo}
            onLoadData={setResumeData}
            template={template}
            setTemplate={setTemplate}
          />
        ) : activeTab === 'ats' ? (
          <div className="p-6 h-full overflow-y-auto bg-slate-100">
            <ATSAnalyzer resumeData={resumeData} />
          </div>
        ) : (
          <DesignSettings
             resumeData={resumeData}
             onUpdate={handleUpdateInfo}
             template={template}
             setTemplate={setTemplate}
          />
        )}
      </div>

      {/* Live Preview Area */}
      <div className="flex-1 h-full relative z-0">
        <ResumePreview
          resumeData={resumeData}
          template={template}
        />
      </div>
    </div>
  );
}