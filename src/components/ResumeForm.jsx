import React from 'react';
import { User, Briefcase, GraduationCap, Code, LayoutTemplate, Trash2, Plus, Award, FileText } from 'lucide-react';

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

export default function ResumeForm({ resumeData, onUpdate, template, setTemplate }) {
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

  const inputClass = "w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 px-3 text-slate-200 font-sans text-sm outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner";
  const labelClass = "text-sm font-semibold text-slate-300 mb-1.5";
  const sectionClass = "mb-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 shadow-lg relative overflow-hidden";
  const sectionTitleClass = "text-lg font-bold mb-5 flex items-center gap-2 text-white border-b border-slate-800 pb-3";
  const btnClass = "inline-flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 py-2.5 px-4 rounded-lg font-semibold cursor-pointer transition-all hover:bg-slate-700 hover:text-white text-sm shadow-md";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 bg-indigo-500 border border-indigo-500 text-white py-2.5 px-4 rounded-xl font-bold cursor-pointer transition-all hover:bg-indigo-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-sm shadow-lg w-full mt-2";

  const completion = calcCompletion(resumeData);
  const completionColor = completion < 40 ? '#ef4444' : completion < 75 ? '#f59e0b' : '#22c55e';

  return (
    <div
      className="bg-slate-900 border-r border-slate-800 shadow-2xl"
      style={{ height: '100%', overflowY: 'auto', minWidth: 0 }}
    >
      <div className="p-8 flex flex-col gap-4">

        {/* Header */}
        <div className="mb-2 px-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Resume Data</h1>
          <p className="text-indigo-300 text-sm opacity-80">Refine your details in the sections below.</p>
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

        {/* ── Template ── */}
        <div className={sectionClass}>
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <h2 className={sectionTitleClass}><LayoutTemplate size={20} className="text-indigo-400" /> Template Format</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'US', label: 'US', desc: 'Standard' },
              { id: 'UK', label: 'UK', desc: 'Detailed' },
              { id: 'India', label: 'India', desc: 'Structured' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`flex flex-col items-start p-3.5 rounded-xl border transition-all text-left ${template === t.id
                  ? 'bg-indigo-500/20 border-indigo-500 ring-1 ring-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                  }`}
              >
                <div className={`font-bold text-sm mb-0.5 ${template === t.id ? 'text-indigo-300' : 'text-slate-300'}`}>
                  {t.label}
                </div>
                <div className={`text-xs ${template === t.id ? 'text-indigo-400/80' : 'text-slate-500'}`}>{t.desc}</div>
              </button>
            ))}
          </div>
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
          <h2 className={sectionTitleClass}><FileText size={20} className="text-violet-400" /> Professional Summary</h2>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>A brief overview of your professional background</label>
            <textarea
              className={`${inputClass} min-h-[110px] resize-y leading-relaxed`}
              value={resumeData.summary || ''}
              onChange={handleSummaryChange}
              placeholder="e.g. Experienced software engineer with 5+ years building scalable web apps..."
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
                <textarea className={`${inputClass} min-h-[100px] resize-y leading-relaxed`} value={exp.description} onChange={e => handleExpChange(exp.id, 'description', e.target.value)}></textarea>
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
                <textarea className={`${inputClass} min-h-[100px] resize-y leading-relaxed`} value={edu.description} onChange={e => handleEduChange(edu.id, 'description', e.target.value)}></textarea>
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
