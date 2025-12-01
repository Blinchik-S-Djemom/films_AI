import { Ollama } from "ollama";

const fetchGeminiResponse = async (base64Image: string): Promise<string> => {
  const base64Data = base64Image.includes("base64,")
    ? base64Image.split("base64,")[1]
    : base64Image;

  const ollama = new Ollama();
  const response = await ollama.chat({
    model: "gemma3:12b",
    messages: [
      {
        role: "user",
        content: "Из какого аниме, фильма, мультика или сериала этот кадр?",
        images: [base64Data],
      },
    ],
    stream: false,
  });
  console.log(response.message.content);
  return response.message.content;
};

export default fetchGeminiResponse;
