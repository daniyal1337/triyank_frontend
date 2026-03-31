import { useState, useEffect } from "react";
import { Package, ShoppingCart, IndianRupee, AlertTriangle, Loader2 } from "lucide-react";
import { formatPrice } from "@/data/products";

interface DashboardData {
  total_products: number;
  total_orders: number;
  pending_orders: number;
  total_revenue: string;
}

const AdminStats = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/dashboard/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-card rounded-xl p-5 border border-border shadow-sm flex items-center justify-center h-28">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white dark:bg-card rounded-xl p-5 border border-border shadow-sm">
        <p className="text-sm text-red-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Products", value: data.total_products, sub: "Products in catalog", icon: Package, bg: "bg-secondary", text: "text-foreground" },
    { label: "Total Orders", value: data.total_orders, sub: "All orders received", icon: ShoppingCart, bg: "bg-secondary", text: "text-foreground" },
    { label: "Pending Orders", value: data.pending_orders, sub: "Awaiting processing", icon: AlertTriangle, bg: "bg-amber-100", text: "text-amber-700" },
    { label: "Total Revenue", value: formatPrice(Number(data.total_revenue)), sub: "All time earnings", icon: IndianRupee, bg: "bg-emerald-100", text: "text-emerald-700" },
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
