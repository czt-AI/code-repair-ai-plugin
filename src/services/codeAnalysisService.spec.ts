import { describe, it, expect, beforeEach } from 'jest';
import { codeAnalysisService } from './codeAnalysisService';

describe('codeAnalysisService', () => {
  let analysisResult: any;

  beforeEach(() => {
    // 模拟代码分析结果
    analysisResult = {
      errors: [{ line: 10, column: 5, message: 'Syntax error' }],
      suggestions: [{ line: 20, column: 10, message: 'Consider refactoring' }],
    };
  });

  it('should analyze code and return errors and suggestions', async () => {
    const inputCode = `const x = 1; // Missing semicolon
    function test() {
      return;
    }`;
    const result = await codeAnalysisService.analyzeCode(inputCode);
    expect(result).toEqual(analysisResult);
  });

  it('should handle empty code input', async () => {
    const inputCode = '';
    const result = await codeAnalysisService.analyzeCode(inputCode);
    expect(result).toEqual(analysisResult);
  });

  it('should handle null code input', async () => {
    const inputCode = null;
    const result = await codeAnalysisService.analyzeCode(inputCode);
    expect(result).toEqual(analysisResult);
  });
});
