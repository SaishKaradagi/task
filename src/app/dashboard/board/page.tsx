import { BoardColumn } from "@/components/dashboard/board/board-column";

export default function BoardPage() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-6">Board View</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BoardColumn title="To Do" status="todo" />
        <BoardColumn title="In Progress" status="in-progress" />
        <BoardColumn title="Done" status="done" />
      </div>
    </div>
  );
}
