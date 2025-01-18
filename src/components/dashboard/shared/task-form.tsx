// src/components/dashboard/shared/task-form.tsx
"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task, TaskCreate } from "@/types/task";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { storage } from "@/lib/firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: TaskCreate) => void;
  onClose: () => void;
}

export default function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [open, setOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<string[]>(task?.attachments || []);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>(
    {}
  );
  const authContext = useAuth();
  const user = authContext?.user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          tags: task.tags,
        }
      : {
          status: "todo",
          priority: "medium",
          tags: [],
        },
  });

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles || !user) return;

      setIsUploading(true);
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

      try {
        const uploadPromises = Array.from(selectedFiles).map(
          async (file, idx) => {
            if (file.size > MAX_FILE_SIZE) {
              alert(`${file.name} exceeds the 5MB size limit.`);
              return null;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
              alert(`${file.name} is not an allowed file type.`);
              return null;
            }

            const fileRef = ref(
              storage,
              `tasks/${user.uid}/${Date.now()}-${file.name}`
            );

            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress((prev) => ({
                  ...prev,
                  [idx]: Math.round(progress),
                }));
              },
              (error) => {
                console.error("Upload failed:", error);
              }
            );

            await uploadTask;
            return getDownloadURL(fileRef);
          }
        );

        const uploadedUrls = (await Promise.all(uploadPromises)).filter(
          (url) => url !== null
        ) as string[];
        setFiles((prev) => [...prev, ...uploadedUrls]);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [user]
  );

  const onFormSubmit = async (data: TaskFormData) => {
    if (!user) return;

    const taskData: TaskCreate = {
      ...data,
      userId: user.uid,
      attachments: files,
      dueDate: data.dueDate?.toISOString(),
    };

    onSubmit(taskData);
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              {...register("title")}
              className={cn(errors.title && "border-red-500")}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <Textarea
            placeholder="Description (optional)"
            {...register("description")}
          />

          {/* Existing form logic unchanged */}

          <div>
            <Input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span className="text-sm truncate flex-1">{file}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {isUploading && (
              <div className="mt-2 space-y-1">
                {Object.values(uploadProgress).map((progress, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    Uploading file {idx + 1}: {progress}%
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
