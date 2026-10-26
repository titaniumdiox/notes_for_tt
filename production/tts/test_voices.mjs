import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const client = new ElevenLabsClient();
const voices = [
  ["rachel", "21m00Tcm4TlvDq8ikWAM"],
  ["adam", "pNInz6obpgDQGcFmaJgB"],
  ["bella", "EXAVITQu4vr4xnSDxMaL"],
  ["charlotte", "XB0fDUnXU5powFXDhCwa"],
  ["george", "JBFqnCBsd6RMkjVDRZzb"],
];

for (const [name, id] of voices) {
  try {
    const audio = await client.textToSpeech.convert(id, {
      text: "This is a short voice test.",
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    });
    let bytes = 0;
    for await (const chunk of audio) bytes += chunk.length;
    console.log("OK", name, id, "bytes", bytes);
  } catch (error) {
    const status = error?.statusCode ?? error?.status ?? "?";
    const message = error?.body?.detail?.message ?? error?.message ?? String(error);
    console.log("FAIL", name, id, "status", status, String(message).slice(0, 160));
  }
}
