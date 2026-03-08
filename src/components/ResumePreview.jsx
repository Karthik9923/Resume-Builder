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
            <div className="text-center border-b-[3px] border-slate-800 pb-8 mb-10">
                <h1 className="text-5xl font-extrabold uppercase tracking-wider text-slate-900 mb-2">{personalInfo.fullName}</h1>
                <p className="text-xl text-slate-600 font-semibold mb-4 tracking-wide">{personalInfo.jobTitle}</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
                    {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={15} /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={15} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={15} /> {personalInfo.location}</span>}
                    {personalInfo.portfolio && <span className="flex items-center gap-1.5"><LinkIcon size={15} /> {personalInfo.portfolio}</span>}
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
                                    <span className="text-sm border-l-2 border-mint-500 pl-3 text-slate-500 font-bold whitespace-nowrap">{exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}</span>
                                </div>
                                <div className="text-md font-semibold text-mint-600 mb-2">{exp.company}</div>
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
                                    <span className="text-sm text-slate-500 font-bold whitespace-nowrap border-l-2 border-mint-500 pl-3">{edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}</span>
                                </div>
                                <div className="text-md font-semibold text-mint-600 mb-2">{edu.degree}</div>
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
                            <span key={i} className="bg-slate-100/80 px-4 py-2 rounded-md border border-slate-200 shadow-sm">{skill}</span>
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
                    <p className="text-2xl text-slate-500 italic font-light">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-slate-600 flex flex-col gap-1.5 font-sans mt-2">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <span className="text-slate-800 font-medium">{personalInfo.email}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10 flex-grow">
                <div className="col-span-4 border-r-2 border-slate-100 pr-8">
                    {/* SKILLS COLUMN */}
                    {skills?.length > 0 && skills[0] && (
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Core Expertise</h2>
                            <ul className="list-none flex flex-col gap-3 font-sans">
                                {skills.map((skill, i) => skill && (
                                    <li key={i} className="text-[0.95rem] text-slate-600 border-b border-slate-50 pb-2">{skill}</li>
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
                                        <div className="text-sm text-slate-400 italic mb-2">{edu.startDate} - {edu.endDate}</div>
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
                                            <span className="font-bold text-slate-800">{exp.company}</span>
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
        <div className="bg-white text-gray-800 w-[210mm] min-h-[297mm] p-[15mm] border-[8px] border-double border-gray-300 shadow-2xl rounded-sm font-sans flex flex-col shrink-0">

            <div className="flex justify-between items-center bg-gray-50 p-8 mb-8 border border-gray-200 shadow-sm rounded-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
                    <p className="text-xl font-semibold text-mint-700">{personalInfo.jobTitle}</p>
                </div>
                <div className="text-right text-[0.95rem] text-gray-700 leading-relaxed font-medium">
                    {personalInfo.email && <div><strong>Email:</strong> {personalInfo.email}</div>}
                    {personalInfo.phone && <div><strong>Phone:</strong> {personalInfo.phone}</div>}
                    {personalInfo.location && <div><strong>Address:</strong> {personalInfo.location}</div>}
                    {personalInfo.portfolio && <div><strong>Website:</strong> {personalInfo.portfolio}</div>}
                </div>
            </div>

            <div className="px-4 flex-grow flex flex-col gap-8">
                {/* OBJECTIVE (Simulated by Job Title) */}
                <div>
                    <div className="bg-gray-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm">Career Objective</div>
                    <p className="text-[0.95rem] text-gray-700 leading-loose text-justify px-2 font-medium">
                        To secure a challenging position as a {personalInfo.jobTitle} where I can utilize my expertise to contribute significantly to the organization's growth while continuously upgrading my professional skills.
                    </p>
                </div>

                {/* WORK EXPERIENCE */}
                {experience?.length > 0 && experience[0].company && (
                    <div>
                        <div className="bg-gray-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-6 text-sm rounded-sm">Work Experience</div>
                        <div className="flex flex-col gap-6 px-2">
                            {experience.map(exp => (
                                <div key={exp.id} className="relative pl-6 border-l-[3px] border-mint-200">
                                    <div className="absolute w-3 h-3 bg-mint-500 rounded-full -left-[7.5px] top-1 border-2 border-white"></div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 tracking-tight">{exp.company}</h3>
                                    <div className="text-[0.95rem] font-semibold text-gray-700 mb-2">{exp.position} <span className="text-gray-500 font-normal italic ml-2">({exp.startDate} - {exp.endDate})</span></div>
                                    <p className="text-[0.95rem] text-gray-600 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACADEMIC QUALIFICATIONS */}
                {education?.length > 0 && education[0].school && (
                    <div>
                        <div className="bg-gray-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-5 text-sm rounded-sm">Academic Profile</div>
                        <table className="w-full text-[0.95rem] text-left border-collapse border border-gray-300 ml-1">
                            <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="border border-gray-300 px-5 py-3">Degree/Course</th>
                                    <th className="border border-gray-300 px-5 py-3">Institution</th>
                                    <th className="border border-gray-300 px-5 py-3">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map(edu => (
                                    <tr key={edu.id} className="text-gray-700 hover:bg-gray-50 relative">
                                        <td className="border border-gray-300 px-5 py-3 font-semibold">{edu.degree}</td>
                                        <td className="border border-gray-300 px-5 py-3">{edu.school}</td>
                                        <td className="border border-gray-300 px-5 py-3 whitespace-nowrap">{edu.startDate} - {edu.endDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* IT SKILLS */}
                {skills?.length > 0 && skills[0] && (
                    <div className="mb-4">
                        <div className="bg-gray-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm">Technical Skills</div>
                        <ul className="list-disc pl-8 text-[0.95rem] font-medium text-gray-700 columns-2 gap-10">
                            {skills.map((skill, i) => skill && (
                                <li key={i} className="mb-2">{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* PERSONAL DOSSIER */}
                <div className="mt-auto">
                    <div className="bg-gray-800 text-white px-4 py-2 font-bold uppercase tracking-widest mb-4 text-sm rounded-sm">Personal Dossier</div>
                    <div className="grid grid-cols-[160px_1fr] gap-y-3 text-[0.95rem] text-gray-800 px-2 font-medium">
                        <div className="font-bold text-gray-600">Full Name:</div><div>{personalInfo.fullName}</div>
                        {personalInfo.location && <><div className="font-bold text-gray-600">Residential Address:</div><div>{personalInfo.location}</div></>}
                        <div className="font-bold text-gray-600">Languages Known:</div><div>English, Regional languages</div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="flex-[2] p-8 flex flex-col items-center overflow-y-auto relative bg-slate-50">
            <div className="w-full max-w-[800px] flex justify-between items-center mb-6">
                <h2 className="text-slate-800 font-bold text-xl drop-shadow-sm">Live Preview ({template} Format)</h2>
                <button
                    onClick={generatePDF}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
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
