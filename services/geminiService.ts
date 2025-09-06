import { GoogleGenAI, Type } from "@google/genai";
import type { PracticeQuestion, AdvancedSectionContent, LearningContent, ExamQuestion } from '../types';

const practiceQuestionsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING, description: "The text of the multiple-choice question." },
            options: {
                type: Type.OBJECT,
                properties: {
                    A: { type: Type.STRING },
                    B: { type: Type.STRING },
                    C: { type: Type.STRING },
                    D: { type: Type.STRING },
                },
                required: ['A', 'B', 'C', 'D'],
                description: "The four possible answers for the question."
            },
            correctAnswer: { type: Type.STRING, description: "The correct option, one of 'A', 'B', 'C', or 'D'." },
            explanation: { type: Type.STRING, description: "A detailed explanation for the correct answer and why other options are incorrect." },
        },
        required: ['question', 'options', 'correctAnswer', 'explanation'],
    },
    description: "An array of practice questions."
};

const examQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING, description: "一個素養題情境的選擇題題幹。" },
        options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "四個有干擾性的選項。"
        },
        correctAnswer: { type: Type.STRING, description: "四個選項中的正確答案文字。" }
    },
    required: ['question', 'options', 'correctAnswer']
};

const advancedSectionContentSchema = {
    type: Type.OBJECT,
    properties: {
        advancedPrinciples: { type: Type.STRING, description: "關於「進階原理與最新發展」的內容，包含技術演進和考點補充，約3-6句話。" },
        highLevelApplications: { type: Type.STRING, description: "關於「高階應用案例」的內容，包含至少2個跨領域案例及其影響與挑戰，約3-6句話。" },
        risksAndGovernance: { type: Type.STRING, description: "關於「風險、限制與治理」的內容，包含技術限制、倫理爭議與國際規範，約3-6句話。" },
        extendedThinking: { type: Type.STRING, description: "關於「延伸思考」的內容，設計1-2個跨情境的素養題取向問題，約3-6句話。" },
        examSimulation: {
            type: Type.ARRAY,
            items: examQuestionSchema,
            description: "包含2題考試模擬選擇題的陣列。"
        }
    },
    required: ['advancedPrinciples', 'highLevelApplications', 'risksAndGovernance', 'extendedThinking', 'examSimulation'],
};


// Follow guideline: Always use `new GoogleGenAI({apiKey: process.env.API_KEY});`
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

export const generateAdvancedContentForSection = async (topicName: string, sectionContext: string): Promise<AdvancedSectionContent> => {
    const prompt = `您是一位專業的AI考綱輔導教師。請針對主題「${sectionContext}」，生成一份結構化的進階學習內容與考點分析。
學習者已經了解此主題的基礎定義，請您專注於補充「進階知識」和「iPAS素養題考點」。

請遵循以下結構與要求：

1.  **進階原理與最新發展**:
    *   簡述該技術的演進脈絡 (例如，從傳統方法到深度學習的變革)。
    *   補充與此技術相關的進階概念，如少樣本學習 (Few-shot)、零樣本學習 (Zero-shot)、跨模態或多模態應用等考試熱點。

2.  **高階應用案例**:
    *   提供至少 2 個不同領域（如醫療、製造、金融、公共治理）的深度應用案例。
    *   以素養題的視角，分析案例中的「實際影響」與「導入挑戰」。

3.  **風險、限制與治理**:
    *   分析此技術的關鍵「技術限制」（如效能瓶頸、資料依賴、泛化能力）。
    *   探討相關的「治理與倫理爭議」（如偏見、隱私、安全、可解釋性），並連結到國際規範（如 GDPR、歐盟 AI Act）。

4.  **延伸思考（素養題取向）**:
    *   設計 1-2 個引導性的「跨情境思考題」，考驗學習者的應用與權衡能力。

5.  **考試模擬題**:
    *   設計 2 題情境式的模擬單選題，選項需具備干擾性。

**格式要求**:
*   每個段落長度約3至6句話。
*   內容需條理分明，善用條列式說明。
*   語氣需兼具專業教學與考試輔導的風格。
*   請以繁體中文，並嚴格遵循指定的JSON格式輸出。`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: advancedSectionContentSchema,
                temperature: 0.5,
            },
        });
        
        const jsonString = response.text;
        const parsedContent = JSON.parse(jsonString);
        return parsedContent as AdvancedSectionContent;

    } catch (error) {
        console.error(`Error generating advanced content for section "${sectionContext}":`, error);
        throw new Error(`無法為「${sectionContext}」生成進階內容，請稍後再試。`);
    }
};


export const generatePracticeQuestions = async (topicName: string, count: number = 5): Promise<PracticeQuestion[]> => {
    const prompt = `為 iPAS 人工智慧專業人員中級考試產生 ${count} 個關於主題 "${topicName}" 的選擇題。
每個問題都應該有四個選項（A、B、C、D），一個正確答案和一個詳細的解釋。
解釋應該清楚地說明為什麼正確答案是正確的，以及為什麼其他選項是錯誤的。
請使用繁體中文輸出。`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: practiceQuestionsSchema,
                temperature: 0.7,
            },
        });

        // Follow guideline: The simplest and most direct way to get the generated text content is by accessing the .text property
        const jsonString = response.text;
        const parsedQuestions = JSON.parse(jsonString);
        return parsedQuestions as PracticeQuestion[];
    } catch (error) {
        console.error("Error generating practice questions:", error);
        throw new Error("無法生成練習題，請稍後再試。");
    }
};