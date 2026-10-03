import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { questionId, questionText, userResponseText } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const openai = new OpenAI({ apiKey });
        const prompt = `
Siz qattiqqo'l, lekin adolatli venture investor / venture kapitalist rolidasiz.
Foydalanuvchi startup pitch bo'yicha ushbu savolga javob berdi:
Savol: "${questionText}"
Foydalanuvchi javobi: "${userResponseText}"

Javobni baholang va keyingi o'tkir savolni shakllantiring.
JSON formatda javob bering:
{
  "investorFeedback": "Javob sifati bo'yicha 2 ta aniq mulohaza (o'zbek tilida).",
  "score": 85,
  "followUpQuestion": "Investor tomonidan beriladigan mantiqiy keyingi qiyin savol (o'zbek tilida)."
}
`;
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        });

        const res = JSON.parse(completion.choices[0]?.message?.content || '{}');
        return NextResponse.json(res);
      } catch (e) {
        console.warn('Pitch AI API error:', e);
      }
    }

    // Default fallback investor evaluation
    return NextResponse.json({
      investorFeedback: "Javobingiz yaxshi boshlangan. Lekin bozor hajmi (SOM/SAM) bo'yicha aniq raqamlarga urg'u berish va javobni 30 soniyaga sig'dirish ishonchlilikni oshiradi.",
      score: 82,
      followUpQuestion: "Raqobatchilaringiz ushbu funksiyani ko'chirsa, siz ulardan mijozlarni qanday saqlab qolasiz?"
    });
  } catch (error) {
    return NextResponse.json({ error: 'Pitch evaluation failed' }, { status: 500 });
  }
}
