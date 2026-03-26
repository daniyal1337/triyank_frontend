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
  const activeProducts = products.filter(p => p.status === "active").length;
  const lowStock = products.filter(p => p.stock <= (p.lowStockThreshold || 5)).length;
  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    { label: "Active Products", value: activeProducts, sub: `${products.length} total`, icon: Package, bg: "bg-secondary", text: "text-foreground" },
    { label: "Total Orders",    value: orders.length,  sub: `${pendingOrders} pending`, icon: ShoppingCart, bg: "bg-secondary", text: "text-foreground" },
    { label: "Revenue",         value: formatPrice(totalRevenue), sub: "All time", icon: IndianRupee, bg: "bg-secondary", text: "text-foreground" },
    { label: "Low Stock",       value: lowStock, sub: "Items need restock", icon: AlertTriangle, bg: "bg-destructive/10", text: "text-destructive" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-xl p-5 border border-border">
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
