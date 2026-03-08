import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
            title: "Beautiful Templates",
            description: "Choose from professionally designed templates that stand out to recruiters."
        },
        {
            icon: <FileText className="w-6 h-6 text-indigo-500" />,
            title: "Easy to Use",
            description: "Our intuitive builder makes creating your resume a breeze. Just fill in the blanks."
        },
        {
            icon: <Download className="w-6 h-6 text-indigo-500" />,
            title: "Export to PDF",
            description: "Download your pixel-perfect resume as a PDF with a single click."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-blue-200/40 to-indigo-200/40 blur-3xl" />
            </div>

            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                        <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">ProResume</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/builder')}
                        className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2 transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/builder')}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg ml-2"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="container mx-auto px-6 pt-20 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                        Resume Builder 2.0 is here
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                        Build a professional resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">in minutes.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create a standout resume with our easy-to-use builder. Choose from modern, customizable templates and land your dream job faster.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/builder')}
                            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 w-full sm:w-auto js-create-resume-btn"
                        >
                            Create My Resume
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/builder')}
                            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-sm w-full sm:w-auto"
                        >
                            View Templates
                        </button>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</div>
                        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free PDF export</div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="mt-32 pt-16 border-t border-slate-200/60">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform duration-300">
                                <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
