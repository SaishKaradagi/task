// src/components/dashboard/list/task-row.tsx
import { Task } from "@/types/task";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Tag, MoreVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskRowProps {
  task: Task;
  onStatusChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskRow({
  task,
  onStatusChange,
  onDelete,
}: TaskRowProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50">
      <Checkbox
        checked={task.status === "completed"}
        onCheckedChange={(checked) =>
          onStatusChange(task.id, checked as boolean)
        }
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-gray-500 truncate">{task.description}</p>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
            </span>
          </div>
        )}

        {task.tags.length > 0 && (
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{task.tags.join(", ")}</span>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDelete(task.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
