import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function refineProjectBrief(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro", // Using gemini-2.5-pro for complex text task
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
