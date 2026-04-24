import { Character, Dimension, Question } from '../types';
import { characters } from '../data/characters';
import { questions } from '../data/questions';

export function calculateResult(answers: Record<string, number>): Character {
  // 1. Calculate raw scores
  const rawScores: Record<Dimension, number> = { burn: 0, boundary: 0, give: 0, speak: 0 };
  
  Object.entries(answers).forEach(([qId, optionIdx]) => {
    const q = questions.find((x) => x.id === qId);
    if (!q || q.isKeyQuestion) return; // Process key questions separately later
    
    const option = q.options[optionIdx];
    if (option.effects) {
      Object.entries(option.effects).forEach(([dim, val]) => {
        rawScores[dim as Dimension] += val;
      });
    }
  });

  // 2. Statistical Z-Score Normalization
  // Pre-calculated from test option distributions to perfectly center the results
  // and spread them according to the standard deviation of possible answers.
  const means = { burn: 0, boundary: 1.5, give: 1.75, speak: -1.75 };
  const stdDevs = { burn: 3.464, boundary: 3.041, give: 2.537, speak: 3.527 };
  const SCALE = 0.65;

  const normalizedScores: Record<Dimension, number> = {
    burn: ((rawScores.burn - means.burn) / stdDevs.burn) * SCALE,
    boundary: ((rawScores.boundary - means.boundary) / stdDevs.boundary) * SCALE,
    give: ((rawScores.give - means.give) / stdDevs.give) * SCALE,
    speak: ((rawScores.speak - means.speak) / stdDevs.speak) * SCALE,
  };

  // 3. Find the closest character using Euclidean Distance
  let bestMatch: Character = characters[0];
  let minDistance = Infinity;
  let ties: Character[] = [];

  characters.forEach(char => {
    const dBurn = normalizedScores.burn - char.coords.burn;
    const dBoundary = normalizedScores.boundary - char.coords.boundary;
    const dGive = normalizedScores.give - char.coords.give;
    const dSpeak = normalizedScores.speak - char.coords.speak;

    const distance = Math.sqrt(dBurn**2 + dBoundary**2 + dGive**2 + dSpeak**2);
    
    if (Math.abs(distance - minDistance) < 0.001) {
      ties.push(char);
    } else if (distance < minDistance) {
      minDistance = distance;
      bestMatch = char;
      ties = [char];
    }
  });

  // 4. Tie-breaking logic
  // According to the document, if we hit the "Tina/Yimin/Wil" bucket (and potentially Pie since she's close),
  // we use Key Questions.
  if (ties.length > 1) {
    // If it's a generic tie, prefer the one with more 0s as specified in the doc
    let bestTie = ties[0];
    let maxZeros = -1;
    
    // Check if the tie involves our special key-question group [-1, -1, -1, -1]
    const specialIds = ['tina', 'yimin', 'wil', 'pie'];
    const hasSpecialTies = ties.some(t => specialIds.includes(t.id));
    
    if (hasSpecialTies) {
       // Score the tie-breakers
       let topKeyScore = -Infinity;
       
       ties.forEach(char => {
         // Find if there's a key question targeting this character specifically
         const kq = questions.find(q => q.isKeyQuestion && q.keyTarget === char.id);
         let scoreForChar = 0;
         
         if (kq) {
           const ansIdx = answers[kq.id];
           if (ansIdx !== undefined) {
              // Extract the score from the option effect (using any dimension it targets, assuming it maps properly)
              const effectObj = kq.options[ansIdx].effects;
              scoreForChar = Object.values(effectObj)[0] || 0; 
           }
         }
         
         if (scoreForChar > topKeyScore) {
           topKeyScore = scoreForChar;
           bestTie = char;
         } else if (scoreForChar === topKeyScore) {
            // "平局时优先匹配怡敏" inside key questions
            if (char.id === 'yimin') bestTie = char;
         }
       });
       return bestTie;
    }
    
    ties.forEach(char => {
      const zeros = Object.values(char.coords).filter(v => v === 0).length;
      if (zeros > maxZeros) {
        maxZeros = zeros;
        bestTie = char;
      }
    });
    bestMatch = bestTie;
  }

  return bestMatch;
}
