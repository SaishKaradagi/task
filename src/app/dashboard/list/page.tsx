import { TaskRow } from "@/components/dashboard/list/task-row";

export default function ListPage() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-6">List View</h1>
      <div className="space-y-4">
        {/* TaskRow components will be rendered here dynamically */}
      </div>
    </div>
  );
}
