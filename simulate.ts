import { calculateResult } from './src/lib/scoring.js';
import { questions } from './src/data/questions.js';

const iterations = 500000;
const results: Record<string, number> = {};

for (let i = 0; i < iterations; i++) {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    const idx = Math.floor(Math.random() * q.options.length);
    answers[q.id] = idx;
  }
  
  const char = calculateResult(answers);
  results[char.name] = (results[char.name] || 0) + 1;
}

const total = Object.values(results).reduce((a, b) => a + b, 0);

console.log(`Simulation complete. Total iterations: ${total}`);
console.log('--- Probabilities ---');
const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
for (const [name, count] of sorted) {
  console.log(`${name.padEnd(15)}: ${((count / total) * 100).toFixed(2)}%`);
}
