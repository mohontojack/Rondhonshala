import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "NOT_SET");

const app = express();

export { app };

async function startServer() {
  const PORT = 3000;
  
  app.use(express.json());

  // API Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Meal Planner Endpoint
  app.post("/api/ai/planner", async (req, res) => {
    const { eventType, guests, budget, preferences } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "" || apiKey === "NOT_SET") {
      console.error("Missing or invalid GEMINI_API_KEY");
      return res.status(500).json({ 
        error: "Gemini API key is not configured.",
        details: "অ্যাডমিন এখনও AI কী কনফিগার করেননি। দয়া করে সেটিংস থেকে আপনার API কী যোগ করুন।" 
      });
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      const prompt = `You are a professional chef for "Rondhonshala", a premium home catering service in Dinajpur, Bangladesh.
        Create an authentic and enticing Bengali catering menu package for a ${eventType || "অনুষ্ঠান"}. 
        
        Constraints:
        - Guests: ${guests || 100} people
        - Budget: ${budget || 400} BDT per person
        - Preferences: ${preferences || "Traditional Bengali homemade style"}
        
        Important: Use local Dinajpur and Bengali delicacies where possible (e.g., Kalijira rice, local fish).
        
        Format as JSON ONLY with: 
        packageName: string (Enchanting title in Bengali/English), 
        description: string (Appetizing summary), 
        items: string[] (List of dishes in Bengali), 
        estimatedPricePerPerson: number (Must match the budget).`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const safeText = String(responseText || "").trim();
      
      if (!safeText || safeText === "undefined" || safeText === "null" || safeText === "[object Object]") {
        throw new Error("AI মডেল থেকে সঠিক তথ্য পাওয়া যায়নি।");
      }
      
      try {
        const startIndex = safeText.indexOf('{');
        const endIndex = safeText.lastIndexOf('}');
        
        let jsonToParse = safeText;
        if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
          jsonToParse = safeText.substring(startIndex, endIndex + 1);
        }

        const finalJson = (jsonToParse || "").trim();
        if (!finalJson || finalJson === "undefined" || finalJson === "null") {
          throw new Error("সঠিক তথ্য পাওয়া যায়নি।");
        }

        const parsedData = JSON.parse(finalJson);
        res.json(parsedData);
      } catch (parseError) {
        console.error("JSON Parse Error. Text was:", safeText);
        throw new Error("AI-এর পাঠানো তথ্য সঠিক ফরম্যাটে নেই।");
      }
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

  // Only listen if not running in a serverless environment (like Vercel)
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();
