import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const textFile = args[0] ?? "production/episodes/01-us-vs-china/vo_v3.txt";
const outDir = args[1] ?? "production/episodes/01-us-vs-china/tts";

const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Bella (free-plan eligible)
const text = (await readFile(textFile, "utf8")).trim();
await mkdir(outDir, { recursive: true });

const client = new ElevenLabsClient();
console.log("requesting Bella with timestamps ...");
const result = await client.textToSpeech.convertWithTimestamps(VOICE_ID, {
  text,
  modelId: "eleven_multilingual_v2",
  outputFormat: "mp3_44100_128",
  voiceSettings: {
    stability: 0.55,
    similarityBoost: 0.75,
  },
});

await writeFile(`${outDir}/bella_timed.mp3`, Buffer.from(result.audioBase64, "base64"));
await writeFile(
  `${outDir}/bella_alignment.json`,
  JSON.stringify(
    {
      voice: "bella",
      voiceId: VOICE_ID,
      modelId: "eleven_multilingual_v2",
      text,
      alignment: result.alignment ?? null,
      normalizedAlignment: result.normalizedAlignment ?? null,
    },
    null,
    2,
  ),
);
console.log("wrote bella_timed.mp3 and bella_alignment.json");
