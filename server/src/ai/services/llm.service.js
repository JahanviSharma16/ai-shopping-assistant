import { createChatGroq } from "../llm/chatGroq.factory.js";

class LLMService {
  constructor() {
    this.model = createChatGroq();
  }

  async chat(messages) {
    return this.model.invoke(messages);
  }

  async stream(messages) {
    return this.model.stream(messages);
  }

  async invoke(prompt) {
    return this.model.invoke(prompt);
  }

  structuredOutput(schema) {
    return this.model.withStructuredOutput(schema);
  }
}

const llmService = new LLMService();

export default llmService;
