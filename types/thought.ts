import type { Tag } from "./tag";

export type ThoughtCategory = "inbox" | "project" | "area" | "resource" | "archive";

export interface Thought {
  id: string;
  content: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isArchived: boolean;

  // PARA categorization
  category: ThoughtCategory;
  projectId?: string;
  areaId?: string;

  // Progressive summarization (distillation)
  summary?: string;
  keyPoint?: string;

  // Connections
  linkedThoughtIds?: string[];
}

export interface ThoughtCreateInput {
  content: string;
  tagIds?: string[];
  category?: ThoughtCategory;
  projectId?: string;
  areaId?: string;
}

export interface ThoughtUpdateInput {
  content?: string;
  tagIds?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
  category?: ThoughtCategory;
  projectId?: string;
  areaId?: string;
  summary?: string;
  keyPoint?: string;
  linkedThoughtIds?: string[];
}
