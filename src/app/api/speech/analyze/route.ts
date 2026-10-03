import { NextResponse } from 'next/server';
import { analyzeUzbekSpeech } from '@/lib/ai/uzbekNlp';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transcript, durationSeconds = 30, mode = 'free-speak', topic = 'Nutq Mashg\'uloti' } = body;

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Transcript matni kiritilmagan' },
        { status: 400 }
      );
    }

    // Default Uzbek Speech NLP Engine
    const localResult = analyzeUzbekSpeech(transcript, durationSeconds, mode, topic);

    // If OPENAI_API_KEY is configured in server env, enhance with GPT-4o-mini insights
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const openai = new OpenAI({ apiKey });
        const prompt = `
Siz professional O'zbek tili nutq va diksiya murabbiyisiz (NUTQ AI).
Quyidagi foydalanuvchi nutqini tahlil qiling va qisqa, aniq o'zbek tilida tavsiya bering.

Nutq matni: "${transcript}"
Nutq davomiyligi: ${durationSeconds} soniya
Mavzu/Rejim: ${topic} (${mode})

Javobingizni faqat ushbu JSON formatda qaytaring:
{
  "enhancedFeedback": [
    {
      "timestampRange": "0:15-0:30",
      "type": "filler",
      "issue": "Muammo tavsifi",
      "cause": "Sababi",
      "example": "Matndan iqtibos",
      "fix": "Qanday tuzatish kerak",
      "nextExercise": "Tavsiya etiladigan mashq"
    }
  ],
  "structuralEvaluation": "Nutq strukturasi haqida 2 ta jumla",
  "keyRecommendations": ["Tavsiya 1", "Tavsiya 2", "Tavsiya 3"]
}
`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.4,
        });

        const aiResponseText = completion.choices[0]?.message?.content;
        if (aiResponseText) {
          const parsed = JSON.parse(aiResponseText);
          if (parsed.enhancedFeedback && Array.isArray(parsed.enhancedFeedback)) {
            localResult.feedbackList = [...parsed.enhancedFeedback, ...localResult.feedbackList];
          }
          if (parsed.keyRecommendations) {
            localResult.keyRecommendations = parsed.keyRecommendations;
          }
          if (parsed.structuralEvaluation) {
            localResult.logicSummary.structuralEvaluation = parsed.structuralEvaluation;
          }
        }
      } catch (aiErr) {
        console.warn('OpenAI API call failed, falling back to Uzbek NLP engine:', aiErr);
      }
    }

    return NextResponse.json(localResult);
  } catch (error: any) {
    console.error('Speech analysis error:', error);
    return NextResponse.json(
      { error: 'Nutqni tahlil qilishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
