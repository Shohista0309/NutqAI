import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Audio fayl yuborilmadi' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const openai = new OpenAI({ apiKey });
        const transcription = await openai.audio.transcriptions.create({
          file: file,
          model: 'whisper-1',
          language: 'uz',
        });
        return NextResponse.json({ transcript: transcription.text });
      } catch (err: any) {
        console.warn('Whisper API failed, falling back:', err.message);
      }
    }

    // Fallback response if audio transcription via API is not available
    return NextResponse.json({
      transcript: "Assalomu alaykum. Demak, bugun biz NUTQ AI platformasini sinovdan o'tkazmoqdamiz. Haligi, nutqimiz ravon va ishonchli chiqishini ta'minlashimiz kerak.",
      isFallback: true
    });
  } catch (error: any) {
    console.error('Transcribe API error:', error);
    return NextResponse.json(
      { error: 'Audio faylni transkripsiya qilishda xatolik' },
      { status: 500 }
    );
  }
}
