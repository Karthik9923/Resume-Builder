import dotenv from 'dotenv';

dotenv.config();

async function checkModels() {
  try {
    const key = process.env.GEMINI_API_KEY;
    console.log("Using API Key starting with:", key ? key.substring(0, 5) + "..." : "NONE");
    
    if (!key) {
      console.log("No API Key found. Make sure .env is populated.");
      return;
    }

    console.log("Fetching available models from Google AI Studio...");
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    
    if (data.error) {
       console.error("API Error Response:", JSON.stringify(data.error, null, 2));
    } else {
       console.log("Successfully fetched models!");
       const generateModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
       console.log("Models supporting generateContent:");
       generateModels.forEach(m => console.log(` - ${m.name.replace('models/', '')}`));
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

checkModels();
