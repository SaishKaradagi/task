"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ListTodo } from "lucide-react";

const navigation = [
  {
    name: "Board View",
    href: "/dashboard/board",
    icon: LayoutDashboard,
  },
  {
    name: "List View",
    href: "/dashboard/list",
    icon: ListTodo,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-[200px] flex-col border-r px-4 py-6">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
