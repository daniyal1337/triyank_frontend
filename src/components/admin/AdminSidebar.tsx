import { Link } from "react-router-dom";
import {
  Home,
  Tag,
  ShoppingCart,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Tag },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminSidebar = ({ activeTab, onTabChange, collapsed, onToggle }: AdminSidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#ebebeb] dark:bg-card border-r border-border text-foreground z-50 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-muted-foreground/20">
        {!collapsed && (
          <span className="text-base font-bold tracking-tight">Store Admin</span>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              activeTab === item.id
                ? "bg-black/10 dark:bg-white/10 font-bold text-foreground"
                : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 font-medium hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-muted-foreground/20">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/80 font-medium hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
