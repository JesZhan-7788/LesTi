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

  // 2. Dynamic Normalization -> Map raw scores to [-1, 1] based on theoretical max/min
  const maxPossible: Record<Dimension, number> = { burn: 0, boundary: 0, give: 0, speak: 0 };
  
  questions.filter(q => !q.isKeyQuestion).forEach(q => {
    // For each dimension, find the maximum absolute effect this question could have
    (Object.keys(maxPossible) as Dimension[]).forEach(dim => {
      let maxAbs = 0;
      q.options.forEach(opt => {
         const val = Math.abs(opt.effects[dim] || 0);
         if (val > maxAbs) maxAbs = val;
      });
      maxPossible[dim] += maxAbs;
    });
  });

  const normalizedScores: Record<Dimension, number> = {
    burn: maxPossible.burn > 0 ? rawScores.burn / maxPossible.burn : 0,
    boundary: maxPossible.boundary > 0 ? rawScores.boundary / maxPossible.boundary : 0,
    give: maxPossible.give > 0 ? rawScores.give / maxPossible.give : 0,
    speak: maxPossible.speak > 0 ? rawScores.speak / maxPossible.speak : 0,
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
    
    const distance = Math.sqrt(dBurn*dBurn + dBoundary*dBoundary + dGive*dGive + dSpeak*dSpeak);
    
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
