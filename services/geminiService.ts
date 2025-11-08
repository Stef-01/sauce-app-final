import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function is kept for potential other uses but is not the primary for the modal.
export async function refineProjectBrief(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Refine the following project idea into a structured project brief. The brief should include:
1.  **Project Title**: A catchy and descriptive title.
2.  **Summary**: A one-paragraph overview of the project.
3.  **Key Features**: A bulleted list of 3-5 core features.
4.  **Target Audience**: A description of the ideal user.
5.  **Tech Stack**: Suggestions for technologies to use.

Here is the project idea:
---
${prompt}
---`,
        });
        return response.text;
    } catch (error) {
        console.error("Error refining project brief:", error);
        return "Sorry, I couldn't refine the project brief at the moment. Please try again later.";
    }
}

// NEW function for AI modal refinement
export async function refineTechnicalRequirements(
    projectTitle: string,
    projectDescription: string
): Promise<{
    technicalRequirements: string;
    skillsRequired: string[];
    estimatedDuration: string;
    projectScope: string;
}> {
    try {
        // FIX: Use responseSchema for robust JSON output
        const response = await ai.models.generateContent({
            // FIX: Use a faster model for this structured generation task.
            model: "gemini-2.5-flash",
            contents: `You are a technical project advisor for a university hub. Based on the following project information, provide structured technical requirements.

Project Title: ${projectTitle}
Description: ${projectDescription}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        technicalRequirements: {
                            type: Type.STRING,
                            description: "A detailed 2-3 sentence paragraph of technical specifications and implementation approach.",
                        },
                        skillsRequired: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                            description: "A list of 5 key technical skills required.",
                        },
                        estimatedDuration: {
                            type: Type.STRING,
                            description: "An estimated time to complete, e.g., 'X-Y months'.",
                        },
                        projectScope: {
                            type: Type.STRING,
                            description: "A clear 2-3 sentence scope statement defining what's in and out of scope.",
                        },
                    },
                    required: ["technicalRequirements", "skillsRequired", "estimatedDuration", "projectScope"],
                }
            }
        });
        
        // FIX: Directly parse the JSON from response.text without manual string manipulation.
        // Added cleanup for potential markdown code fences.
        let jsonString = response.text.trim();
        if (jsonString.startsWith("```json")) {
            jsonString = jsonString.slice(7, -3).trim();
        }
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch (error) {
        console.error("Error refining technical requirements:", error);
        throw new Error("Failed to refine requirements. Please try again.");
    }
}