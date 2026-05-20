// Tipos globais do Instagram Milionário

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ModuleCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  color?: string;
}

export interface CronogramaDia {
  dia: number;
  data: string;
  perfil: string;
  formato: string;
  serie: string;
  horario: string;
  tema: string;
  feito: boolean;
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export interface ViralCard {
  titulo: string;
  perfil: string;
  motivo: string;
  duracao: string;
  dica: string;
  formato: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
