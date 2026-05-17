import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "NOT_SET",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build-rondhonshala',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Meal Planner Endpoint
  app.post("/api/ai/planner", async (req, res) => {
    const { eventType, guests, budget, preferences } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      console.error("Missing GEMINI_API_KEY");
      return res.status(500).json({ 
        error: "Gemini API key is not configured.",
        details: "অ্যাডমিন এখনও AI কী কনফিগার করেননি। দয়া করে অপেক্ষা করুন।" 
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: `You are a professional chef for "Rondhonshala", a premium home catering service in Dinajpur, Bangladesh.
        Create an authentic and enticing Bengali catering menu package for a ${eventType}.
        
        Constraints:
        - Guests: ${guests} people
        - Budget: ${budget} BDT per person
        - Preferences: ${preferences || "Traditional Bengali homemade style"}
        
        Important: Use local Dinajpur and Bengali delicacies where possible (e.g., Kalijira rice, local fish).
        
        Format as JSON with: 
        packageName: string (Enchanting title in Bengali/English), 
        description: string (Appetizing summary), 
        items: string[] (List of dishes in Bengali), 
        estimatedPricePerPerson: number (Must match the budget).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              packageName: { type: Type.STRING },
              description: { type: Type.STRING },
              items: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedPricePerPerson: { type: Type.NUMBER }
            },
            required: ["packageName", "description", "items", "estimatedPricePerPerson"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI model");
      }
      
      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("AI Error:", error);
      res.status(500).json({ 
        error: "Failed to generate AI suggestions",
        details: error?.message || "Unknown error"
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
