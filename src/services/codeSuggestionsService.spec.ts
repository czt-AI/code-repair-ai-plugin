import { expect } from 'chai';
import { CodeSuggestionsService } from './codeSuggestionsService';

describe('CodeSuggestionsService', () => {
  let service: CodeSuggestionsService;

  beforeEach(() => {
    service = new CodeSuggestionsService();
  });

  it('should provide code improvement suggestions', () => {
    const code = `// This is a comment`;
    const suggestions = service.getSuggestions(code);
    expect(suggestions).to.be.an('array');
    expect(suggestions.length).to.be.at.least(1);
    expect(suggestions[0]).to.contain('improve readability');
  });

  it('should handle empty code input', () => {
    const code = '';
    const suggestions = service.getSuggestions(code);
    expect(suggestions).to.be.an('array');
    expect(suggestions.length).to.equal(0);
  });

  it('should not provide suggestions for non-code content', () => {
    const code = `<html><body></body></html>`;
    const suggestions = service.getSuggestions(code);
    expect(suggestions).to.be.an('array');
    expect(suggestions.length).to.equal(0);
  });
});
