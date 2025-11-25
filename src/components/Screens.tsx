import { Ollama } from "ollama";

const imagePath = "./test.jpg";
const fetchGeminiResponse = async (): Promise<string> => {
  const ollama = new Ollama();
  const response = await ollama.chat({
    model: "gemma3:12b",
    messages: [
      {
        role: "user",
        content: "Из какого аниме, фильма, мультика или сериала этот кадр?",
        images: [imagePath],
      },
    ],
    stream: false,
  });
  console.log(response.message.content);
  return response.message.content;
};

export default fetchGeminiResponse;
