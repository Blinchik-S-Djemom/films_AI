import { Ollama } from "ollama";
import { ansver } from "./questions";

const ollama = new Ollama();
const Testansver = async (prompt: string): Promise<string> => {
  const ollama = new Ollama();
  const response = await ollama.chat({
    model: "gemma3:12b",
    messages: [
      {
        role: "user",
        content: ansver.join(""),
      },
    ],
  });
  console.log(response.message.content);
  return response.message.content;
};

export default Testansver;
