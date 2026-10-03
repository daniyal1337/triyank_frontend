import { useEffect, useState } from "react";
import { Package, RotateCcw, IndianRupee, RefreshCw } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type ReturnStatus = "Returned" | "Refunded";

type ReturnItem = {
  id?: string;
  _id?: string;
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  refundAmount?: number;
  status: ReturnStatus;
  createdAt?: string;
};

const STATUS_COLOR: Record<ReturnStatus, string> = {
  Returned: "bg-orange-100 text-orange-700 border-orange-200",
  Refunded: "bg-secondary text-muted-foreground border-border",
};

interface ReturnsSummary {
  total_returns: number;
  returned_orders: number;
  refunded_orders: number;
  total_refunded_amount: number;
}

const normalizeReturnStatus = (status: string): ReturnStatus => (
  status?.toLowerCase() === "refunded" ? "Refunded" : "Returned"
);

const buildSummaryFromItems = (items: ReturnItem[]): ReturnsSummary => {
  const orders = new Map<string, { status: ReturnStatus; refundAmount: number }>();

  items.forEach((item, index) => {
    const key = item.id || item._id || `${item.orderId}-${index}`;
    const current = orders.get(key);

    if (!current) {
      orders.set(key, {
        status: item.status,
        refundAmount: item.refundAmount ?? 0,
      });
      return;
    }

    orders.set(key, {
      status: item.status,
      refundAmount: current.refundAmount + (item.refundAmount ?? 0),
    });
  });

  const values = Array.from(orders.values());

  return {
    total_returns: values.length,
    returned_orders: values.filter((item) => item.status === "Returned").length,
    refunded_orders: values.filter((item) => item.status === "Refunded").length,
    total_refunded_amount: values
      .filter((item) => item.status === "Refunded")
      .reduce((sum, item) => sum + item.refundAmount, 0),
  };
};

const getAuthToken = () => localStorage.getItem("adminToken") || localStorage.getItem("token") || "";

const ReturnItemsTable = () => {
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [summary, setSummary] = useState<ReturnsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const apiBaseUrl = (import.meta.env.VITE_BACKEND_API_URL as string | undefined) || "";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const token = getAuthToken();

        const res = await fetch(`${apiBaseUrl}/api/returns`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data;
        if (!Array.isArray(list)) throw new Error("Invalid response");

        const normalizedItems: ReturnItem[] = list.map((item) => ({
          ...item,
          quantity: Number(item.quantity ?? 0),
          refundAmount: Number(item.refundAmount ?? 0),
          status: normalizeReturnStatus(item.status),
        }));

        if (!cancelled) {
          setItems(normalizedItems);
          setSummary(data?.summary ?? buildSummaryFromItems(normalizedItems));
        }
      } catch {
        if (!cancelled) {
          setItems([]);
          setSummary(null);
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [apiBaseUrl]);

  const handleStatusChange = async (itemId: string, newStatus: ReturnStatus) => {
    const previousItems = items;
    const previousSummary = summary;
    const optimisticItems = items.map((item) => (
      (item.id || item._id) === itemId ? { ...item, status: newStatus } : item
    ));

    setItems(optimisticItems);
    setSummary(buildSummaryFromItems(optimisticItems));

    try {
      const token = getAuthToken();
      const updateRes = await fetch(`${apiBaseUrl}/api/returns/${itemId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!updateRes.ok) {
        throw new Error("Update failed");
      }

      const refreshRes = await fetch(`${apiBaseUrl}/api/returns`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!refreshRes.ok) {
        throw new Error("Refresh failed");
      }

      const refreshed = await refreshRes.json();
      const refreshedItems = Array.isArray(refreshed?.data)
        ? refreshed.data.map((item: ReturnItem) => ({
            ...item,
            quantity: Number(item.quantity ?? 0),
            refundAmount: Number(item.refundAmount ?? 0),
            status: normalizeReturnStatus(item.status),
          }))
        : optimisticItems;

      setItems(refreshedItems);
      setSummary(refreshed?.summary ?? buildSummaryFromItems(refreshedItems));
    } catch {
      setItems(previousItems);
      setSummary(previousSummary ?? buildSummaryFromItems(previousItems));
    }
  };

  const effectiveSummary = summary ?? buildSummaryFromItems(items);

  const stats = [
    {
      label: "Total Returns",
      value: effectiveSummary.total_returns,
      icon: <Package className="w-5 h-5 text-primary" />,
      bg: "bg-primary/5 border-primary/15",
      text: "text-primary",
    },
    {
      label: "Returned Orders",
      value: effectiveSummary.returned_orders,
      icon: <RotateCcw className="w-5 h-5 text-orange-600" />,
      bg: "bg-orange-50 border-orange-200",
      text: "text-orange-700",
    },
    {
      label: "Refunded Orders",
      value: effectiveSummary.refunded_orders,
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-700",
    },
    {
      label: "Total Refunded Amount",
      value: `₹${effectiveSummary.total_refunded_amount.toLocaleString("en-IN")}`,
      icon: <IndianRupee className="w-5 h-5 text-green-600" />,
      bg: "bg-green-50 border-green-200",
      text: "text-green-700",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 flex items-center gap-3 ${s.bg}`}>
            <div className="shrink-0">{s.icon}</div>
            <div>
              <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
              <p className={`text-xl font-bold leading-tight mt-0.5 ${s.text}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Return Items</h2>
        <p className="text-sm text-muted-foreground">Manage product returns and refunds</p>
      </div>

      <div className="p-5">
        {isLoading && (
          <div className="text-sm text-muted-foreground">Loading...</div>
        )}

        {!isLoading && hasError && (
          <div className="text-sm text-destructive">Unable to load returns data.</div>
        )}

        {!isLoading && !hasError && items.length === 0 && (
          <div className="text-sm text-muted-foreground">No return items yet.</div>
        )}

        {!isLoading && !hasError && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="py-3 pr-4 font-semibold">Order ID</th>
                  <th className="py-3 pr-4 font-semibold">Customer Name</th>
                  <th className="py-3 pr-4 font-semibold">Product</th>
                  <th className="py-3 pr-4 font-semibold">Qty</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 pr-0 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => {
                  const itemId = it.id || it._id || String(idx);
                  return (
                    <tr key={itemId} className="border-b border-border last:border-b-0">
                      <td className="py-3 pr-4 font-medium text-foreground whitespace-nowrap">{it.orderId}</td>
                      <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{it.customerName}</td>
                      <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{it.productName}</td>
                      <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{it.quantity}</td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLOR[it.status] ?? "bg-secondary text-muted-foreground border-border"}`}>
                            {it.status}
                          </span>
                          <Select
                            value={it.status}
                            onValueChange={(v) => handleStatusChange(itemId, v as ReturnStatus)}
                          >
                            <SelectTrigger className="w-28 h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Returned" className="text-xs">Returned</SelectItem>
                              <SelectItem value="Refunded" className="text-xs">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="py-3 pr-0 text-muted-foreground whitespace-nowrap">
                        {it.createdAt ? new Date(it.createdAt).toLocaleString() : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ReturnItemsTable;
