/**
 * Web Speech API and Web Audio API Utilities for NUTQ AI
 */

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export class UzbekSpeechRecognizer {
  private recognition: any = null;
  private isListening = false;
  private transcript = '';

  constructor(
    onResult?: (text: string, isFinal: boolean) => void,
    onError?: (err: any) => void
  ) {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'uz-UZ'; // Uzbek language code

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          let currentInterim = '';
          let finalResult = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const item = event.results[i];
            if (item.isFinal) {
              finalResult += item[0].transcript + ' ';
            } else {
              currentInterim += item[0].transcript;
            }
          }

          if (finalResult) {
            this.transcript += finalResult;
          }

          if (onResult) {
            onResult((this.transcript + ' ' + currentInterim).trim(), !!finalResult);
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('Web Speech API Error:', event.error);
          if (onError) onError(event);
        };
      }
    }
  }

  public start() {
    if (this.recognition && !this.isListening) {
      this.transcript = '';
      try {
        this.recognition.start();
        this.isListening = true;
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
      }
    }
  }

  public stop(): string {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
    return this.transcript;
  }

  public getTranscript() {
    return this.transcript;
  }
}

/**
 * Setup Web Audio API analyzer node for drawing real-time microphone waveform
 */
export function setupAudioAnalyser(stream: MediaStream): {
  analyser: AnalyserNode;
  audioContext: AudioContext;
  getFrequencyData: (dataArray: Uint8Array) => void;
} {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const audioContext = new AudioContextClass();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 64;
  analyser.smoothingTimeConstant = 0.8;
  source.connect(analyser);

  const getFrequencyData = (dataArray: Uint8Array) => {
    analyser.getByteFrequencyData(dataArray as any);
  };

  return { analyser, audioContext, getFrequencyData };
}
