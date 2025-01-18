// src/types/task.ts
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags: string[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
}

export interface TaskCreate
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}
