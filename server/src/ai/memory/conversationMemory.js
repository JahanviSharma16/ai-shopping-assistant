import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

class ConversationMemoryStore {
  constructor() {
    this.histories = new Map();
  }

  getHistory(conversationId) {
    if (!this.histories.has(conversationId)) {
      this.histories.set(conversationId, new InMemoryChatMessageHistory());
    }

    return this.histories.get(conversationId);
  }

  async getMessages(conversationId) {
    const history = this.getHistory(conversationId);
    return history.getMessages();
  }

  async addUserMessage(conversationId, message) {
    const history = this.getHistory(conversationId);
    await history.addUserMessage(message);
  }

  async addAIMessage(conversationId, message) {
    const history = this.getHistory(conversationId);
    await history.addAIMessage(message);
  }

  async clear(conversationId) {
    const history = this.getHistory(conversationId);
    await history.clear();
    this.histories.delete(conversationId);
  }
}

const conversationMemory = new ConversationMemoryStore();

export default conversationMemory;
