import {
  IndianRupee, ShoppingCart, Package, BarChart3,
  ArrowUpRight, ArrowDownRight, TrendingUp, Calendar,
} from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { Order } from "./OrdersTable";

interface AnalyticsDashboardProps {
  products: Product[];
  orders: Order[];
}

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` :
  n >= 1000   ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`;

const KpiCard = ({
  label, value, sub, trend, trendUp, icon: Icon,
}: {
  label: string; value: string | number; sub: string;
  trend: string; trendUp: boolean; icon: any;
}) => (
  <div className="bg-card rounded-xl border border-border p-5 space-y-3">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
        <Icon className="w-4 h-4 text-foreground" />
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
    <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? "bg-secondary text-foreground" : "bg-destructive/10 text-destructive"}`}>
      {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {trend} vs last month
    </div>
  </div>
);

const monthlyData = [
  { month: "August", revenue: 87400, orders: 28 },
  { month: "September", revenue: 102300, orders: 34 },
  { month: "October", revenue: 93700, orders: 29 },
  { month: "November", revenue: 134500, orders: 45 },
  { month: "December", revenue: 189200, orders: 62 },
  { month: "January", revenue: 156800, orders: 51 },
  { month: "February", revenue: 212500, orders: 68 },
];

const AnalyticsDashboard = ({ products, orders }: AnalyticsDashboardProps) => {
  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.filter(p => p.status === "active").length;
  const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Revenue" value={fmt(totalRevenue + 856200)} sub="All-time gross revenue" trend="+18.4%" trendUp icon={IndianRupee} />
        <KpiCard label="Orders" value={totalOrders + 148} sub={`${pendingOrders} pending · ${deliveredOrders} delivered`} trend="+12.1%" trendUp icon={ShoppingCart} />
        <KpiCard label="Avg. Order Value" value={fmt(avgOrderValue || 28400)} sub="Per completed order" trend="+6.3%" trendUp icon={BarChart3} />
        <KpiCard label="Active Products" value={activeProducts} sub={`${products.length} total in catalog`} trend="-2 this week" trendUp={false} icon={Package} />
      </div>

      {/* Revenue Summary */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Revenue Summary</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-5">Monthly breakdown for the last 7 months</p>

        <div className="grid grid-cols-3 gap-4 mb-6 pb-5 border-b border-border">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{fmt(212500)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{fmt(156800)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Last Month</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{fmt(976400)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Last 7 Months</p>
          </div>
        </div>

        <div className="space-y-0">
          {monthlyData.map((m, i) => (
            <div key={m.month} className={`flex items-center justify-between py-3 text-sm ${i < monthlyData.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{m.month}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground">{m.orders} orders</span>
                <span className="font-semibold text-foreground w-20 text-right">{formatPrice(m.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
