export type ParsedActionType =
  | 'write_file'
  | 'delete_file'
  | 'run_command'
  | 'open_preview'
  | 'close_preview'
  | 'sleep';

export interface ParsedActionBase {
  type: ParsedActionType;
  id?: string;
}

export interface WriteFileAction extends ParsedActionBase {
  type: 'write_file';
  path: string;
  content: string;
}

export interface DeleteFileAction extends ParsedActionBase {
  type: 'delete_file';
  path: string;
}

export interface RunCommandAction extends ParsedActionBase {
  type: 'run_command';
  command: string;
  cwd?: string;
  env?: Record<string, string>;
}

export interface OpenPreviewAction extends ParsedActionBase {
  type: 'open_preview';
  port: number;
  title?: string;
}

export interface ClosePreviewAction extends ParsedActionBase {
  type: 'close_preview';
  port: number;
}

export interface SleepAction extends ParsedActionBase {
  type: 'sleep';
  ms: number;
}

export type ParsedAction =
  | WriteFileAction
  | DeleteFileAction
  | RunCommandAction
  | OpenPreviewAction
  | ClosePreviewAction
  | SleepAction;

export interface ParsedArtifactPlan {
  title?: string;
  actions: ParsedAction[];
}

export interface ActionCallbackData {
  messageId: string;
  actionId: string;
  action: ParsedAction;
}

export interface ArtifactCallbackData {
  messageId: string;
  title: string;
  id: string;
}

function extractCodeFence(content: string): string[] {
  const fences: string[] = [];
  const regex = /```(?:bolt-actions|actions|json)[\s\S]*?```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    fences.push(match[0]);
  }
  return fences;
}

function stripFence(fence: string): string {
  return fence.replace(/^```[\w-]*\n?/, '').replace(/```\s*$/m, '');
}

export function parseAssistantMessage(content: string): ParsedArtifactPlan | null {
  try {
    const fences = extractCodeFence(content);
    for (const fence of fences) {
      const jsonText = stripFence(fence).trim();
      const parsed = JSON.parse(jsonText);
      const plan = validatePlan(parsed);
      if (plan) return plan;
    }
  } catch {
    // ignore parse errors; return null
  }
  return null;
}

// zod schema validation for safety
import { z } from 'zod';

const ActionBaseSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['write_file', 'delete_file', 'run_command', 'open_preview', 'close_preview', 'sleep']),
});

const WriteFileSchema = ActionBaseSchema.extend({
  type: z.literal('write_file'),
  path: z.string().min(1),
  content: z.string(),
});
const DeleteFileSchema = ActionBaseSchema.extend({
  type: z.literal('delete_file'),
  path: z.string().min(1),
});
const RunCommandSchema = ActionBaseSchema.extend({
  type: z.literal('run_command'),
  command: z.string().min(1),
  cwd: z.string().optional(),
  env: z.record(z.string()).optional(),
});
const OpenPreviewSchema = ActionBaseSchema.extend({
  type: z.literal('open_preview'),
  port: z.number().int().positive(),
  title: z.string().optional(),
});
const ClosePreviewSchema = ActionBaseSchema.extend({
  type: z.literal('close_preview'),
  port: z.number().int().positive(),
});
const SleepSchema = ActionBaseSchema.extend({
  type: z.literal('sleep'),
  ms: z.number().int().nonnegative(),
});

const ActionSchema = z.discriminatedUnion('type', [
  WriteFileSchema,
  DeleteFileSchema,
  RunCommandSchema,
  OpenPreviewSchema,
  ClosePreviewSchema,
  SleepSchema,
]);

const PlanSchema = z.union([
  z.object({ title: z.string().optional(), actions: z.array(ActionSchema) }),
  z.array(ActionSchema).transform((actions) => ({ actions })),
]);

function validatePlan(input: unknown): ParsedArtifactPlan | null {
  const result = PlanSchema.safeParse(input);
  if (!result.success) return null;
  return result.data as ParsedArtifactPlan;
}
