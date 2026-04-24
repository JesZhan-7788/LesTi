export interface Character {
  id: string;
  name: string;
  work: string;
  tags: string[];
  description: string;
  whisper: string;
  imageUrl?: string;
  coords: {
    burn: number; // 燃烧(+1) ↔ 克制(-1)
    boundary: number; // 边界(+1) ↔ 融合(-1)
    give: number; // 给予(+1) ↔ 承接(-1)
    speak: number; // 言说(+1) ↔ 沉默(-1)
  };
}

export type Dimension = 'burn' | 'boundary' | 'give' | 'speak';

export interface Option {
  text: string;
  // Each option can affect up to 2 dimensions
  effects: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  isKeyQuestion?: boolean;
  keyTarget?: string; // e.g. 'Tina', 'Pie'
}
