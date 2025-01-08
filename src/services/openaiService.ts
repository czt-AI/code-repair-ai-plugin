import { OpenAISDK } from 'openai-sdk';

class OpenAIService {
  private openAISDK: OpenAISDK;

  constructor(apiKey: string) {
    this.openAISDK = new OpenAISDK(apiKey);
  }

  async analyzeCode(code: string): Promise<string> {
    return this.openAISDK.callLLM('code-analysis', code);
  }

  async repairCode(code: string): Promise<string> {
    return this.openAISDK.callLLM('code-repair', code);
  }

  async suggestCodeImprovements(code: string): Promise<string> {
    return this.openAISDK.callLLM('code-suggestions', code);
  }
}
