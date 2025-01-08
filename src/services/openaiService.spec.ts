import { OpenAIService } from './openaiService';

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeEach(() => {
    service = new OpenAIService();
  });

  it('should initialize with default configuration', () => {
    expect(service).toBeDefined();
    expect(service.apiKey).toBeDefined();
    expect(service.model).toBeDefined();
  });

  it('should call OpenAI API with correct parameters', async () => {
    const mockResponse = { data: { choices: [{ text: 'Mocked Response' }] } };
    const mockFetch = jest.fn().mockResolvedValue(mockResponse);

    global.fetch = mockFetch;

    const response = await service.callOpenAI('test prompt', 'test code');

    expect(mockFetch).toHaveBeenCalledWith('https://api.openai.com/v1/engines/' + service.model + '/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + service.apiKey,
      },
      body: JSON.stringify({
        prompt: 'test prompt',
        code: 'test code',
        max_tokens: 50,
      }),
    });

    expect(response).toEqual(mockResponse.data);
  });
});
