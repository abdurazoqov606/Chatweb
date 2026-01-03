
export interface Project {
  id: string;
  name: string;
  language: 'Kotlin' | 'Java' | 'XML';
  lastModified: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 formatidagi rasm
  timestamp: Date;
}

export enum AppTab {
  PROJECTS = 'projects',
  EDITOR = 'editor',
  AI_CHAT = 'ai_chat',
  PREVIEW = 'preview',
  BUILD = 'build'
}
