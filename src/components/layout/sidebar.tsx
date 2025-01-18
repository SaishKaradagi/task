// // src/components/layout/sidebar.tsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { LayoutGrid, List, Plus, Calendar, Settings, Tags } from "lucide-react";

// const navigation = [
//   {
//     name: "Board View",
//     href: "/board",
//     icon: LayoutGrid,
//   },
//   {
//     name: "List View",
//     href: "/list",
//     icon: List,
//   },
//   {
//     name: "Calendar",
//     href: "/calendar",
//     icon: Calendar,
//   },
//   {
//     name: "Tags",
//     href: "/tags",
//     icon: Tags,
//   },
// ];

// export default function DashboardSidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col w-64 border-r bg-white">
//       <div className="p-4">
//         <Button className="w-full justify-start gap-2">
//           <Plus className="h-4 w-4" /> New Task
//         </Button>
//       </div>

//       <nav className="flex-1 space-y-1 p-2">
//         {navigation.map((item) => {
//           const Icon = item.icon;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
//                 pathname === item.href
//                   ? "bg-purple-50 text-purple-600"
//                   : "text-gray-700 hover:bg-gray-50"
//               )}
//             >
//               <Icon className="h-4 w-4" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="border-t p-2">
//         <Link
//           href="/settings"
//           className={cn(
//             "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
//             pathname === "/settings"
//               ? "bg-purple-50 text-purple-600"
//               : "text-gray-700 hover:bg-gray-50"
//           )}
//         >
//           <Settings className="h-4 w-4" />
//           Settings
//         </Link>
//       </div>
//     </div>
//   );
// }

// Update src/components/layout/sidebar.tsx
import TaskFormDialog from "@/components/dashboard/shared/task-form-dialog";

// Replace the New Task button with:
<div className="p-4">
  <TaskFormDialog />
</div>;
