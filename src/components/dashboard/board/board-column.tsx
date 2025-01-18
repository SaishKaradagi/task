// src/components/dashboard/board/board-column.tsx
"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Task, TaskStatus } from "@/types/task";
import TaskCard from "./task-card";

interface BoardColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export default function BoardColumn({
  title,
  tasks,
  status,
}: BoardColumnProps) {
  return (
    <div className="flex flex-col w-80 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-2 min-h-[200px] ${
              snapshot.isDraggingOver ? "bg-gray-100" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
