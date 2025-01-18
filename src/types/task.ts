export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  tags: string[];
  createdBy: string;
  attachments?: string[];
}
