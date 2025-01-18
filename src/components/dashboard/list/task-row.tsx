"use client";

import { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Tag } from "lucide-react";

interface TaskRowProps {
  task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors">
      <Checkbox checked={task.status === "done"} />
      <div className="flex-1">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
