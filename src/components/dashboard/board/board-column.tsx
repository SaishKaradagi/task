"use client";

import { TaskCard } from "./task-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/hooks/use-tasks";

interface BoardColumnProps {
  title: string;
  status: "todo" | "in-progress" | "done";
}

export function BoardColumn({ title, status }: BoardColumnProps) {
  const { tasks } = useTasks();
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {columnTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
