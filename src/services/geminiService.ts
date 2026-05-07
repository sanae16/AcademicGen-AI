import { GoogleGenAI } from "@google/genai";
import { GenerationParams } from "../types";
import { 
  MASTER_PROMPT_TEMPLATE, 
  LESSON_PLAN_PROMPT, 
  STUDY_GUIDE_PROMPT, 
  PRACTICE_TOOLS_PROMPT, 
  COURSE_OUTLINE_PROMPT 
} from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAcademicContent(params: GenerationParams): Promise<string> {
  let specificPrompt = "";
  switch (params.contentType) {
    case 'Lesson Plan':
      specificPrompt = LESSON_PLAN_PROMPT;
      break;
    case 'Study Guide':
      specificPrompt = STUDY_GUIDE_PROMPT;
      break;
    case 'Practice Tools':
      specificPrompt = PRACTICE_TOOLS_PROMPT;
      break;
    case 'Course Outline':
      specificPrompt = COURSE_OUTLINE_PROMPT;
      break;
  }

  // Basic string replacement for template variables
  let finalPrompt = MASTER_PROMPT_TEMPLATE
    .replace(/{{academicLevel}}/g, params.academicLevel)
    .replace(/{{topic}}/g, params.topic || "Higher Education Subject")
    .replace(/{{contentType}}/g, params.contentType)
    .replace(/{{toneStyle}}/g, params.toneStyle)
    .replace(/{{outputLength}}/g, params.outputLength)
    .replace(/{{specificPrompt}}/g, specificPrompt);

  // Replace sub-prompt specific variables
  if (params.difficultyLevel) {
    finalPrompt = finalPrompt.replace(/{{difficultyLevel}}/g, params.difficultyLevel);
  }
  if (params.questionType) {
    finalPrompt = finalPrompt.replace(/{{questionType}}/g, params.questionType);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: finalPrompt,
    });
    
    let text = response.text || "No content generated.";
    
    // If it's practice tools, we might need to clean up the JSON from markdown blocks
    if (params.contentType === 'Practice Tools') {
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      
      try {
        // Try to identify the start and end of the JSON object in case there's lead/trail text
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
          text = text.slice(firstBrace, lastBrace + 1);
        }
      } catch (err) {
        // Fallback to exactly what the AI returned if slicing fails
        console.warn("Regex JSON slice failed:", err);
      }
    }
    
    return text;
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    if (error.message?.includes('404') || error.status === 404) {
      throw new Error("Model not found. Please try again in a few moments or check if the Gemini API is available in your region.");
    }
    throw new Error("Failed to generate educational content. Please ensure your GEMINI_API_KEY is configured in the secrets panel.");
  }
}
