// src/components/dashboard/board/task-card.tsx
"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/types/task";
import { Calendar, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow p-4 ${
            snapshot.isDragging ? "shadow-lg" : ""
          }`}
        >
          <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>

          {task.description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            )}

            {task.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{task.tags.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
