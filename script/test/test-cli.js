const { expect } = require('chai');
const rewire = require('rewire');

const app = rewire('./../cli');

function getFunc(name) {
  return app.__get__(name);
}

let buffer = [];
function log(content) {
  buffer.push(content);
}

// replace the log function with the buffer for testing
app.__set__('log', log);
app.__set__('end', () => {});

describe('cli', () => {
  // reset the buffer
  function clearBuffer() {
    buffer = [];
  }

  describe('math', () => {
    it('should return the sum', async () => {
      const mathFunc = getFunc('math');
      const sampleSet = [
        { a: 3, b: 5 }, { a: 5, b: 5 }, { a: 0, b: 0 }
      ];
      for (const set of sampleSet) {
        mathFunc(set.a, set.b, { add: true });
        expect(buffer).to.contain(`Result : ${set.a + set.b}`);
        clearBuffer();
      }
    });

    it('should return the difference', async () => {
      const mathFunc = getFunc('math');
      const sampleSet = [
        { a: 3, b: 5 }, { a: 5, b: 5 }, { a: 0, b: 0 }
      ];
      for (const set of sampleSet) {
        mathFunc(set.a, set.b, { subtract: true });
        expect(buffer).to.contain(`Result : ${set.a - set.b}`);
        clearBuffer();
      }
    });
  });
});
