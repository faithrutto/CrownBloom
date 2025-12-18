export interface RoutineTask {
  id: string;
  title: string;
  description: string;
  category: 'wash' | 'moisturize' | 'style' | 'care' | 'other';
  completed: boolean;
  timeEstimate: string; // e.g., "15 mins"
}

export interface DaySchedule {
  day: string; // 'Monday', 'Tuesday', etc.
  tasks: RoutineTask[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'growth' | 'maintenance' | 'styling' | 'science';
  readTime: string;
  imageUrl: string;
}

export interface ProgressLog {
  id: string;
  date: string;
  length: number; // inches
  hydrationScore: number; // 1-10
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Cleansing' | 'Conditioning' | 'Treatment' | 'Styling' | 'Tools';
  rating: number;
}
