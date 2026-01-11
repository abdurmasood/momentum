import type { Thought } from "@/types/thought";
import type { Tag } from "@/types/tag";
import type { Project } from "@/types/project";
import type { Area } from "@/types/area";

/**
 * Mock tags for development
 */
export const mockTags: Tag[] = [
  { id: "1", name: "Work", color: "blue", thoughtCount: 5 },
  { id: "2", name: "Personal", color: "emerald", thoughtCount: 3 },
  { id: "3", name: "Ideas", color: "violet", thoughtCount: 8 },
  { id: "4", name: "Learning", color: "amber", thoughtCount: 4 },
  { id: "5", name: "Health", color: "pink", thoughtCount: 2 },
];

/**
 * Mock projects for development
 */
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Q1 Product Launch",
    description: "Launch new feature set for enterprise customers",
    status: "active",
    thoughtCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "proj-2",
    name: "CLI Tool",
    description: "Developer scaffolding tool with framework integration",
    status: "active",
    thoughtCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

/**
 * Mock areas for development
 */
export const mockAreas: Area[] = [
  {
    id: "area-1",
    name: "Health & Fitness",
    description: "Physical and mental wellbeing",
    thoughtCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "area-2",
    name: "Career",
    description: "Professional development and growth",
    thoughtCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "area-3",
    name: "Family",
    description: "Family relationships and responsibilities",
    thoughtCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "area-4",
    name: "Finance",
    description: "Financial planning and management",
    thoughtCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

/**
 * Mock thoughts for development
 * Distributed across PARA categories
 */
export const mockThoughts: Thought[] = [
  // Inbox thoughts (unprocessed)
  {
    id: "1",
    content:
      "Need to review the quarterly OKRs and align team priorities. Schedule a meeting with stakeholders to discuss roadmap adjustments.",
    tags: [mockTags[0], mockTags[2]],
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    isPinned: false,
    isArchived: false,
    category: "inbox",
  },
  {
    id: "2",
    content:
      "Explore using Framer Motion for page transitions. The animation system looks really powerful for creating fluid UIs.",
    tags: [mockTags[3], mockTags[2]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isPinned: false,
    isArchived: false,
    category: "inbox",
  },
  {
    id: "7",
    content:
      "Look into the new React Server Components pattern. Could be useful for improving initial page load performance.",
    tags: [mockTags[3]],
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45),
    isPinned: false,
    isArchived: false,
    category: "inbox",
  },

  // Project thoughts
  {
    id: "3",
    content:
      "Draft the product announcement blog post. Focus on the key benefits for enterprise users and include customer testimonials.",
    tags: [mockTags[0]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isPinned: true,
    isArchived: false,
    category: "project",
    projectId: "proj-1",
  },
  {
    id: "4",
    content:
      "Coordinate with marketing team on launch timeline. Need to align on press release date and social media campaign.",
    tags: [mockTags[0]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isPinned: false,
    isArchived: false,
    category: "project",
    projectId: "proj-1",
  },
  {
    id: "5",
    content:
      "Build a CLI tool that helps developers scaffold projects faster. Could integrate with popular frameworks and include best practices by default.",
    tags: [mockTags[2], mockTags[0]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isPinned: true,
    isArchived: false,
    category: "project",
    projectId: "proj-2",
    summary: "CLI scaffolding tool with framework integration and plugin architecture.",
  },

  // Area thoughts
  {
    id: "6",
    content:
      "Start a morning meditation routine. Research shows 10 minutes daily can significantly reduce stress and improve focus.",
    tags: [mockTags[4], mockTags[1]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isPinned: false,
    isArchived: false,
    category: "area",
    areaId: "area-1",
  },
  {
    id: "8",
    content:
      "Read 'Thinking, Fast and Slow' by Daniel Kahneman. The concepts of System 1 and System 2 thinking are fascinating.",
    tags: [mockTags[3], mockTags[1]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    isPinned: false,
    isArchived: false,
    category: "area",
    areaId: "area-2",
    summary: "Book about cognitive biases and decision-making systems.",
    keyPoint: "System 1 is fast and intuitive, System 2 is slow and deliberate.",
  },
  {
    id: "9",
    content:
      "Remember to call mom this weekend. Also pick up groceries for the dinner party on Saturday.",
    tags: [mockTags[1]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isPinned: false,
    isArchived: false,
    category: "area",
    areaId: "area-3",
  },

  // Resource thoughts
  {
    id: "10",
    content:
      "Useful Git commands: git stash, git cherry-pick, git rebase -i. Remember to use interactive rebase for cleaning up commit history before PRs.",
    tags: [mockTags[3]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    isPinned: false,
    isArchived: false,
    category: "resource",
  },
  {
    id: "11",
    content:
      "Design principles to remember: proximity, alignment, repetition, contrast (PARC). These fundamentals apply to both UI design and document layout.",
    tags: [mockTags[3], mockTags[2]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    isPinned: false,
    isArchived: false,
    category: "resource",
    summary: "PARC design principles for visual hierarchy.",
  },
];

/**
 * Mock archived thoughts
 */
export const mockArchivedThoughts: Thought[] = [
  {
    id: "a1",
    content: "Completed the API integration for the payment system.",
    tags: [mockTags[0]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    isPinned: false,
    isArchived: true,
    category: "archive",
  },
  {
    id: "a2",
    content: "Finished reading 'Atomic Habits' - great insights on habit formation.",
    tags: [mockTags[3], mockTags[1]],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    isPinned: false,
    isArchived: true,
    category: "archive",
    summary: "Book about building good habits and breaking bad ones.",
    keyPoint: "Make it obvious, attractive, easy, and satisfying.",
  },
];

/**
 * Helper functions for filtering thoughts by category
 */
export const getInboxThoughts = () =>
  mockThoughts.filter((t) => t.category === "inbox");

export const getProjectThoughts = (projectId: string) =>
  mockThoughts.filter((t) => t.category === "project" && t.projectId === projectId);

export const getAreaThoughts = (areaId: string) =>
  mockThoughts.filter((t) => t.category === "area" && t.areaId === areaId);

export const getResourceThoughts = () =>
  mockThoughts.filter((t) => t.category === "resource");
