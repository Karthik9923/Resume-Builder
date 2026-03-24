import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Trash2, Plus, Award, FileText, Download as ExportIcon, Upload as ImportIcon, Sparkles } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';

function calcCompletion(resumeData) {
  const checks = [
    !!resumeData.personalInfo?.fullName,
    !!resumeData.personalInfo?.jobTitle,
    !!resumeData.personalInfo?.email,
    !!resumeData.personalInfo?.phone,
    !!resumeData.personalInfo?.location,
    !!resumeData.summary?.trim(),
    resumeData.experience?.length > 0 && !!resumeData.experience[0]?.company,
    resumeData.education?.length > 0 && !!resumeData.education[0]?.school,
    resumeData.certifications?.length > 0 && !!resumeData.certifications[0]?.name,
    resumeData.skills?.length > 0 && !!resumeData.skills[0],
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}

export default function ResumeForm({ resumeData, onUpdate, onLoadData, template, setTemplate }) {
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    onUpdate('personalInfo', { ...resumeData.personalInfo, [name]: value });
  };

  const handleSummaryChange = (e) => {
    onUpdate('summary', e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    onUpdate('skills', skillsArray);
  };

  const handleExpChange = (id, field, value) => {
    const newExp = resumeData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate('experience', newExp);
  };

  const handleEduChange = (id, field, value) => {
    const newEdu = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onUpdate('education', newEdu);
  };

  const handleCertChange = (id, field, value) => {
    const newCerts = resumeData.certifications.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    onUpdate('certifications', newCerts);
  };

  const addExperience = () => {
    const newExp = { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '' };
    onUpdate('experience', [...resumeData.experience, newExp]);
  };

  const removeExperience = (id) => {
    onUpdate('experience', resumeData.experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const newEdu = { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', description: '' };
    onUpdate('education', [...resumeData.education, newEdu]);
  };

  const removeEducation = (id) => {
    onUpdate('education', resumeData.education.filter(e => e.id !== id));
  };

  const addCertification = () => {
    const newCert = { id: Date.now(), name: '', issuer: '', year: '' };
    onUpdate('certifications', [...(resumeData.certifications || []), newCert]);
  };

  const removeCertification = (id) => {
    onUpdate('certifications', resumeData.certifications.filter(c => c.id !== id));
  };

  const handleSettingsChange = (field, value) => {
    onUpdate('settings', { ...(resumeData.settings || {}), [field]: value });
  };

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
        const payload = {
            jobTitle: resumeData.personalInfo.jobTitle,
            skills: resumeData.skills,
            experience: resumeData.experience
        };
        const response = await fetch('http://localhost:3001/api/generate-summary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (response.ok && data.summary) {
            onUpdate('summary', data.summary);
        } else {
            alert(data.error || 'Failed to generate summary');
        }
    } catch (e) {
        alert('Failed to connect to AI server. Is it running?');
    } finally {
        setIsGeneratingSummary(false);
    }
  };

  const inputClass = "w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-3 text-slate-200 font-sans text-sm outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner";
  const labelClass = "text-sm font-semibold text-slate-300 mb-1.5";
  const sectionClass = "mb-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 shadow-lg relative overflow-hidden";
  const sectionTitleClass = "text-lg font-bold mb-5 flex items-center gap-2 text-white border-b border-slate-800 pb-3";
  const btnClass = "inline-flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 py-2.5 px-4 rounded-lg font-semibold cursor-pointer transition-all hover:bg-slate-700 hover:text-white text-sm shadow-md";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 bg-indigo-500 border border-indigo-500 text-white py-2.5 px-4 rounded-xl font-bold cursor-pointer transition-all hover:bg-indigo-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-sm shadow-lg w-full mt-2";

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `resume_${Date.now()}.json`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (onLoadData) {
            // Ensure array fields exist to prevent maps from crashing if the JSON is malformed
            const safeData = {
                ...parsed,
                experience: parsed.experience || [],
                education: parsed.education || [],
                certifications: parsed.certifications || [],
                skills: parsed.skills || []
            };
            onLoadData(safeData);
        }
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

  const completion = calcCompletion(resumeData);
  const completionColor = completion < 40 ? '#ef4444' : completion < 75 ? '#f59e0b' : '#22c55e';

  return (
    <div
      className="bg-slate-900 border-r border-slate-800 shadow-2xl"
      style={{ height: '100%', overflowY: 'auto', minWidth: 0 }}
    >
      <div className="p-8 flex flex-col gap-4">

        {/* Header */}
        <div className="mb-2 px-2 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Resume Data</h1>
            <p className="text-indigo-300 text-sm opacity-80">Refine your details in the sections below.</p>
          </div>
          <div className="flex gap-2">
            <button
               onClick={exportJSON}
               className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg shadow transition" title="Export JSON"
            >
               <ExportIcon size={18} />
            </button>
            <label className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg shadow transition cursor-pointer" title="Import JSON">
               <ImportIcon size={18} />
               <input type="file" accept=".json" onChange={importJSON} className="hidden" />
            </label>
          </div>
        </div>

        {/* ── Completion Score ── */}
        <div className="mb-2 bg-slate-900/70 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-300">Resume Completeness</span>
            <span className="text-lg font-extrabold" style={{ color: completionColor }}>{completion}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completion}%`, background: completionColor }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {completion === 100
              ? ' Your resume is fully complete!'
              : `Fill in ${10 - Math.round(completion / 10)} more section${10 - Math.round(completion / 10) === 1 ? '' : 's'} to reach 100%`}
          </p>
        </div>



        {/* ── Personal Info ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><User size={20} className="text-indigo-400" /> Personal Info</h2>
          <div className="flex flex-col gap-2 mb-4">
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className={labelClass}>Job Title</label>
            <input className={inputClass} name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
              <label className={labelClass}>Email</label>
              <input className={inputClass} name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
              <label className={labelClass}>Phone</label>
              <input className={inputClass} name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className={labelClass}>Location</label>
            <input className={inputClass} name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Portfolio / Links</label>
            <input className={inputClass} name="portfolio" value={resumeData.personalInfo.portfolio} onChange={handlePersonalInfoChange} />
          </div>
        </div>

        {/* ── Professional Summary ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
          <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold flex items-center gap-2 text-white"><FileText size={20} className="text-violet-400" /> Professional Summary</h2>
              <button 
                  onClick={generateSummary}
                  disabled={isGeneratingSummary}
                  className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-violet-500/50 transition whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5"
              >
                  <Sparkles size={14} /> {isGeneratingSummary ? 'Generating...' : 'Auto-Generate'}
              </button>
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>A brief overview of your professional background</label>
            <MarkdownEditor
              value={resumeData.summary || ''}
              onChange={(val) => onUpdate('summary', val)}
              placeholder="e.g. Experienced software engineer with 5+ years building scalable web apps..."
              minHeight="110px"
            />
          </div>
        </div>

        {/* ── Experience ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><Briefcase size={20} className="text-indigo-400" /> Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className={`mb-6 pb-6 ${index < resumeData.experience.length - 1 ? 'border-b border-slate-800' : ''}`}>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Company</label>
                <input className={inputClass} value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Position</label>
                <input className={inputClass} value={exp.position} onChange={e => handleExpChange(exp.id, 'position', e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col gap-2 flex-1 min-w-[130px]">
                  <label className={labelClass}>Start Date</label>
                  <input className={inputClass} value={exp.startDate} onChange={e => handleExpChange(exp.id, 'startDate', e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[130px]">
                  <label className={labelClass}>End Date</label>
                  <input className={inputClass} value={exp.endDate} onChange={e => handleExpChange(exp.id, 'endDate', e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Description</label>
                <MarkdownEditor value={exp.description} onChange={val => handleExpChange(exp.id, 'description', val)} minHeight="100px" />
              </div>
              <button className={`${btnClass} text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 w-full sm:w-auto mt-2`} onClick={() => removeExperience(exp.id)}>
                <Trash2 size={16} /> Remove Role
              </button>
            </div>
          ))}
          <button className={btnPrimaryClass} onClick={addExperience}><Plus size={18} /> Add Experience</button>
        </div>

        {/* ── Education ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><GraduationCap size={20} className="text-indigo-400" /> Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className={`mb-6 pb-6 ${index < resumeData.education.length - 1 ? 'border-b border-slate-800' : ''}`}>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>School / University</label>
                <input className={inputClass} value={edu.school} onChange={e => handleEduChange(edu.id, 'school', e.target.value)} />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Degree / Field of Study</label>
                <input className={inputClass} value={edu.degree} onChange={e => handleEduChange(edu.id, 'degree', e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col gap-2 flex-1 min-w-[130px]">
                  <label className={labelClass}>Start Date</label>
                  <input className={inputClass} value={edu.startDate} onChange={e => handleEduChange(edu.id, 'startDate', e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-[130px]">
                  <label className={labelClass}>End Date</label>
                  <input className={inputClass} value={edu.endDate} onChange={e => handleEduChange(edu.id, 'endDate', e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Description</label>
                <MarkdownEditor value={edu.description} onChange={val => handleEduChange(edu.id, 'description', val)} minHeight="100px" />
              </div>
              <button className={`${btnClass} text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 w-full sm:w-auto mt-2`} onClick={() => removeEducation(edu.id)}>
                <Trash2 size={16} /> Remove Education
              </button>
            </div>
          ))}
          <button className={btnPrimaryClass} onClick={addEducation}><Plus size={18} /> Add Education</button>
        </div>

        {/* ── Certifications ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <h2 className={sectionTitleClass}><Award size={20} className="text-amber-400" /> Certifications</h2>
          {(resumeData.certifications || []).map((cert, index) => (
            <div key={cert.id} className={`mb-6 pb-6 ${index < (resumeData.certifications.length - 1) ? 'border-b border-slate-800' : ''}`}>
              <div className="flex flex-col gap-2 mb-4">
                <label className={labelClass}>Certification Name</label>
                <input className={inputClass} value={cert.name} onChange={e => handleCertChange(cert.id, 'name', e.target.value)} placeholder="e.g. AWS Certified Developer" />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                  <label className={labelClass}>Issuing Organization</label>
                  <input className={inputClass} value={cert.issuer} onChange={e => handleCertChange(cert.id, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" />
                </div>
                <div className="flex flex-col gap-2 w-28">
                  <label className={labelClass}>Year</label>
                  <input className={inputClass} value={cert.year} onChange={e => handleCertChange(cert.id, 'year', e.target.value)} placeholder="2024" />
                </div>
              </div>
              <button className={`${btnClass} text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 w-full sm:w-auto mt-2`} onClick={() => removeCertification(cert.id)}>
                <Trash2 size={16} /> Remove Certification
              </button>
            </div>
          ))}
          <button
            className="inline-flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 py-2.5 px-4 rounded-xl font-bold cursor-pointer transition-all hover:bg-amber-500/20 hover:border-amber-400 text-sm shadow-lg w-full mt-2"
            onClick={addCertification}
          >
            <Plus size={18} /> Add Certification
          </button>
        </div>

        {/* ── Skills ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><Code size={20} className="text-indigo-400" /> Skills</h2>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Skills (comma separated)</label>
            <input className={inputClass} value={resumeData.skills.join(', ')} onChange={handleSkillsChange} placeholder="e.g. React, Node.js, TypeScript" />
          </div>
        </div>

      </div>
    </div>
  );
}
