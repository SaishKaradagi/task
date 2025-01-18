"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//import { TaskForm } from "./task-form";
import { Plus } from "lucide-react";

export function TaskFormDialog() {
  const handleSubmit = async (data: any) => {
    // TODO: Implement task creation/update logic
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        {/* <TaskForm onSubmit={handleSubmit} /> */}
      </DialogContent>
    </Dialog>
  );
}
