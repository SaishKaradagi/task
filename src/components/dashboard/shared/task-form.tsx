"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo } from "lucide-react";

export function ViewSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      <Button
        variant={pathname === "/dashboard/board" ? "default" : "outline"}
        asChild
      >
        <Link href="/dashboard/board">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Board
        </Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/list" ? "default" : "outline"}
        asChild
      >
        <Link href="/dashboard/list">
          <ListTodo className="mr-2 h-4 w-4" />
          List
        </Link>
      </Button>
    </div>
  );
}
