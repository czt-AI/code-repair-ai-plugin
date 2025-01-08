// code-repair-ai-plugin/src/services/autorepairService.spec.ts

import { autorepairService } from './autorepairService';
import { expect } from 'chai';

describe('AutorepairService', () => {
  describe('autorepair', () => {
    it('should return a fixed code block', async () => {
      const brokenCode = `// This is a broken code block
let a = 1 + 2 * (3 / 0); // This will cause a runtime error
console.log(a);`;

      const fixedCode = await autorepairService.autorepair(brokenCode);
      expect(fixedCode).to.not.contain('runtime error');
      expect(fixedCode).to.contain('Infinity');
    });

    it('should not modify code that does not need fixing', async () => {
      const validCode = `// This is a valid code block
let a = 1 + 2;
console.log(a);`;

      const fixedCode = await autorepairService.autorepair(validCode);
      expect(fixedCode).to.equal(validCode);
    });
  });
});
