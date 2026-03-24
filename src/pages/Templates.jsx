import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, ArrowLeft, Star, Zap, Globe, CheckCircle } from 'lucide-react';

const templates = [
    {
        id: 'US',
        name: 'US Standard',
        tag: 'Most Popular',
        tagColor: 'indigo',
        region: '🇺🇸 United States',
        style: 'Clean · Modern · ATS-Friendly',
        description:
            'A streamlined, single-column layout favored by US tech companies and startups. Bold header with centered contact info, clear section dividers, and a skills chip grid.',
        highlights: ['ATS-optimized layout', 'Single column design', 'Skill tags display', 'Summary section'],
        accent: '#6366f1',
        preview: <USPreview />,
    },
    {
        id: 'UK',
        name: 'UK Professional',
        tag: 'Executive',
        tagColor: 'emerald',
        region: '🇬🇧 United Kingdom',
        style: 'Two-Column · Serif · Detailed',
        description:
            'A sophisticated two-column layout with a serif font, preferred by UK professionals. Features a side column for skills & education and a main column for career history.',
        highlights: ['Two-column structure', 'Serif typography', 'Sidebar skills', 'Career history format'],
        accent: '#10b981',
        preview: <UKPreview />,
    },
    {
        id: 'India',
        name: 'India Structured',
        tag: 'Traditional',
        tagColor: 'amber',
        region: '🇮🇳 India',
        style: 'Formal · Structured · Detailed',
        description:
            'A formal, detailed layout widely accepted across Indian industries. Includes a career objective, academic profile table, personal dossier, and timeline-style work history.',
        highlights: ['Career objective section', 'Academic table layout', 'Timeline experience', 'Personal dossier'],
        accent: '#f59e0b',
        preview: <IndiaPreview />,
    },
    {
        id: 'Minimalist',
        name: 'Modern Minimalist',
        tag: 'Designer',
        tagColor: 'rose',
        region: '🌐 Universal',
        style: 'Clean · Spacious · Typography',
        description:
            'A beautifully spacious, typography-focused template. Relies on negative space and clean lines instead of heavy borders or backgrounds.',
        highlights: ['Negative space focused', 'Modern typography', 'Side-by-side elements'],
        accent: '#f43f5e',
        preview: <MinimalistPreview />,
    },
    {
        id: 'Creative',
        name: 'Creative Two-Column',
        tag: 'Tech',
        tagColor: 'sky',
        region: '💻 Silicon Valley',
        style: 'Bold · Asymmetrical · Dynamic',
        description:
            'A striking asymmetrical layout with a bold colored sidebar. Perfect for tech roles, designers, or anyone wanting their resume to pop out of the stack.',
        highlights: ['Bold colored sidebar', 'Asymmetrical layout', 'Card-style sections'],
        accent: '#0ea5e9',
        preview: <CreativePreview />,
    },
    {
        id: 'Executive',
        name: 'Executive Dark',
        tag: 'Leadership',
        tagColor: 'slate',
        region: '🏛️ Corporate',
        style: 'Authority · Centered · Impactful',
        description:
            'A commanding template featuring a dark, full-width header and centered traditional columns below. Communicates authority and established success.',
        highlights: ['Dark statement header', 'Centered architecture', 'Serif typography focus'],
        accent: '#64748b',
        preview: <ExecutivePreview />,
    },
];

// ── Mini visual previews ──────────────────────────────────────────────────────

function USPreview() {
    return (
        <div className="w-full h-full bg-white p-4 flex flex-col text-[6px] font-sans">
            <div className="border-b-2 border-indigo-600 pb-2 mb-2 text-center">
                <div className="font-black text-[10px] text-slate-800 uppercase tracking-wide">ALEXANDER WRIGHT</div>
                <div className="text-indigo-600 font-bold text-[8px]">Senior Software Engineer</div>
                <div className="flex justify-center gap-2 mt-1 text-slate-500">
                    <span>✉ email@example.com</span>
                    <span>📞 +1 555 123</span>
                    <span>📍 San Francisco</span>
                </div>
            </div>
            <div className="mb-2">
                <div className="text-[7px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-1">Professional Summary</div>
                <div className="text-slate-500 leading-relaxed">Results-driven engineer with 6+ years building scalable web applications and leading cross-functional teams.</div>
            </div>
            <div className="mb-2">
                <div className="text-[7px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-1">Professional Experience</div>
                <div className="flex justify-between"><span className="font-bold text-slate-700">Lead Frontend Developer</span><span className="text-indigo-600 border-l border-indigo-400 pl-1">Mar 2021 - Present</span></div>
                <div className="text-indigo-600 font-bold mb-0.5">Innovatech Solutions</div>
                <div className="text-slate-500">Architected scalable web apps. Mentored devs and improved performance by 40%.</div>
            </div>
            <div className="mb-2">
                <div className="text-[7px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-1">Skills & Expertise</div>
                <div className="flex flex-wrap gap-1">
                    {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'].map(s => (
                        <span key={s} className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-slate-700">{s}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function UKPreview() {
    return (
        <div className="w-full h-full bg-white p-3 flex flex-col text-[6px] font-serif">
            <div className="flex justify-between border-b-2 border-slate-800 pb-2 mb-2">
                <div>
                    <div className="font-medium text-[10px] text-slate-900 tracking-tight">Alexander Wright</div>
                    <div className="text-emerald-600 italic text-[8px]">Senior Software Engineer</div>
                </div>
                <div className="text-right text-slate-500 font-sans text-[6px]">
                    <div>San Francisco, CA</div>
                    <div>+1 555 123 4567</div>
                    <div className="text-slate-800 font-bold">email@example.com</div>
                </div>
            </div>
            <div className="mb-2">
                <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-0.5 mb-1">Profile</div>
                <div className="text-slate-500 font-sans leading-relaxed">Experienced engineer with expertise in scalable systems and team leadership.</div>
            </div>
            <div className="grid grid-cols-5 gap-2 flex-1">
                <div className="col-span-2 border-r border-slate-200 pr-2">
                    <div className="text-[7px] font-bold text-slate-800 uppercase mb-1 border-b border-slate-200 pb-0.5">Core Expertise</div>
                    {['React.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'].map(s => (
                        <div key={s} className="text-slate-500 border-b border-slate-100 pb-0.5 mb-0.5 font-sans">{s}</div>
                    ))}
                    <div className="text-[7px] font-bold text-slate-800 uppercase mb-1 border-b border-slate-200 pb-0.5 mt-2">Education</div>
                    <div className="font-bold text-slate-700">B.S. Computer Science</div>
                    <div className="text-slate-500 font-sans">University of Technology</div>
                    <div className="text-emerald-500 italic">2014 - 2018</div>
                </div>
                <div className="col-span-3 pl-1">
                    <div className="text-[7px] font-bold text-slate-800 uppercase mb-1 border-b border-slate-200 pb-0.5">Career History</div>
                    <div className="text-[8px] font-medium text-slate-900 tracking-tight">Lead Frontend Developer</div>
                    <div className="flex justify-between text-slate-500 font-sans mb-0.5">
                        <span className="font-bold text-emerald-700">Innovatech</span>
                        <span className="italic">2021 – Present</span>
                    </div>
                    <div className="text-slate-500 font-sans">Built scalable apps and mentored junior developers.</div>
                </div>
            </div>
        </div>
    );
}

function IndiaPreview() {
    return (
        <div className="w-full h-full bg-white p-2 border-2 border-double border-slate-300 flex flex-col text-[6px] font-sans">
            <div className="flex justify-between bg-slate-50 p-2 mb-2 border border-slate-200">
                <div>
                    <div className="font-bold text-[9px] text-slate-800 uppercase">ALEXANDER WRIGHT</div>
                    <div className="font-bold text-amber-600 text-[7px]">Senior Software Engineer</div>
                </div>
                <div className="text-right text-slate-600">
                    <div><strong>Email:</strong> email@ex.com</div>
                    <div><strong>Phone:</strong> +91 99999</div>
                    <div><strong>Address:</strong> Mumbai</div>
                </div>
            </div>
            <div className="mb-1.5">
                <div className="bg-slate-800 text-white px-2 py-0.5 font-bold uppercase tracking-widest mb-1 text-[6px] flex items-center gap-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span> Career Objective</div>
                <div className="text-slate-600 px-1">To secure a challenging position as a Software Engineer contributing to organizational growth.</div>
            </div>
            <div className="mb-1.5">
                <div className="bg-slate-800 text-white px-2 py-0.5 font-bold uppercase tracking-widest mb-1 text-[6px] flex items-center gap-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span> Academic Profile</div>
                <table className="w-full border border-slate-300 text-[5.5px]">
                    <thead className="bg-indigo-50 font-bold text-indigo-800">
                        <tr><th className="border-r border-slate-200 px-1 py-0.5">Degree</th><th className="border-r border-slate-200 px-1 py-0.5">Institution</th><th className="px-1 py-0.5">Year</th></tr>
                    </thead>
                    <tbody>
                        <tr className="text-slate-600"><td className="border-r border-slate-200 px-1 py-0.5">B.S. CS</td><td className="border-r border-slate-200 px-1 py-0.5">Univ of Tech</td><td className="px-1 py-0.5">2018</td></tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div className="bg-slate-800 text-white px-2 py-0.5 font-bold uppercase tracking-widest mb-1 text-[6px] flex items-center gap-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span> Technical Skills</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 px-1 text-slate-600">
                    {['React.js', 'TypeScript', 'Node.js', 'GraphQL'].map(s => (
                        <div key={s} className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-slate-400"></span>{s}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MinimalistPreview() {
    return (
        <div className="w-full h-full bg-white p-4 flex flex-col text-[6px] font-sans">
            <div className="mb-4 text-left">
                <div className="font-light text-[14px] text-slate-800 tracking-tighter leading-none mb-1">Alexander Wright</div>
                <div className="font-medium text-[8px] text-rose-500">Senior Software Engineer</div>
            </div>
            <div className="flex gap-4">
                <div className="w-1/3 text-[5px] text-slate-400 font-bold uppercase tracking-widest text-right pr-2 border-r border-slate-200">
                    <div className="mb-1">About</div>
                    <div className="mt-8 mb-1">Experience</div>
                    <div className="mt-[38px] mb-1">Education</div>
                </div>
                <div className="w-2/3 pl-1 flex flex-col gap-2">
                    <div className="text-slate-500 leading-relaxed text-[5.5px]">Results-driven engineer building scalable web applications.</div>
                    <div className="mt-2 text-[5.5px]">
                        <div className="font-bold text-slate-800">Lead Frontend Developer</div>
                        <div className="text-rose-500 font-medium">Innovatech Solutions</div>
                        <div className="text-slate-500 leading-relaxed mt-0.5">Architected scalable web apps. Mentored devs.</div>
                    </div>
                    <div className="mt-2 text-[5.5px]">
                        <div className="font-bold text-slate-800">B.S. Computer Science</div>
                        <div className="text-slate-500">Univ of Technology</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreativePreview() {
    return (
        <div className="w-full h-full bg-white flex text-[6px] font-sans">
            <div className="w-[35%] h-full bg-sky-600 text-white p-2 flex flex-col gap-2">
                <div className="mb-2">
                    <div className="font-bold text-[10px] leading-tight mb-1">Alexander Wright</div>
                    <div className="opacity-80 text-[5px]">Senior Software Engineer</div>
                </div>
                <div className="border-b border-white/20 pb-1 mb-1 text-[4px] uppercase font-bold tracking-widest">Expertise</div>
                <div className="flex flex-col gap-[3px] text-[4.5px]">
                    <div>• React</div>
                    <div>• TypeScript</div>
                    <div>• Node.js</div>
                </div>
            </div>
            <div className="w-[65%] p-3 flex flex-col gap-2.5 bg-slate-50">
                <div>
                    <div className="font-bold text-[6px] text-slate-800 uppercase flex items-center gap-1 mb-1.5"><span className="w-1.5 h-1.5 bg-sky-500 rounded-sm"></span> Profile</div>
                    <div className="bg-white p-1.5 rounded shadow-sm text-slate-500 text-[5px] leading-relaxed">Results-driven engineer building scalable apps.</div>
                </div>
                <div>
                    <div className="font-bold text-[6px] text-slate-800 uppercase flex items-center gap-1 mb-1.5"><span className="w-1.5 h-1.5 bg-sky-500 rounded-sm"></span> Experience</div>
                    <div className="bg-white p-1.5 rounded shadow-sm text-[5px] border-l-[1.5px] border-sky-500 relative">
                        <div className="font-bold text-slate-800">Lead Frontend Developer</div>
                        <div className="text-slate-400 text-[4px] font-bold">INNOVATECH</div>
                        <div className="text-slate-500 mt-0.5">Architected scalable web apps.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExecutivePreview() {
    return (
        <div className="w-full h-full bg-white flex flex-col text-[6px] font-serif">
            <div className="w-full bg-slate-800 text-white p-3 text-center">
                <div className="font-bold text-[12px] tracking-wide mb-1">Alexander Wright</div>
                <div className="text-[7px] text-slate-300">Senior Software Engineer</div>
                <div className="text-[4px] text-slate-400 mt-1 flex justify-center gap-2"><span>email@ex.com</span><span>San Francisco</span></div>
            </div>
            <div className="p-3">
                <div className="text-[5.5px] text-slate-600 italic text-center mb-1">"Results-driven engineer building web applications."</div>
                <div className="w-6 h-px bg-slate-800 mx-auto my-1.5"></div>
                
                <div className="text-center font-bold text-[6px] text-slate-800 mb-1.5 font-serif">Professional Experience</div>
                <div className="flex justify-between items-baseline border-b-2 border-slate-100 pb-0.5 mb-1">
                    <div>
                        <span className="font-bold text-slate-800 text-[6px]">Lead Frontend Developer</span>
                        <div className="text-slate-500 font-bold ml-0.5 text-[5px]">Innovatech</div>
                    </div>
                    <span className="text-slate-400 text-[4px] font-sans">2021-Present</span>
                </div>
                <div className="text-[5px] text-slate-500 leading-relaxed font-sans mt-0.5 mb-2">Architected modern web apps and mentored teams.</div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <div className="font-bold text-[6px] text-slate-800 border-b-2 border-slate-100 pb-0.5 mb-1">Education</div>
                        <div className="font-bold text-slate-800 text-[5px]">B.S. CS</div>
                        <div className="text-slate-500 text-[4.5px] font-sans">Univ of Tech</div>
                    </div>
                    <div className="w-1/2">
                        <div className="font-bold text-[6px] text-slate-800 border-b-2 border-slate-100 pb-0.5 mb-1">Expertise</div>
                        <div className="flex flex-wrap gap-0.5 font-sans">
                            {['React', 'Node'].map(s => <span key={s} className="bg-slate-100 px-1 text-[4px] font-bold text-slate-600 rounded">{s}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const tagColors = {
    indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    rose: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    sky: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    slate: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
};

export default function Templates() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">

            {/* Background glow effects */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Nav */}
            <nav className="border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" /> Home
                        </button>
                        <span className="text-slate-700">|</span>
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-lg shadow-indigo-500/30 border border-indigo-400">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">ProResume</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/builder')}
                        className="text-sm font-semibold bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    >
                        Open Builder
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6">
                    <Star className="w-3.5 h-3.5" /> {templates.length} Premium Templates Available
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
                    Pick your perfect <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">resume style.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Choose from professionally designed templates tailored for different industries and regions.
                    Click <strong className="text-slate-200">Use This Template</strong> to jump straight into the builder with your chosen style pre-selected.
                </p>
            </div>

            {/* Template cards */}
            <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {templates.map((t) => (
                        <div
                            key={t.id}
                            onMouseEnter={() => setHovered(t.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="group flex flex-col bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-2xl"
                            style={{ boxShadow: hovered === t.id ? `0 0 40px ${t.accent}22` : undefined }}
                        >
                            {/* Preview window */}
                            <div className="relative bg-slate-800 border-b border-slate-700 overflow-hidden" style={{ height: '280px' }}>
                                {/* Browser chrome bar */}
                                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-700 bg-slate-900">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></div>
                                    <div className="ml-3 flex-1 bg-slate-800 rounded text-xs text-slate-500 px-3 py-1 text-center font-mono">preview.resume/{t.id.toLowerCase()}</div>
                                </div>
                                {/* Scaled resume preview */}
                                <div className="w-full overflow-hidden" style={{ height: '240px' }}>
                                    {t.preview}
                                </div>
                                {/* Gradient overlay at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none" />
                            </div>

                            {/* Card content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${tagColors[t.tagColor]} mb-2`}>
                                            <Zap className="w-3 h-3" /> {t.tag}
                                        </span>
                                        <h2 className="text-xl font-extrabold text-white">{t.name}</h2>
                                    </div>
                                    <span className="text-lg mt-1">{t.region.split(' ')[0]}</span>
                                </div>

                                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5" /> {t.region.substring(3)} · {t.style}
                                </p>

                                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                                    {t.description}
                                </p>

                                {/* Highlights */}
                                <ul className="flex flex-col gap-1.5 mb-6">
                                    {t.highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: t.accent }} />
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={() => navigate(`/builder?template=${t.id}`)}
                                    className="group/btn w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-white transition-all duration-200 shadow-lg"
                                    style={{ background: t.accent, boxShadow: `0 0 20px ${t.accent}44` }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 35px ${t.accent}66`; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 20px ${t.accent}44`; }}
                                >
                                    Use This Template
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
