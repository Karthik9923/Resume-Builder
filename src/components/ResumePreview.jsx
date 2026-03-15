import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

export default function ResumePreview({ resumeData, template }) {
    const resumeRef = useRef(null);

    const generatePDF = () => {
        const element = resumeRef.current;
        if (!element) return;
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName.replace(/\\s+/g, '_')}_${template}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    // COMMON RENDERERS
    const { personalInfo, experience, education, skills } = resumeData;

    const renderUSTemplate = () => (
        <div className="bg-white text-slate-900 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl rounded-sm font-sans flex flex-col shrink-0">
            {/* HEADER */}
            <div className="text-center border-b-[3px] border-indigo-600 pb-8 mb-10">
                <h1 className="text-5xl font-extrabold uppercase tracking-wider text-slate-900 mb-2">{personalInfo.fullName}</h1>
                <p className="text-xl text-indigo-600 font-bold mb-4 tracking-wide">{personalInfo.jobTitle}</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
                    {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={15} className="text-indigo-500" /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={15} className="text-indigo-500" /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={15} className="text-indigo-500" /> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1.5"><LinkIcon size={15} className="text-indigo-500" /> {personalInfo.portfolio}</span>}
                </div>
            </div>

            {/* EXPERIENCE */}
            {experience?.length > 0 && experience[0].company && (
                <div className="mb-10">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">Professional Experience</h2>
                    <div className="flex flex-col gap-8">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                    <span className="text-sm border-l-2 border-indigo-500 pl-3 text-slate-500 font-bold whitespace-nowrap">{exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}</span>
                                </div>
                                <div className="text-md font-bold text-indigo-600 mb-2">{exp.company}</div>
                                <p className="text-[0.95rem] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EDUCATION */}
            {education?.length > 0 && education[0].school && (
                <div className="mb-10">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2 mb-6">Education</h2>
                    <div className="flex flex-col gap-6">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{edu.school}</h3>
                                    <span className="text-sm border-l-2 border-indigo-500 pl-3 text-slate-500 font-bold whitespace-nowrap">{edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}</span>
                                </div>
                                <div className="text-md font-bold text-indigo-600 mb-2">{edu.degree}</div>
                                <p className="text-[0.95rem] text-slate-600 leading-relaxed whitespace-pre-wrap">{edu.description}</p>
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

    const renderUKTemplate = () => (
        <div className="bg-white text-slate-800 w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl rounded-sm font-serif flex flex-col shrink-0">
            <div className="flex items-start justify-between border-b-[4px] border-slate-800 pb-8 mb-10">
                <div className="max-w-[65%]">
                    <h1 className="text-5xl font-medium text-slate-900 mb-3 tracking-tight">{personalInfo.fullName}</h1>
                    <p className="text-2xl text-indigo-600 italic font-medium">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-slate-600 flex flex-col gap-1.5 font-sans mt-2">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span className="text-slate-900 font-semibold">{personalInfo.email}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10 flex-grow">
                <div className="col-span-4 border-r-2 border-slate-200 pr-8">
                    {/* SKILLS COLUMN */}
                    {skills?.length > 0 && skills[0] && (
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Core Expertise</h2>
                            <ul className="list-none flex flex-col gap-3 font-sans">
                                {skills.map((skill, i) => skill && (
                                    <li key={i} className="text-[0.95rem] text-slate-600 border-b border-slate-100 pb-2">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* EDUCATION COLUMN */}
                    {education?.length > 0 && education[0].school && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Education</h2>
                            <div className="flex flex-col gap-8">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <div className="text-md font-bold text-slate-800 mb-1 leading-snug">{edu.degree}</div>
                                        <div className="text-[0.95rem] text-slate-600 mb-1 font-sans">{edu.school}</div>
                                        <div className="text-sm text-indigo-500 italic font-medium mb-2">{edu.startDate} - {edu.endDate}</div>
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
                                            <span className="font-bold text-indigo-700">{exp.company}</span>
                                            <span className="italic text-slate-500 font-serif">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <p className="text-[0.95rem] text-slate-600 leading-loose font-sans whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderIndiaTemplate = () => (
        <div className="bg-white text-slate-800 w-[210mm] min-h-[297mm] p-[15mm] border-[8px] border-double border-slate-300 shadow-2xl rounded-sm font-sans flex flex-col shrink-0">

            <div className="flex justify-between items-center bg-slate-50 p-8 mb-8 border border-slate-200 shadow-sm rounded-sm">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
                    <p className="text-xl font-bold text-indigo-600">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-slate-700 leading-relaxed font-medium">
                    {personalInfo.email && <div><strong>Email:</strong> {personalInfo.email}</div>}
                    {personalInfo.phone && <div><strong>Phone:</strong> {personalInfo.phone}</div>}
                    {personalInfo.location && <div><strong>Address:</strong> {personalInfo.location}</div>}
                    {personalInfo.portfolio && <div><strong>Website:</strong> {personalInfo.portfolio}</div>}
                </div>
            </div>

            <div className="px-4 flex-grow flex flex-col gap-8">
                {/* OBJECTIVE (Simulated by Job Title) */}
                <div>
                    <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Career Objective</div>
                    <p className="text-[0.95rem] text-slate-700 leading-loose text-justify px-2 font-medium">
                        To secure a challenging position as a {personalInfo.jobTitle} where I can utilize my expertise to contribute significantly to the organization's growth while continuously upgrading my professional skills.
                    </p>
                </div>

                {/* WORK EXPERIENCE */}
                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-6 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Work Experience</div>
                        <div className="flex flex-col gap-6 px-2">
                            {experience.map(exp => (
                                <div key={exp.id} className="relative pl-6 border-l-[3px] border-slate-200">
                                    <div className="absolute w-3.5 h-3.5 bg-indigo-500 rounded-full -left-[8.5px] top-1 border-[2.5px] border-white shadow-sm"></div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{exp.company}</h3>
                                    <div className="text-[0.95rem] font-bold text-indigo-700 mb-2">{exp.position} <span className="text-slate-500 font-medium italic ml-2">({exp.startDate} - {exp.endDate})</span></div>
                                    <p className="text-[0.95rem] text-slate-600 whitespace-pre-wrap leading-relaxed pb-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACADEMIC QUALIFICATIONS */}
                {education?.length > 0 && education[0].school && (
                    <div>
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-5 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Academic Profile</div>
                        <table className="w-full text-[0.95rem] text-left border-collapse border border-slate-300 ml-1">
                            <thead className="bg-indigo-50 text-indigo-900 font-bold uppercase text-xs tracking-wider border-b-2 border-indigo-200">
                                <tr>
                                    <th className="border-r border-slate-300 px-5 py-3">Degree/Course</th>
                                    <th className="border-r border-slate-300 px-5 py-3">Institution</th>
                                    <th className="px-5 py-3">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map((edu, idx) => (
                                    <tr key={edu.id} className={`text-slate-700 hover:bg-slate-50 relative ${idx < education.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                        <td className="border-r border-slate-300 px-5 py-3 font-bold text-slate-800">{edu.degree}</td>
                                        <td className="border-r border-slate-300 px-5 py-3 font-medium">{edu.school}</td>
                                        <td className="px-5 py-3 whitespace-nowrap italic text-slate-600">{edu.startDate} - {edu.endDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* IT SKILLS */}
                {skills?.length > 0 && skills[0] && (
                    <div className="mb-4">
                        <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Technical Skills</div>
                        <ul className="list-none pl-2 grid grid-cols-2 gap-y-2 gap-x-10 text-[0.95rem] font-medium text-slate-700">
                            {skills.map((skill, i) => skill && (
                                <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* PERSONAL DOSSIER */}
                <div className="mt-auto">
                    <div className="bg-slate-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm shadow-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Personal Dossier</div>
                    <div className="grid grid-cols-[160px_1fr] gap-y-3 text-[0.95rem] text-slate-800 px-2 font-medium">
                        <div className="font-bold text-slate-500">Full Name:</div><div className="font-bold">{personalInfo.fullName}</div>
                        {personalInfo.location && <><div className="font-bold text-slate-500">Residential Address:</div><div>{personalInfo.location}</div></>}
                        <div className="font-bold text-slate-500">Languages Known:</div><div>English, Regional languages</div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="flex-[2] p-8 flex flex-col items-center overflow-y-auto relative bg-slate-950 border-l border-slate-800 custom-scrollbar">
            <div className="w-full max-w-[800px] flex justify-between items-center mb-6">
                <h2 className="text-white font-bold text-xl drop-shadow-sm">Live Preview <span className="text-indigo-400 font-normal">({template} Format)</span></h2>
                <button
                    onClick={generatePDF}
                    className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all"
                >
                    <Download size={18} /> Download PDF
                </button>
            </div>

            <div className="origin-top flex justify-center pb-8">
                {template === 'US' && renderUSTemplate()}
                {template === 'UK' && renderUKTemplate()}
                {template === 'India' && renderIndiaTemplate()}
            </div>
        </div>
    );
}
