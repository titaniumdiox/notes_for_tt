import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { createWriteStream } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

const args = process.argv.slice(2);
const textFile = args[0] ?? "production/episodes/01-us-vs-china/vo_v3.txt";
const outDir = args[1] ?? "production/episodes/01-us-vs-china/tts";
const modelId = args[2] ?? "eleven_multilingual_v2";

// Free-plan eligible voices verified with this key:
// Bella (female) and George (male). Charlotte/Rachel return 402 on the free plan.
const voices = [
  { id: "EXAVITQu4vr4xnSDxMaL", name: "bella" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "george" },
];

const text = (await readFile(textFile, "utf8")).trim();
await mkdir(outDir, { recursive: true });

const client = new ElevenLabsClient();

for (const voice of voices) {
  const out = `${outDir}/${voice.name}.mp3`;
  console.log(`generating ${voice.name} (${voice.id}) ...`);
  const audio = await client.textToSpeech.convert(voice.id, {
    text,
    modelId,
    outputFormat: "mp3_44100_128",
    voiceSettings: {
      stability: 0.55,
      similarityBoost: 0.75,
    },
  });
  const stream = createWriteStream(out);
  Readable.fromWeb(audio).pipe(stream);
  await finished(stream);
  console.log(`wrote ${out}`);
}
