import React, { useRef, useState } from 'react';
import { Bold, Italic, List } from 'lucide-react';

export default function MarkdownEditor({ value, onChange, placeholder, minHeight = '100px' }) {
    const textareaRef = useRef(null);
    const [isPolishing, setIsPolishing] = useState(false);

    const handlePolish = async () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);

        if (!selected) {
            alert('Please highlight the text you want the AI to polish first!');
            return;
        }

        setIsPolishing(true);
        try {
            const response = await fetch('http://localhost:3001/api/polish-bullet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: selected })
            });
            const data = await response.json();
            
            if (response.ok && data.polished) {
                const before = text.substring(0, start);
                const after = text.substring(end);
                onChange(before + data.polished + after);
            } else {
                alert(data.error || 'Failed to polish text');
            }
        } catch (error) {
            alert('Failed to connect to AI server. Is it running?');
        } finally {
            setIsPolishing(false);
        }
    };

    const insertFormat = (prefix, suffix = prefix) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);

        let newText;
        if (selected) {
            newText = `${before}${prefix}${selected}${suffix}${after}`;
        } else {
            newText = `${before}${prefix}text${suffix}${after}`;
        }

        onChange(newText);
        
        // Refocus and set selection after React re-renders
        setTimeout(() => {
            textarea.focus();
            if (selected) {
                textarea.setSelectionRange(start, start + prefix.length + selected.length + suffix.length);
            } else {
                textarea.setSelectionRange(start + prefix.length, start + prefix.length + 4);
            }
        }, 0);
    };

    const handleList = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);

        // If something is selected, prefix each line with "- "
        if (selected) {
            const lines = selected.split('\n');
            const newSelected = lines.map(line => `- ${line}`).join('\n');
            onChange(`${before}${newSelected}${after}`);
        } else {
            // Find start of current line
            const lastNewline = before.lastIndexOf('\n');
            const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
            const beforeLine = text.substring(0, lineStart);
            const lineContent = text.substring(lineStart, end);
            
            onChange(`${beforeLine}- ${lineContent}${after}`);
        }
    };

    return (
        <div className="flex flex-col border border-slate-700 rounded-lg overflow-hidden bg-slate-950 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all shadow-inner">
            <div className="flex items-center gap-1 border-b border-slate-800 bg-slate-900/50 p-1.5">
                <button
                    type="button"
                    onClick={() => insertFormat('**')}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Bold"
                >
                    <Bold size={14} />
                </button>
                <button
                    type="button"
                    onClick={() => insertFormat('*')}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Italic"
                >
                    <Italic size={14} />
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1"></div>
                <button
                    type="button"
                    onClick={handleList}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                    title="Bullet List"
                >
                    <List size={14} />
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1"></div>
                <button
                    type="button"
                    onClick={handlePolish}
                    disabled={isPolishing}
                    className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 hover:opacity-80 disabled:opacity-50 transition px-2 py-1 rounded hover:bg-slate-800 uppercase tracking-widest border border-amber-500/20"
                    title="Polish selected text with AI"
                >
                    {isPolishing ? '✨ Polishing...' : '✨ Polish Text'}
                </button>
                <span className="ml-auto text-xs text-slate-600 px-2 flex-1 text-right">Markdown supported</span>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ minHeight }}
                className="w-full bg-transparent border-none py-2.5 px-3 text-slate-200 font-sans text-sm outline-none placeholder:text-slate-500 resize-y leading-relaxed"
            />
        </div>
    );
}
