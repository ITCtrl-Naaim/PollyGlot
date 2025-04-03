import { HfInference } from "@huggingface/inference";
// import { HfInference } from "https://cdn.skypack.dev/@huggingface/inference";
const API_KEY = import.meta.env.VITE_HF_API_KEY;

if (!API_KEY) {
  console.error(
    "Hugging Face API token is missing. Please set VITE_HF_API_KEY in your environment."
  );
}

const hf = new HfInference(API_KEY);

export async function translateText(text = "Hello", language = "fr") {
  try {
    const result = await hf.translation({
      model: `Helsinki-NLP/opus-mt-en-${language}`,
      inputs: text,
    });
    return result.translation_text;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
