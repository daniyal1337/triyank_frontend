import { useState, useEffect } from "react";
import {
  IndianRupee, ShoppingCart, Package, BarChart3,
  ArrowUpRight, ArrowDownRight, TrendingUp, Calendar,
  Loader2
} from "lucide-react";
import { formatPrice } from "@/data/products";

interface RevenueSummary {
  month: string;
  orders: number;
  revenue: string;
}

interface AnalyticsData {
  total_revenue: string;
  orders: number;
  avg_order_value: string;
  total_catalog: number;
  revenue_summary: RevenueSummary[];
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
  <div className="bg-white dark:bg-card rounded-xl border border-border p-5 space-y-3 shadow-sm">
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

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/orders/analytics/details`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const analyticsData: AnalyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-card rounded-xl p-8 border border-border shadow-sm text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-card rounded-xl p-8 border border-border shadow-sm text-center">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const totalRevenue = Number(data.total_revenue);
  const totalOrders = data.orders;
  const avgOrderValue = Number(data.avg_order_value);
  const totalCatalog = data.total_catalog;

  // Calculate trends based on revenue_summary
  const revenueSummary = data.revenue_summary || [];
  const currentMonthData = revenueSummary[revenueSummary.length - 1];
  const previousMonthData = revenueSummary.length > 1 ? revenueSummary[revenueSummary.length - 2] : null;

  const currentMonthRevenue = currentMonthData ? Number(currentMonthData.revenue) : 0;
  const previousMonthRevenue = previousMonthData ? Number(previousMonthData.revenue) : currentMonthRevenue;
  const revenueTrend = previousMonthRevenue > 0
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
    : "0.0";
  const revenueTrendUp = Number(revenueTrend) >= 0;

  const currentMonthOrders = currentMonthData ? currentMonthData.orders : 0;
  const previousMonthOrders = previousMonthData ? previousMonthData.orders : currentMonthOrders;
  const ordersTrend = previousMonthOrders > 0
    ? ((currentMonthOrders - previousMonthOrders) / previousMonthOrders * 100).toFixed(1)
    : "0.0";
  const ordersTrendUp = Number(ordersTrend) >= 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Revenue" value={fmt(totalRevenue)} sub="All-time gross revenue" trend={`${revenueTrendUp ? "+" : ""}${revenueTrend}%`} trendUp={revenueTrendUp} icon={IndianRupee} />
        <KpiCard label="Orders" value={totalOrders} sub={`${totalOrders} total orders`} trend={`${ordersTrendUp ? "+" : ""}${ordersTrend}%`} trendUp={ordersTrendUp} icon={ShoppingCart} />
        <KpiCard label="Avg. Order Value" value={fmt(avgOrderValue)} sub="Per completed order" trend="+6.3%" trendUp icon={BarChart3} />
        <KpiCard label="Total Catalog" value={totalCatalog} sub="Products managed" trend="+0 this week" trendUp icon={Package} />
      </div>

      {/* Revenue Summary */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Revenue Summary</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-5">Monthly breakdown for the last 7 months</p>

        <div className="grid grid-cols-3 gap-4 mb-6 pb-5 border-b border-border">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{currentMonthData ? fmt(Number(currentMonthData.revenue)) : fmt(0)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{previousMonthData ? fmt(Number(previousMonthData.revenue)) : fmt(0)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Last Month</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{fmt(totalRevenue)}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">All Time</p>
          </div>
        </div>

        <div className="space-y-0">
          {revenueSummary.map((m, i) => (
            <div key={m.month} className={`flex items-center justify-between py-3 text-sm ${i < revenueSummary.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">{m.month}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground">{m.orders} orders</span>
                <span className="font-semibold text-foreground w-20 text-right">{formatPrice(Number(m.revenue))}</span>
              </div>
            </div>
          ))}
          {revenueSummary.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No monthly data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
