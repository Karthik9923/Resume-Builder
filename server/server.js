import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/generate-summary', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(401).json({ error: 'API Key not configured. Please add your GEMINI_API_KEY to the server/.env file.' });
        }
        
        const { jobTitle, experience, skills } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `Act as an expert career coach and resume writer. 
Write a professional, impactful 3-sentence summary for a ${jobTitle || 'Professional'}.
Their core skills include: ${skills?.join(', ') || 'Various technical and soft skills'}.
Relevant experience context: ${experience?.map(e => e.company + ': ' + (e.description || '')).join(' | ') || 'Not specified'}.

Guidelines:
- Must be exactly 3 sentences.
- Tone must be highly professional, confident, and achievement-oriented.
- Do not use first-person pronouns (I, me, my).
- Start directly with the summary, no conversational filler or intro text.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ summary: text.trim() });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: 'Failed to generate summary due to an AI service error.' });
    }
});

app.post('/api/polish-bullet', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(401).json({ error: 'API Key not configured.' });
        }
        
        const { text } = req.body;
        
        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'No text provided.' });
        }
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `Act as an expert resume writer. Take the following raw job description or bullet point and rewrite it to be more impactful and achievement-oriented.

Original text: "${text}"

Guidelines:
- Start with a strong action verb (e.g., Spearheaded, Architected, Optimized).
- Focus on results and value delivered.
- Keep it concise, typically one strong sentence.
- Return ONLY the rewritten text, with no conversational filler or markdown wrapping.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let polishedText = response.text().trim();
        
        // Remove markdown list indicators if the AI added them
        polishedText = polishedText.replace(/^-\s*/, '').replace(/^\*\s*/, '');
        
        res.json({ polishedText });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to polish text. Please try again.' });
    }
});

// Endpoint: Evaluate ATS Score
app.post('/api/ats-score', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(401).json({ error: 'API Key not configured. Please add your GEMINI_API_KEY to the server/.env file.' });
        }
        
        const { resumeData, jobDescription } = req.body;
        if (!resumeData) {
            return res.status(400).json({ error: 'No resume data provided.' });
        }
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `Act as an expert Applicant Tracking System (ATS) algorithm and senior recruiter. 
I am providing you with a candidate's parsed resume data and an optional target Job Description.

Resume Data:
${JSON.stringify(resumeData)}

${jobDescription ? "Target Job Description:\n" + jobDescription + "\n" : "No specific job description provided. Evaluate based on general best practices for the candidate's target role."}

Your task is to analyze the resume against the job description (or general industry standards if no JD is provided) and return a strict JSON response with the following structure:
{
  "score": 0,
  "matchingKeywords": ["string"],
  "missingKeywords": ["string"],
  "improvements": ["string"]
}

DO NOT wrap the response in markdown code blocks. Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();
        
        // Clean markdown backticks if Gemini includes them
        if (text.startsWith('```json')) text = text.substring(7);
        if (text.startsWith('```')) text = text.substring(3);
        if (text.endsWith('```')) text = text.substring(0, text.length - 3);
        text = text.trim();
        
        const jsonResponse = JSON.parse(text);
        res.json(jsonResponse);
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to analyze ATS score. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`AI Server running on http://localhost:${PORT}`);
});
