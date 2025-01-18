// src/app/(dashboard)/list/page.tsx
"use client";

import { useTasks } from "@/hooks/use-tasks";
import TaskRow from "@/components/dashboard/list/task-row";
import { Loader2 } from "lucide-react";

export default function ListPage() {
  const { tasks, isLoading, updateTask, deleteTask } = useTasks();

  const handleStatusChange = (id: string, completed: boolean) => {
    updateTask({
      id,
      task: { status: completed ? "completed" : "todo" },
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
    <div className="bg-white rounded-lg shadow">
      {tasks?.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}
