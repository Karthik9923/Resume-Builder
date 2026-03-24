import React, { useState } from 'react';
import { Target, Search, CheckCircle2, AlertCircle, ArrowRight, Loader2, Gauge } from 'lucide-react';

export default function ATSAnalyzer({ resumeData }) {
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:3001/api/ats-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData, jobDescription })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze resume.');
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Helper to determine score color
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-500';
        if (score >= 60) return 'text-amber-500';
        return 'text-rose-500';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-emerald-50';
        if (score >= 60) return 'bg-amber-50';
        return 'bg-rose-50';
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <Target size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800 text-lg">ATS Optimizer</h2>
                    <p className="text-sm text-slate-500">See how your resume scores against Applicant Tracking Systems</p>
                </div>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
                {!result ? (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Job Description (Optional)</label>
                            <p className="text-xs text-slate-500 mb-3">Paste a job posting here to specifically tailor your score against it. Leave blank for a general industry analysis.</p>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={6}
                                className="w-full border border-slate-300 bg-white text-slate-900 placeholder-slate-400 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none shadow-inner"
                                placeholder="Paste the responsibilities and requirements here..."
                            ></textarea>
                        </div>

                        {error && (
                            <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-rose-100">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="bg-slate-900 text-white font-bold py-3.5 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-70 shadow-lg shadow-slate-900/20"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Analyzing Resume...
                                </>
                            ) : (
                                <>
                                    <Search size={18} /> Run ATS Scan
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
                        {/* Score Header */}
                        <div className={`flex items-center gap-6 p-6 rounded-2xl border ${getScoreBg(result.score)}`}>
                            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                                {/* SVG Circle Progress */}
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-200" strokeWidth="3" />
                                    <circle 
                                        cx="18" cy="18" r="16" fill="none" 
                                        className={`stroke-current ${getScoreColor(result.score)} transition-all duration-1000 ease-out`} 
                                        strokeWidth="3" 
                                        strokeDasharray={`${result.score}, 100`} 
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-3xl font-black ${getScoreColor(result.score)}`}>{result.score}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                                    <Gauge className={getScoreColor(result.score)} size={20} />
                                    {result.score >= 80 ? 'Excellent Match' : result.score >= 60 ? 'Good Potential' : 'Needs Work'}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {result.score >= 80 
                                        ? "Your resume is highly optimized! You have a great chance of passing automated HR filters."
                                        : result.score >= 60 
                                        ? "You're on the right track, but adding specific missing keywords will greatly boost your visibility."
                                        : "Your resume may be rejected by ATS filters before reaching a human. Please review the missing keywords below."}
                                </p>
                            </div>
                        </div>

                        {/* Analysis Grids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Matching Keywords */}
                            <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4">
                                <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={16} className="text-emerald-500" /> Matched Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.matchingKeywords?.map((kw, i) => (
                                        <span key={i} className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded border border-emerald-200 text-xs font-semibold">{kw}</span>
                                    ))}
                                    {(!result.matchingKeywords || result.matchingKeywords.length === 0) && (
                                        <span className="text-emerald-600/70 text-sm">No significant matches found.</span>
                                    )}
                                </div>
                            </div>

                            {/* Missing Keywords */}
                            <div className="border border-rose-100 bg-rose-50/30 rounded-xl p-4">
                                <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2 text-sm">
                                    <AlertCircle size={16} className="text-rose-500" /> Missing Hard Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords?.map((kw, i) => (
                                        <span key={i} className="bg-white text-rose-600 px-2.5 py-1 rounded border border-rose-200 text-xs font-semibold">{kw}</span>
                                    ))}
                                    {(!result.missingKeywords || result.missingKeywords.length === 0) && (
                                        <span className="text-rose-600/70 text-sm">No major missing keywords!</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Improvements */}
                        <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white">
                            <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-widest border-b border-slate-100 pb-2">Top Recommendations</h4>
                            <ul className="flex flex-col gap-3">
                                {result.improvements?.map((imp, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                                        <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{imp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button
                            onClick={() => setResult(null)}
                            className="text-slate-500 font-semibold text-sm hover:text-slate-800 transition-colors py-2"
                        >
                            ← Run another scan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
