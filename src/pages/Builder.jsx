import React, { useState, useEffect } from 'react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const STORAGE_KEY = 'resumeBuilderData_v2';

const defaultResumeData = {
  personalInfo: {
    fullName: 'Alexander Wright',
    jobTitle: 'Senior Software Engineer',
    email: 'alex.wright@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    portfolio: 'github.com/alexwright'
  },
  summary: 'Results-driven Senior Software Engineer with 6+ years of experience building scalable web applications. Passionate about clean code, developer tooling, and creating exceptional user experiences.',
  experience: [
    {
      id: 1,
      company: 'Innovatech Solutions',
      position: 'Lead Frontend Developer',
      startDate: 'Mar 2021',
      endDate: 'Present',
      description: 'Architected and built scalable modern web applications. Mentored junior developers and improved overall application performance by 40%.'
    },
    {
      id: 2,
      company: 'Creative Digital',
      position: 'Web Developer',
      startDate: 'Jun 2018',
      endDate: 'Feb 2021',
      description: 'Collaborated with designers to deliver pixel-perfect UIs. Integrated RESTful APIs and optimized state management.'
    }
  ],
  education: [
    {
      id: 1,
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
      description: 'Graduated with Summa Cum Laude. Minor in Interactive Design.'
    }
  ],
  certifications: [
    { id: 1, name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2022' }
  ],
  skills: ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'CSS/SASS', 'Git & GitHub', 'Figma', 'GraphQL']
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
        return parsed;
      }
    } catch (e) { /* ignore */ }
    return defaultResumeData;
  });

  const [template, setTemplate] = useState('US');

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
    <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', height: '100vh', width: '100%', overflow: 'hidden', background: '#020617' }}>
      <ResumeForm
        resumeData={resumeData}
        onUpdate={handleUpdateInfo}
        template={template}
        setTemplate={setTemplate}
      />
      <ResumePreview
        resumeData={resumeData}
        template={template}
      />
    </div>
  );
}