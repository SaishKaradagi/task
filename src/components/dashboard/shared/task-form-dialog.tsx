// src/components/dashboard/shared/task-form-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import TaskForm from "./task-form";
import { Task, TaskCreate } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";

interface TaskFormDialogProps {
  task?: Task;
  trigger?: React.ReactNode;
}

export default function TaskFormDialog({ task, trigger }: TaskFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { createTask, updateTask } = useTasks();

  const handleSubmit = async (taskData: TaskCreate) => {
    if (task) {
      await updateTask({ id: task.id, task: taskData });
    } else {
      await createTask(taskData);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {open && (
          <TaskForm
            task={task}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
