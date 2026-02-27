import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

export default function ResumePreview({ resumeData }) {
    const resumeRef = useRef(null);

    const generatePDF = () => {
        const element = resumeRef.current;
        if (!element) return;
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="preview-panel">

            <div className="resume-document" ref={resumeRef}>
                <div className="resume-header">
                    <h1 className="resume-name">{resumeData.personalInfo.fullName}</h1>
                    <div style={{ fontSize: '1.2rem', color: '#2b6cb0', marginBottom: '1rem', fontWeight: 500 }}>
                        {resumeData.personalInfo.jobTitle}
                    </div>
                    <div className="resume-contact">
                        {resumeData.personalInfo.email && (
                            <div className="resume-contact-item"><Mail size={14} /> {resumeData.personalInfo.email}</div>
                        )}
                        {resumeData.personalInfo.phone && (
                            <div className="resume-contact-item"><Phone size={14} /> {resumeData.personalInfo.phone}</div>
                        )}
                        {resumeData.personalInfo.location && (
                            <div className="resume-contact-item"><MapPin size={14} /> {resumeData.personalInfo.location}</div>
                        )}
                        {resumeData.personalInfo.portfolio && (
                            <div className="resume-contact-item"><LinkIcon size={14} /> {resumeData.personalInfo.portfolio}</div>
                        )}
                    </div>
                </div>

                {resumeData.experience && resumeData.experience.length > 0 && Array.isArray(resumeData.experience) && resumeData.experience[0].company && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">Experience</h2>
                        {resumeData.experience.map(exp => (
                            <div className="resume-item" key={exp.id}>
                                <div className="resume-item-header">
                                    <div className="resume-item-title">{exp.position}</div>
                                    <div className="resume-item-date">{exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}</div>
                                </div>
                                <div className="resume-item-subtitle" style={{ marginBottom: '0.5rem' }}>{exp.company}</div>
                                <div className="resume-item-desc">{exp.description}</div>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.education && resumeData.education.length > 0 && Array.isArray(resumeData.education) && resumeData.education[0].school && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">Education</h2>
                        {resumeData.education.map(edu => (
                            <div className="resume-item" key={edu.id}>
                                <div className="resume-item-header">
                                    <div className="resume-item-title">{edu.degree}</div>
                                    <div className="resume-item-date">{edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}</div>
                                </div>
                                <div className="resume-item-subtitle" style={{ marginBottom: '0.5rem' }}>{edu.school}</div>
                                <div className="resume-item-desc">{edu.description}</div>
                            </div>
                        ))}
                    </div>
                )}

                {resumeData.skills && resumeData.skills.length > 0 && Array.isArray(resumeData.skills) && resumeData.skills[0] && (
                    <div className="resume-section">
                        <h2 className="resume-section-title">Skills</h2>
                        <div className="resume-skills">
                            {resumeData.skills.map((skill, index) => skill && (
                                <span className="resume-skill-tag" key={index}>{skill.trim()}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="preview-toolbar" style={{ marginTop: '2rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={generatePDF}>
                    <Download size={18} /> Download your CV as PDF
                </button>
            </div>
        </div>
    );
}
