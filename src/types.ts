export enum Page {
  LANDING = "landing",
  SOLUTIONS = "solutions",
  MATRIX = "matrix",
  CASE_STUDIES = "case-studies",
  CAREERS = "careers",
  CONTACT = "contact"
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'In Progress';
  date: string;
}

export interface InfrastructureMetric {
  timestamp: string;
  latency: number;
  cpuUsage: number;
  memoryUsage: number;
  activeAgents: number;
  totalTokensProcessed: number;
  gpuTemperature: number;
  networkThroughput: string;
  services: {
    name: string;
    status: string;
    uptime: string;
  }[];
  clusterHealth: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  simulated?: boolean;
}
