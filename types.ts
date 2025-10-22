export interface WorkExperience {
  company: string;
  link?: string;
  role: string;
  period: string;
  location: string;
  sections: { title: string; tasks: string[] }[];
}

export interface Education {
  degree: string;
  institution: string;
  link?: string;
  location: string;
}

export interface Language {
  name: string;
  level: number; // Level out of 5
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
