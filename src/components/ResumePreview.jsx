import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Mail, Phone, MapPin, Link as LinkIcon, ZoomIn, ZoomOut, Award } from 'lucide-react';

const parseMarkdown = (text) => {
    if (!text) return '';
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*)$/gm, '<li>$1</li>');
    
    // Group lists
    html = html.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul class="list-disc pl-5 my-1" style="margin-left: 1.25rem;">$1</ul>');
    // Handle newlines (do not replace newlines inside lists)
    html = html.split('\n').map(line => {
        if(line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('</ul')) return line;
        return line + '<br/>';
    }).join('');
    
    return html;
};

export default function ResumePreview({ resumeData, template }) {
    const resumeRef = useRef(null);
    const [zoom, setZoom] = useState(85);

    const generatePDF = () => {
        const element = resumeRef.current;
        if (!element) return;
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_${template}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const { personalInfo, summary, experience, education, certifications, skills, settings } = resumeData;
    const themeColor = settings?.themeColor || '#6366f1';
    const fontClass = settings?.fontFamily || 'font-sans';
    
    let sizeScale = 1;
    if (typeof settings?.fontSize === 'number') sizeScale = settings.fontSize;
    else if (settings?.fontSize === 'text-sm') sizeScale = 0.9;
    else if (settings?.fontSize === 'text-lg') sizeScale = 1.1;

    // ─── US TEMPLATE ────────────────────────────────────────────────
    const renderUSTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-900 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl rounded-sm ${fontClass} flex flex-col shrink-0`}>
            {/* HEADER */}
            <div className="text-center border-b-[3px] theme-border pb-8 mb-8">
                <h1 className="text-5xl font-extrabold uppercase tracking-wider text-slate-900 mb-2">{personalInfo.fullName}</h1>
                <p className="text-xl theme-text font-bold mb-4 tracking-wide">{personalInfo.jobTitle}</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
                    {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={15} className="theme-text" /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={15} className="theme-text" /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={15} className="theme-text" /> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1.5"><LinkIcon size={15} className="theme-text" /> {personalInfo.portfolio}</span>}
                </div>
            </div>

            {/* SUMMARY */}
            {summary?.trim() && (
                <div className="mb-8">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-4">Professional Summary</h2>
                    <div className="text-[0.95rem] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></div>
                </div>
            )}

            {/* EXPERIENCE */}
            {experience?.length > 0 && experience[0].company && (
                <div className="mb-8">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">Professional Experience</h2>
                    <div className="flex flex-col gap-8">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                    <span className="text-sm border-l-2 theme-border pl-3 text-slate-500 font-bold whitespace-nowrap">{exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}</span>
                                </div>
                                <div className="text-md font-bold theme-text mb-2">{exp.company}</div>
                                <div className="text-[0.95rem] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EDUCATION */}
            {education?.length > 0 && education[0].school && (
                <div className="mb-8">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">Education</h2>
                    <div className="flex flex-col gap-6">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{edu.school}</h3>
                                    <span className="text-sm border-l-2 theme-border pl-3 text-slate-500 font-bold whitespace-nowrap">{edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}</span>
                                </div>
                                <div className="text-md font-bold theme-text mb-2">{edu.degree}</div>
                                <div className="text-[0.95rem] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(edu.description) }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CERTIFICATIONS */}
            {certifications?.length > 0 && certifications[0].name && (
                <div className="mb-8">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-5">Certifications</h2>
                    <div className="flex flex-col gap-3">
                        {certifications.map(cert => cert.name && (
                            <div key={cert.id} className="flex justify-between items-center">
                                <div>
                                    <span className="font-bold text-slate-800 text-[0.95rem]">{cert.name}</span>
                                    {cert.issuer && <span className="text-slate-500 text-sm ml-2">· {cert.issuer}</span>}
                                </div>
                                {cert.year && <span className="text-sm font-bold theme-text whitespace-nowrap">{cert.year}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SKILLS */}
            {skills?.length > 0 && skills[0] && (
                <div className="mb-8 mt-auto">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-800 font-semibold mt-2">
                        {skills.map((skill, i) => skill && (
                            <span key={i} className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 shadow-sm">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // ─── UK TEMPLATE ────────────────────────────────────────────────
    const renderUKTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl rounded-sm ${fontClass} flex flex-col shrink-0`}>
            <div className="flex items-start justify-between border-b-[4px] border-slate-800 pb-8 mb-8">
                <div className="max-w-[65%]">
                    <h1 className="text-5xl font-medium text-slate-900 mb-3 tracking-tight">{personalInfo.fullName}</h1>
                    <p className="text-2xl theme-text italic font-medium">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-slate-600 flex flex-col gap-1.5 font-sans mt-2">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span className="text-slate-900 font-semibold">{personalInfo.email}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </div>

            {/* SUMMARY (full width) */}
            {summary?.trim() && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Profile</h2>
                    <div className="text-[0.95rem] text-slate-600 leading-loose font-sans" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></div>
                </div>
            )}

            <div className="grid grid-cols-12 gap-10 flex-grow">
                <div className="col-span-4 border-r-2 border-slate-200 pr-8">
                    {/* SKILLS */}
                    {skills?.length > 0 && skills[0] && (
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Core Expertise</h2>
                            <ul className="list-none flex flex-col gap-3 font-sans">
                                {skills.map((skill, i) => skill && (
                                    <li key={i} className="text-[0.95rem] text-slate-600 border-b border-slate-100 pb-2">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* EDUCATION */}
                    {education?.length > 0 && education[0].school && (
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Education</h2>
                            <div className="flex flex-col gap-8">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div className="text-md font-bold text-slate-800 mb-1 leading-snug">{edu.degree}</div>
                                        <div className="text-[0.95rem] text-slate-600 mb-1 font-sans">{edu.school}</div>
                                        <div className="text-sm theme-text italic font-medium mb-2">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CERTIFICATIONS */}
                    {certifications?.length > 0 && certifications[0].name && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Certifications</h2>
                            <div className="flex flex-col gap-5 font-sans">
                                {certifications.map(cert => cert.name && (
                                    <div key={cert.id}>
                                        <div className="font-bold text-slate-800 text-sm leading-snug">{cert.name}</div>
                                        {cert.issuer && <div className="text-slate-500 text-xs mt-0.5">{cert.issuer}</div>}
                                        {cert.year && <div className="theme-text text-xs italic mt-0.5">{cert.year}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-8 pl-2">
                    {/* EXPERIENCE */}
                    {experience?.length > 0 && experience[0].company && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-8 border-b border-slate-200 pb-2">Career History</h2>
                            <div className="flex flex-col gap-10">
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <h3 className="text-2xl font-medium text-slate-900 mb-1 tracking-tight">{exp.position}</h3>
                                        <div className="flex justify-between items-center mb-4 text-[0.95rem] text-slate-600 font-sans">
                                            <span className="font-bold theme-text">{exp.company}</span>
                                            <span className="italic text-slate-500 font-serif">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-[0.95rem] text-slate-600 leading-loose font-sans" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // ─── INDIA TEMPLATE ─────────────────────────────────────────────
    const renderIndiaTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] p-[15mm] border-[8px] border-double border-slate-300 shadow-2xl rounded-sm ${fontClass} flex flex-col shrink-0`}>
            <div className="flex justify-between items-center bg-slate-50 p-8 mb-8 border border-slate-200 shadow-sm rounded-sm">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
                    <p className="text-xl font-bold theme-text">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-slate-700 leading-relaxed font-medium">
                    {personalInfo.email && <div><strong>Email:</strong> {personalInfo.email}</div>}
                    {personalInfo.phone && <div><strong>Phone:</strong> {personalInfo.phone}</div>}
                    {personalInfo.location && <div><strong>Address:</strong> {personalInfo.location}</div>}
                    {personalInfo.portfolio && <div><strong>Website:</strong> {personalInfo.portfolio}</div>}
                </div>
            </div>

            <div className="px-4 flex-grow flex flex-col gap-8">

                {/* CAREER OBJECTIVE */}
                <div>
                    <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Career Objective</div>
                    <div className="text-[0.95rem] text-slate-700 leading-loose text-justify px-2 font-medium" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary?.trim() || `To secure a challenging position as a ${personalInfo.jobTitle} where I can utilize my expertise to contribute significantly to the organization's growth while continuously upgrading my professional skills.`) }}></div>
                </div>

                {/* WORK EXPERIENCE */}
                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-6 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Work Experience</div>
                        <div className="flex flex-col gap-6 px-2">
                            {experience.map(exp => (
                                <div key={exp.id} className="relative pl-6 border-l-[3px] border-slate-200">
                                    <div className="absolute w-3.5 h-3.5 theme-bg rounded-full -left-[8.5px] top-1 border-[2.5px] border-white shadow-sm"></div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{exp.company}</h3>
                                    <div className="text-[0.95rem] font-bold theme-text mb-2">{exp.position} <span className="text-slate-500 font-medium italic ml-2">({exp.startDate} - {exp.endDate})</span></div>
                                    <div className="text-[0.95rem] text-slate-600 leading-relaxed pb-2" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACADEMIC PROFILE */}
                {education?.length > 0 && education[0].school && (
                    <div>
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-5 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Academic Profile</div>
                        <table className="w-full text-[0.95rem] text-left border-collapse border border-slate-300 ml-1">
                            <thead className="theme-bg-light theme-text font-bold uppercase text-xs tracking-wider border-b-2 theme-border">
                                <tr>
                                    <th className="border-r border-slate-300 px-5 py-3">Degree/Course</th>
                                    <th className="border-r border-slate-300 px-5 py-3">Institution</th>
                                    <th className="px-5 py-3">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map((edu, idx) => (
                                    <tr key={edu.id} className={`text-slate-700 hover:bg-slate-50 ${idx < education.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                        <td className="border-r border-slate-300 px-5 py-3 font-bold text-slate-800">{edu.degree}</td>
                                        <td className="border-r border-slate-300 px-5 py-3 font-medium">{edu.school}</td>
                                        <td className="px-5 py-3 whitespace-nowrap italic text-slate-600">{edu.startDate} - {edu.endDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* CERTIFICATIONS */}
                {certifications?.length > 0 && certifications[0].name && (
                    <div>
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Certifications</div>
                        <div className="flex flex-col gap-3 px-2">
                            {certifications.map(cert => cert.name && (
                                <div key={cert.id} className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <div>
                                        <span className="font-bold text-slate-800 text-[0.95rem]">{cert.name}</span>
                                        {cert.issuer && <span className="text-slate-500 text-sm ml-2">· {cert.issuer}</span>}
                                    </div>
                                    {cert.year && <span className="theme-text font-bold text-sm whitespace-nowrap">{cert.year}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TECHNICAL SKILLS */}
                {skills?.length > 0 && skills[0] && (
                    <div className="mb-4">
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Technical Skills</div>
                        <ul className="list-none pl-2 grid grid-cols-2 gap-y-2 gap-x-10 text-[0.95rem] font-medium text-slate-700">
                            {skills.map((skill, i) => skill && (
                                <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* PERSONAL DOSSIER */}
                <div className="mt-auto">
                    <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 theme-bg rounded-full"></div> Personal Dossier</div>
                    <div className="grid grid-cols-[160px_1fr] gap-y-3 text-[0.95rem] text-slate-800 px-2 font-medium">
                        <div className="font-bold text-slate-500">Full Name:</div><div className="font-bold">{personalInfo.fullName}</div>
                        {personalInfo.location && <><div className="font-bold text-slate-500">Residential Address:</div><div>{personalInfo.location}</div></>}
                        <div className="font-bold text-slate-500">Languages Known:</div><div>English, Regional languages</div>
                    </div>
                </div>
            </div>
        </div>
    );

    // ─── MINIMALIST TEMPLATE ─────────────────────────────────────────
    const renderMinimalistTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl rounded-sm ${fontClass} flex flex-col shrink-0`}>
            {/* HEADER */}
            <div className="mb-10 flex flex-col items-start border-b border-slate-200 pb-8">
                <h1 className="text-6xl font-light tracking-tighter text-slate-900 mb-2">{personalInfo.fullName}</h1>
                <p className="text-xl theme-text font-medium tracking-wide mb-6">{personalInfo.jobTitle}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
                    {personalInfo.email && <span className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-1.5"><Mail size={12}/> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-1.5"><Phone size={12}/> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-1.5"><MapPin size={12}/> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="px-3 py-1 bg-slate-100 rounded-full flex items-center gap-1.5"><LinkIcon size={12}/> {personalInfo.portfolio}</span>}
                </div>
            </div>

            <div className="flex flex-col gap-10">
                {/* SUMMARY */}
                {summary?.trim() && (
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">About</h2>
                        <div className="text-[1.05rem] text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></div>
                    </div>
                )}

                {/* EXPERIENCE */}
                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Experience</h2>
                        <div className="flex flex-col gap-8">
                            {experience.map(exp => (
                                <div key={exp.id} className="grid grid-cols-[120px_1fr] gap-6">
                                    <div className="text-sm text-slate-500 font-medium pt-1">{exp.startDate} – {exp.endDate || 'Present'}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{exp.position}</h3>
                                        <div className="text-[0.95rem] theme-text font-medium mb-3">{exp.company}</div>
                                        <div className="text-[0.95rem] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDUCATION */}
                {education?.length > 0 && education[0].school && (
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Education</h2>
                        <div className="flex flex-col gap-6">
                            {education.map(edu => (
                                <div key={edu.id} className="grid grid-cols-[120px_1fr] gap-6">
                                    <div className="text-sm text-slate-500 font-medium pt-1">{edu.startDate} – {edu.endDate}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{edu.degree}</h3>
                                        <div className="text-[0.95rem] text-slate-600 font-medium mb-2">{edu.school}</div>
                                        <div className="text-[0.95rem] text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(edu.description) }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-10">
                    {/* SKILLS */}
                    {skills?.length > 0 && skills[0] && (
                        <div>
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Skills</h2>
                            <div className="flex flex-wrap gap-2 text-[0.9rem] text-slate-700 font-medium">
                                {skills.map((skill, i) => skill && (
                                    <span key={i} className="px-0 py-1 border-b border-slate-200">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CERTIFICATIONS */}
                    {certifications?.length > 0 && certifications[0].name && (
                        <div>
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Certifications</h2>
                            <div className="flex flex-col gap-3">
                                {certifications.map(cert => cert.name && (
                                    <div key={cert.id}>
                                        <div className="font-semibold text-slate-800 text-[0.95rem]">{cert.name}</div>
                                        <div className="text-slate-500 text-sm">{cert.issuer} {cert.year && `(${cert.year})`}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // ─── CREATIVE TEMPLATE ──────────────────────────────────────────
    const renderCreativeTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] shadow-2xl rounded-sm ${fontClass} flex shrink-0`}>
            {/* LEFT COLUMN */}
            <div className="w-[35%] theme-bg text-white p-[15mm] flex flex-col gap-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2 leading-none">{personalInfo.fullName}</h1>
                    <p className="text-lg font-medium opacity-90">{personalInfo.jobTitle}</p>
                </div>

                <div className="flex flex-col gap-3 text-sm opacity-90">
                    {personalInfo.email && <span className="flex items-center gap-2 break-all"><Mail size={14} /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-2 break-all"><LinkIcon size={14} /> {personalInfo.portfolio}</span>}
                </div>

                {skills?.length > 0 && skills[0] && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Expertise</h2>
                        <div className="flex flex-col gap-2 text-[0.95rem]">
                            {skills.map((skill, i) => skill && (
                                <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"></div>{skill}</div>
                            ))}
                        </div>
                    </div>
                )}

                {certifications?.length > 0 && certifications[0].name && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Certifications</h2>
                        <div className="flex flex-col gap-4">
                            {certifications.map(cert => cert.name && (
                                <div key={cert.id}>
                                    <div className="font-bold text-[0.95rem]">{cert.name}</div>
                                    <div className="text-xs opacity-80 mt-0.5">{cert.issuer} {cert.year && `· ${cert.year}`}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-[65%] p-[15mm] flex flex-col gap-8 bg-slate-50">
                {summary?.trim() && (
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="p-1 theme-bg text-white rounded"><Award size={18}/></span> Profile
                        </h2>
                        <div className="text-[0.95rem] text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-100 shadow-sm" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></div>
                    </div>
                )}

                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="p-1 theme-bg text-white rounded"><Award size={18}/></span> Experience
                        </h2>
                        <div className="flex flex-col gap-6">
                            {experience.map(exp => (
                                <div key={exp.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full theme-bg"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                        <span className="text-xs font-bold theme-text bg-slate-50 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-bold text-slate-500 mb-3">{exp.company}</div>
                                    <div className="text-[0.95rem] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {education?.length > 0 && education[0].school && (
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="p-1 theme-bg text-white rounded"><Award size={18}/></span> Education
                        </h2>
                        <div className="flex flex-col gap-4">
                            {education.map(edu => (
                                <div key={edu.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full theme-bg"></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-sm text-slate-500 mt-1">{edu.school}</div>
                                    </div>
                                    <div className="text-sm font-bold theme-text bg-slate-50 px-2 py-1 rounded w-max">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // ─── EXECUTIVE TEMPLATE ─────────────────────────────────────────
    const renderExecutiveTemplate = () => (
        <div ref={resumeRef} className={`bg-white text-slate-800 w-[210mm] min-h-[297mm] shadow-2xl rounded-sm ${fontClass} flex flex-col shrink-0 overflow-hidden`}>
            {/* HEADER */}
            <div className="theme-bg text-white p-[15mm] text-center">
                <h1 className="text-5xl font-serif font-bold tracking-wide mb-3">{personalInfo.fullName}</h1>
                <p className="text-xl font-medium opacity-90 mb-5">{personalInfo.jobTitle}</p>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm opacity-90 font-medium">
                    {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={14}/> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14}/> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={14}/> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1.5"><LinkIcon size={14}/> {personalInfo.portfolio}</span>}
                </div>
            </div>

            <div className="p-[15mm] flex flex-col gap-8 flex-grow">
                {/* SUMMARY */}
                {summary?.trim() && (
                    <div className="mb-2">
                        <div className="text-[1.05rem] text-slate-700 leading-relaxed font-serif text-center px-10 italic" dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}></div>
                    </div>
                )}

                <div className="w-16 h-1 theme-bg mx-auto"></div>

                {/* EXPERIENCE */}
                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-center">Professional Experience</h2>
                        <div className="flex flex-col gap-8">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-end border-b-2 border-slate-100 pb-2 mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                            <div className="text-md theme-text font-bold mt-1">{exp.company}</div>
                                        </div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{exp.startDate} — {exp.endDate}</div>
                                    </div>
                                    <div className="text-[0.95rem] text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseMarkdown(exp.description) }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-10 mt-4">
                    {/* EDUCATION */}
                    {education?.length > 0 && education[0].school && (
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Education</h2>
                            <div className="flex flex-col gap-5">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-[0.95rem] font-medium text-slate-600 mt-0.5">{edu.school}</div>
                                        <div className="text-sm text-slate-400 mt-1">{edu.startDate} — {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div>
                        {/* SKILLS */}
                        {skills?.length > 0 && skills[0] && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Core Competencies</h2>
                                <div className="flex flex-wrap gap-2 text-sm font-semibold theme-text">
                                    {skills.map((skill, i) => skill && (
                                        <span key={i} className="theme-bg-light px-3 py-1.5 rounded">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CERTIFICATIONS */}
                        {certifications?.length > 0 && certifications[0].name && (
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Certifications</h2>
                                <div className="flex flex-col gap-3">
                                    {certifications.map(cert => cert.name && (
                                        <div key={cert.id} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded border border-slate-100">
                                            <div>
                                                <div className="font-bold text-slate-800">{cert.name}</div>
                                                <div className="text-slate-500 text-xs mt-0.5">{cert.issuer}</div>
                                            </div>
                                            <div className="text-sm font-bold theme-text">{cert.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div
            className="bg-slate-950 border-l border-slate-800"
            style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', minWidth: 0 }}
        >
            <div className="p-8 flex flex-col items-center">

                {/* ── Header bar with zoom control ── */}
                <div className="w-full max-w-[800px] flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h2 className="text-white font-bold text-xl drop-shadow-sm">
                        Live Preview <span className="text-indigo-400 font-normal">({template} Format)</span>
                    </h2>

                    <div className="flex items-center gap-4">
                        {/* Zoom control */}
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
                            <button
                                onClick={() => setZoom(z => Math.max(50, z - 5))}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <input
                                type="range"
                                min={50}
                                max={120}
                                value={zoom}
                                onChange={e => setZoom(Number(e.target.value))}
                                className="w-24 accent-indigo-500 cursor-pointer"
                            />
                            <button
                                onClick={() => setZoom(z => Math.min(120, z + 5))}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <ZoomIn size={16} />
                            </button>
                            <span className="text-slate-400 text-xs w-8 text-right tabular-nums">{zoom}%</span>
                        </div>

                        <button
                            onClick={generatePDF}
                            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all"
                        >
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>

                {/* ── Zoomable resume card ── */}
                <style>{`
                  .theme-text { color: ${themeColor} !important; }
                  .theme-border { border-color: ${themeColor} !important; }
                  .theme-bg { background-color: ${themeColor} !important; }
                  .theme-bg-light { background-color: ${themeColor}15 !important; }
                  
                  /* Dynamic Font Scaling restricted to Canvas */
                  .resume-canvas { font-size: ${sizeScale * 16}px; }
                  .resume-canvas .text-xs { font-size: ${sizeScale * 0.75}rem !important; line-height: ${sizeScale * 1}rem !important; }
                  .resume-canvas .text-sm { font-size: ${sizeScale * 0.875}rem !important; line-height: ${sizeScale * 1.25}rem !important; }
                  .resume-canvas .text-base, .resume-canvas p, .resume-canvas li { font-size: ${sizeScale * 1}rem !important; line-height: ${sizeScale * 1.5}rem !important; }
                  .resume-canvas .text-lg { font-size: ${sizeScale * 1.125}rem !important; line-height: ${sizeScale * 1.75}rem !important; }
                  .resume-canvas .text-xl { font-size: ${sizeScale * 1.25}rem !important; line-height: ${sizeScale * 1.75}rem !important; }
                  .resume-canvas .text-2xl { font-size: ${sizeScale * 1.5}rem !important; line-height: ${sizeScale * 2}rem !important; }
                  .resume-canvas .text-3xl { font-size: ${sizeScale * 1.875}rem !important; line-height: ${sizeScale * 2.25}rem !important; }
                  .resume-canvas .text-4xl { font-size: ${sizeScale * 2.25}rem !important; line-height: ${sizeScale * 2.5}rem !important; }
                  .resume-canvas .text-5xl { font-size: ${sizeScale * 3}rem !important; line-height: 1 !important; }
                `}</style>
                <div className="resume-canvas" style={{ transformOrigin: 'top center', transform: `scale(${zoom / 100})`, marginBottom: `${(zoom - 100) * 2.97}mm` }}>
                    {template === 'US' && renderUSTemplate()}
                    {template === 'UK' && renderUKTemplate()}
                    {template === 'India' && renderIndiaTemplate()}
                    {template === 'Minimalist' && renderMinimalistTemplate()}
                    {template === 'Creative' && renderCreativeTemplate()}
                    {template === 'Executive' && renderExecutiveTemplate()}
                </div>

            </div>
        </div>
    );
}
