import React from 'react';
import { User, Briefcase, GraduationCap, Code, LayoutTemplate, Trash2, Plus } from 'lucide-react';

export default function ResumeForm({ resumeData, onUpdate, template, setTemplate }) {
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    onUpdate('personalInfo', { ...resumeData.personalInfo, [name]: value });
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

  const inputClass = "w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 font-sans text-[0.95rem] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm";
  const labelClass = "text-sm font-semibold text-slate-700 mb-1";
  const sectionClass = "bg-white/80 border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1";
  const btnClass = "inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 px-5 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 text-sm shadow-sm";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 bg-indigo-600 border border-indigo-600 text-white py-3 px-5 rounded-full font-semibold cursor-pointer transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 text-sm";

  return (
    <div className="flex-1 max-w-[500px] bg-white/60 backdrop-blur-xl border-r border-slate-200/60 p-8 overflow-y-auto flex flex-col gap-8 custom-scrollbar relative z-10">
      <div className="mb-2 pl-2">
        <h1 className="text-[2rem] font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Resume Builder</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Fill in your details to generate a beautiful elegant CV.</p>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900"><LayoutTemplate size={20} className="text-indigo-500" /> CV Template Format</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'US', label: 'United States', desc: 'Standard & Concise' },
            { id: 'UK', label: 'United Kingdom', desc: 'Detailed & Elegant' },
            { id: 'India', label: 'India', desc: 'Highly Structured' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${template === t.id
                ? 'bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-100 ring-1 ring-indigo-500'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                }`}
            >
              <div className={`font-bold text-[0.95rem] mb-1 ${template === t.id ? 'text-indigo-700' : 'text-slate-800'}`}>
                {t.label}
              </div>
              <div className={`text-xs font-medium ${template === t.id ? 'text-indigo-500' : 'text-slate-500'}`}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900"><User size={20} className="text-indigo-500" /> Personal Information</h2>
        <div className="flex flex-col gap-2 mb-4">
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className={labelClass}>Job Title</label>
          <input className={inputClass} name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
            <label className={labelClass}>Email</label>
            <input className={inputClass} name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
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

      <div className={sectionClass}>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900"><Briefcase size={20} className="text-indigo-500" /> Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className={`mb-6 pb-6 ${index < resumeData.experience.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>Company</label>
              <input className={inputClass} value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>Position</label>
              <input className={inputClass} value={exp.position} onChange={e => handleExpChange(exp.id, 'position', e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <label className={labelClass}>Start Date</label>
                <input className={inputClass} value={exp.startDate} onChange={e => handleExpChange(exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <label className={labelClass}>End Date</label>
                <input className={inputClass} value={exp.endDate} onChange={e => handleExpChange(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>Description</label>
              <textarea className={`${inputClass} min-h-[100px] resize-y`} value={exp.description} onChange={e => handleExpChange(exp.id, 'description', e.target.value)}></textarea>
            </div>
            <button className={`${btnClass} text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 border-transparent`} onClick={() => removeExperience(exp.id)}>
              <Trash2 size={16} /> Remove Role
            </button>
          </div>
        ))}
        <button className={`${btnPrimaryClass} w-full`} onClick={addExperience}><Plus size={16} /> Add Experience</button>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900"><GraduationCap size={20} className="text-indigo-500" /> Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className={`mb-6 pb-6 ${index < resumeData.education.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>School / University</label>
              <input className={inputClass} value={edu.school} onChange={e => handleEduChange(edu.id, 'school', e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>Degree / Field of Study</label>
              <input className={inputClass} value={edu.degree} onChange={e => handleEduChange(edu.id, 'degree', e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <label className={labelClass}>Start Date</label>
                <input className={inputClass} value={edu.startDate} onChange={e => handleEduChange(edu.id, 'startDate', e.target.value)} />
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                <label className={labelClass}>End Date</label>
                <input className={inputClass} value={edu.endDate} onChange={e => handleEduChange(edu.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className={labelClass}>Description</label>
              <textarea className={`${inputClass} min-h-[100px] resize-y`} value={edu.description} onChange={e => handleEduChange(edu.id, 'description', e.target.value)}></textarea>
            </div>
            <button className={`${btnClass} text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 border-transparent`} onClick={() => removeEducation(edu.id)}>
              <Trash2 size={16} /> Remove Education
            </button>
          </div>
        ))}
        <button className={`${btnPrimaryClass} w-full`} onClick={addEducation}><Plus size={16} /> Add Education</button>
      </div>

      <div className={sectionClass}>
        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900"><Code size={20} className="text-indigo-500" /> Skills</h2>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Skills (comma separated)</label>
          <input className={inputClass} value={resumeData.skills.join(', ')} onChange={handleSkillsChange} />
        </div>
      </div>
    </div>
  );
}
