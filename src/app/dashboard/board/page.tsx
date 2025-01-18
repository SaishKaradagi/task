// src/app/(dashboard)/board/page.tsx
"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTasks } from "@/hooks/use-tasks";
import BoardColumn from "@/components/dashboard/board/board-column";
import { TaskStatus } from "@/types/task";
import { Loader2 } from "lucide-react";

const columns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function BoardPage() {
  const { tasks, isLoading, updateTask } = useTasks();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    updateTask({
      id: draggableId,
      task: { status: newStatus },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-full overflow-x-auto">
        <div className="flex gap-6 p-6">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              title={column.title}
              status={column.id}
              tasks={tasks?.filter((task) => task.status === column.id) ?? []}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
