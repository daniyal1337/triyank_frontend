import { Package, ShoppingCart, IndianRupee, AlertTriangle } from "lucide-react";
import { Product, formatPrice } from "@/data/products";

interface Order {
  id: string;
  total: number;
  status: string;
}

interface AdminStatsProps {
  products: Product[];
  orders: Order[];
}

const AdminStats = ({ products, orders }: AdminStatsProps) => {
  const activeProducts = products.length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    { label: "Total Catalog",    value: activeProducts, sub: "Products managed", icon: Package, bg: "bg-secondary", text: "text-foreground" },
    { label: "Total Orders",    value: orders.length,  sub: `${pendingOrders} pending`, icon: ShoppingCart, bg: "bg-secondary", text: "text-foreground" },
    { label: "Revenue",         value: formatPrice(totalRevenue), sub: "All time", icon: IndianRupee, bg: "bg-emerald-100", text: "text-emerald-700" },
    { label: "Categories",       value: categories, sub: "Active categories", icon: Package, bg: "bg-secondary", text: "text-foreground" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-card rounded-xl p-5 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.text}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
