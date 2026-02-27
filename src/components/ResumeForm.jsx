import React from 'react';
import { User, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function ResumeForm({ resumeData, onUpdate }) {
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


  return (
    <div className="editor-panel">
      <div className="editor-header">
        <h1>Resume Builder</h1>
        <p>Fill in your details to generate a beautiful elegant CV.</p>
      </div>

      <div className="section-card">
        <h2 className="section-title"><User size={20} /> Personal Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input className="form-input" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input className="form-input" name="jobTitle" value={resumeData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-input" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input className="form-input" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
        </div>
        <div className="form-group">
          <label>Portfolio / Links</label>
          <input className="form-input" name="portfolio" value={resumeData.personalInfo.portfolio} onChange={handlePersonalInfoChange} />
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title"><Briefcase size={20} /> Work Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < resumeData.experience.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
            <div className="form-group">
              <label>Company</label>
              <input className="form-input" value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input className="form-input" value={exp.position} onChange={e => handleExpChange(exp.id, 'position', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input className="form-input" value={exp.startDate} onChange={e => handleExpChange(exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input className="form-input" value={exp.endDate} onChange={e => handleExpChange(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-input form-textarea" value={exp.description} onChange={e => handleExpChange(exp.id, 'description', e.target.value)}></textarea>
            </div>
            <button className="btn" style={{ color: '#ef4444' }} onClick={() => removeExperience(exp.id)}>Remove</button>
          </div>
        ))}
        <button className="btn btn-primary" onClick={addExperience}>+ Add Experience</button>
      </div>

      <div className="section-card">
        <h2 className="section-title"><GraduationCap size={20} /> Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < resumeData.education.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
            <div className="form-group">
              <label>School / University</label>
              <input className="form-input" value={edu.school} onChange={e => handleEduChange(edu.id, 'school', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Degree / Field of Study</label>
              <input className="form-input" value={edu.degree} onChange={e => handleEduChange(edu.id, 'degree', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input className="form-input" value={edu.startDate} onChange={e => handleEduChange(edu.id, 'startDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input className="form-input" value={edu.endDate} onChange={e => handleEduChange(edu.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-input form-textarea" value={edu.description} onChange={e => handleEduChange(edu.id, 'description', e.target.value)}></textarea>
            </div>
            <button className="btn" style={{ color: '#ef4444' }} onClick={() => removeEducation(edu.id)}>Remove</button>
          </div>
        ))}
        <button className="btn btn-primary" onClick={addEducation}>+ Add Education</button>
      </div>

      <div className="section-card">
        <h2 className="section-title"><Code size={20} /> Skills</h2>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input className="form-input" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} />
        </div>
      </div>
    </div>
  );
}
