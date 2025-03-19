
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  prize: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
    prize: 1000,
    difficulty: 'easy'
  },
  {
    id: 2,
    text: "Which of these is NOT a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: 3,
    prize: 2000,
    difficulty: 'easy'
  },
  {
    id: 3,
    text: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Giraffe"],
    correctAnswer: 1,
    prize: 3000,
    difficulty: 'easy'
  },
  {
    id: 4,
    text: "Which of these is NOT a programming language?",
    options: ["Python", "Java", "Cobra", "Ruby"],
    correctAnswer: 2,
    prize: 5000,
    difficulty: 'easy'
  },
  {
    id: 5,
    text: "Which city is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2,
    prize: 10000,
    difficulty: 'medium'
  },
  {
    id: 6,
    text: "In which year did the Titanic sink?",
    options: ["1910", "1912", "1915", "1920"],
    correctAnswer: 1,
    prize: 20000,
    difficulty: 'medium'
  },
  {
    id: 7,
    text: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: 2,
    prize: 40000,
    difficulty: 'medium'
  },
  {
    id: 8,
    text: "Which of these is NOT one of the Seven Wonders of the Ancient World?",
    options: ["Great Pyramid of Giza", "Colosseum", "Hanging Gardens of Babylon", "Lighthouse of Alexandria"],
    correctAnswer: 1,
    prize: 80000,
    difficulty: 'medium'
  },
  {
    id: 9,
    text: "Which scientist proposed the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
    correctAnswer: 1,
    prize: 160000,
    difficulty: 'hard'
  },
  {
    id: 10,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    prize: 320000,
    difficulty: 'hard'
  },
  {
    id: 11,
    text: "Which famous painter cut off his own ear?",
    options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Leonardo da Vinci"],
    correctAnswer: 2,
    prize: 640000,
    difficulty: 'hard'
  },
  {
    id: 12,
    text: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    prize: 1000000,
    difficulty: 'hard'
  }
];

export const prizeLadder = questions.map(q => q.prize).reverse();
