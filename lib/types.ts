// Types pour remplacer les types IPC Electron

export interface FileAttachment {
  name: string;
  content: string;
  type: string;
  size: number;
}

export interface App {
  id: number;
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  githubOrg?: string;
  githubRepo?: string;
  githubBranch?: string;
  supabaseProjectId?: string;
  neonProjectId?: string;
  neonDevelopmentBranchId?: string;
  neonPreviewBranchId?: string;
  vercelProjectId?: string;
  vercelProjectName?: string;
  vercelTeamId?: string;
  vercelDeploymentUrl?: string;
  installCommand?: string;
  startCommand?: string;
  chatContext?: any;
}

export interface Chat {
  id: number;
  appId: number;
  title?: string;
  initialCommitHash?: string;
  createdAt: Date;
}

export interface Message {
  id: number;
  chatId: number;
  role: 'user' | 'assistant';
  content: string;
  approvalState?: 'approved' | 'rejected';
  commitHash?: string;
  createdAt: Date;
}

export interface Settings {
  enableAutoUpdate: boolean;
  releaseChannel: 'stable' | 'beta';
  enableTelemetry: boolean;
  selectedLanguageModel: string;
  openaiApiKey: string;
  anthropicApiKey: string;
  googleApiKey: string;
  azureApiKey: string;
  azureEndpoint: string;
  customApiUrl: string;
  customApiKey: string;
  supabaseAccessToken: string;
  supabaseProjectId: string;
  neonApiKey: string;
  vercelAccessToken: string;
  vercelTeamId: string;
  githubAccessToken: string;
}

export interface AppOutput {
  type: 'stdout' | 'stderr' | 'input-requested';
  message: string;
  appId: number;
  timestamp: number;
}

export interface ChatResponseEnd {
  chatId: number;
  finalMessage?: string;
  success: boolean;
  error?: string;
}

export interface ProblemReport {
  type: 'error' | 'warning';
  message: string;
  file?: string;
  line?: number;
  column?: number;
}
