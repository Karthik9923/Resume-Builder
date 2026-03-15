import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Download, ArrowRight, Check } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
            title: "Premium Designs",
            description: "Choose from visually stunning templates that present your professional journey beautifully."
        },
        {
            icon: <FileText className="w-6 h-6 text-indigo-400" />,
            title: "Effortless Builder",
            description: "Our intuitive sidebar makes editing simple, with distinct sections and rich layout tools."
        },
        {
            icon: <Download className="w-6 h-6 text-indigo-400" />,
            title: "Instant Export",
            description: "Download your beautifully formatted resume as a high-fidelity PDF instantly."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Header / Nav */}
            <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-lg shadow-indigo-500/30 border border-indigo-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">ProResume</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/builder')}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => navigate('/builder')}
                            className="text-sm font-semibold bg-indigo-500 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-600 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="container mx-auto px-6 pt-24 pb-20 flex-1 flex flex-col justify-center relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-sm shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        Resume Builder 2.0 is live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
                        Craft your career with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">absolute precision.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stand out from the crowd with our premium dark-themed builder. Create stunning, professional resumes with beautifully defined boundaries and vibrant designs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/builder')}
                            className="group flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-all w-full sm:w-auto shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-indigo-400"
                        >
                            Build My Resume
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/builder')}
                            className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 px-8 py-3.5 rounded-lg text-lg font-semibold transition-all w-full sm:w-auto shadow-lg"
                        >
                            Explore Templates
                        </button>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Free to use</div>
                        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> High-quality PDF export</div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="mt-28 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-start text-left bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                                <div className="p-3 border border-indigo-500/20 rounded-xl mb-6 bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
