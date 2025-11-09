// The @google/genai SDK is intended for server environments and may not work in the browser.
// To prevent bundlers (Vite) from trying to include a Node-only SDK in the client bundle,
// we avoid importing it at module load time. Instead, we provide browser-safe stubs and
// dynamically import the SDK only when running on the server and the functions are invoked.

const isBrowser = typeof window !== 'undefined';

// Browser-safe stub implementations
async function browserStubRefineProjectBrief(prompt: string): Promise<string> {
    console.warn('refineProjectBrief called in browser — AI functionality is disabled in client builds.');
    return "AI unavailable in the browser. Please run this action from the server or configure a backend API.";
}

async function browserStubRefineTechnicalRequirements(
    _projectTitle: string,
    _projectDescription: string
): Promise<{
    technicalRequirements: string;
    skillsRequired: string[];
    estimatedDuration: string;
    projectScope: string;
}> {
    console.warn('refineTechnicalRequirements called in browser — AI functionality is disabled in client builds.');
    return {
        technicalRequirements: 'AI unavailable in the browser.',
        skillsRequired: [],
        estimatedDuration: 'N/A',
        projectScope: 'N/A',
    };
}

// Server implementations that dynamically import the SDK when invoked.
async function serverRefineProjectBrief(prompt: string): Promise<string> {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Refine the following project idea into a structured project brief. The brief should include:\n1.  **Project Title**: A catchy and descriptive title.\n2.  **Summary**: A one-paragraph overview of the project.\n3.  **Key Features**: A bulleted list of 3-5 core features.\n4.  **Target Audience**: A description of the ideal user.\n5.  **Tech Stack**: Suggestions for technologies to use.\n\nHere is the project idea:\n---\n${prompt}\n---`,
        });
        return response.text;
    } catch (error) {
        console.error('Error refining project brief:', error);
        return "Sorry, I couldn't refine the project brief at the moment. Please try again later.";
    }
}

async function serverRefineTechnicalRequirements(
    projectTitle: string,
    projectDescription: string
): Promise<{
    technicalRequirements: string;
    skillsRequired: string[];
    estimatedDuration: string;
    projectScope: string;
}> {
    const { GoogleGenAI, Type } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a technical project advisor for a university hub. Based on the following project information, provide structured technical requirements.\n\nProject Title: ${projectTitle}\nDescription: ${projectDescription}`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        technicalRequirements: { type: Type.STRING },
                        skillsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
                        estimatedDuration: { type: Type.STRING },
                        projectScope: { type: Type.STRING },
                    },
                    required: ['technicalRequirements', 'skillsRequired', 'estimatedDuration', 'projectScope'],
                },
            },
        });

        let jsonString = response.text.trim();
        if (jsonString.startsWith('```json')) {
            jsonString = jsonString.slice(7, -3).trim();
        }
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch (error) {
        console.error('Error refining technical requirements:', error);
        throw new Error('Failed to refine requirements. Please try again.');
    }
}

export const refineProjectBrief = isBrowser ? browserStubRefineProjectBrief : serverRefineProjectBrief;
export const refineTechnicalRequirements = isBrowser
    ? browserStubRefineTechnicalRequirements
    : serverRefineTechnicalRequirements;