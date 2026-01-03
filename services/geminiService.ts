
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getCodingAssistance(prompt: string, base64Image?: string): Promise<string> {
    try {
      const parts: any[] = [{ text: prompt }];
      
      if (base64Image) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image.split(',')[1] || base64Image
          }
        });
      }

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ parts }],
        config: {
          systemInstruction: `Siz dunyo darajasidagi senior Android dasturchisisiz. 
          Sizga foydalanuvchi "abdurazoqov_edits" tomonidan yaratilgan ushbu IDE orqali murojaat qilmoqda.
          VAZIFANGIZ: 
          1. Har qanday texnik savolga 100% to'g'ri va eng zamonaviy yechimni bering.
          2. Agar foydalanuvchi rasm (skrinshot) yuborsa, undagi xatolarni toping va tuzatib bering.
          3. Kodlarni har doim triple backticks (\`\`\`) ichida bering.
          4. O'zbek tilida juda professional va yordam berishga tayyor holda javob bering.`,
          temperature: 0.2, // Aniqroq javoblar uchun haroratni pasaytirdik
        },
      });
      return response.text || "Kechirasiz, javob topishda qiynaldim.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Ulanishda xatolik. Iltimos, internetni tekshiring.";
    }
  }

  async optimizeCode(code: string): Promise<string> {
    const prompt = `Ushbu Android kodini tahlil qil va eng mukammal holatga keltir. Faqat kodni qaytar:\n\n${code}`;
    const response = await this.getCodingAssistance(prompt);
    return response.replace(/```[a-z]*\n?/g, '').replace(/```/g, '').trim();
  }

  async suggestProject(idea: string): Promise<{name: string, description: string}> {
    const prompt = `Loyiha g'oyasi: "${idea}". Unga brend nomi va qisqa tavsif ber. JSON: {"name": "...", "description": "..."}`;
    const res = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    try {
        return JSON.parse(res.text || '{"name": "New Project", "description": "A new Android app"}');
    } catch {
        return { name: "Yangi Loyiha", description: idea };
    }
  }
}

export const geminiService = new GeminiService();
