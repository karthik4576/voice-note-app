'use client';

import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function Home() {
  const [notes, setNotes] = useState<string[]>([]);

  const addAudioElement = async (blob: Blob) => {
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: blob
    });
    const text = await response.text();
    setNotes(prevNotes => [...prevNotes, text]);
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Voice Note Taker</h1>
      <AudioRecorder 
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Notes:</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="mb-2">{note}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}