import { useState } from "react";
import {
  Search, Eye, Package, Truck, CheckCircle2, XCircle,
  RefreshCw, Clock, CreditCard, MapPin, Phone, Mail, User,
  ChevronDown, ChevronUp, Download, Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

export interface OrderItem {
  name: string;
  sku: string;
  qty: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone?: string;
  items: number;
  itemDetails?: OrderItem[];
  total: number;
  subtotal?: number;
  shipping?: number;
  discount?: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  paymentMethod: string;
  paymentStatus?: "paid" | "pending" | "failed" | "refunded";
  date: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  trackingNumber?: string;
  notes?: string;
}

const STATUS_CONFIG: Record<Order["status"], { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-secondary text-foreground border-border",         icon: <Clock className="w-3 h-3" /> },
  processing: { label: "Processing", color: "bg-secondary text-primary border-primary/30",        icon: <RefreshCw className="w-3 h-3" /> },
  shipped:    { label: "Shipped",    color: "bg-accent text-accent-foreground border-border",     icon: <Truck className="w-3 h-3" /> },
  delivered:  { label: "Delivered",  color: "bg-secondary text-foreground border-border",         icon: <CheckCircle2 className="w-3 h-3" /> },
  cancelled:  { label: "Cancelled",  color: "bg-destructive/10 text-destructive border-destructive/20", icon: <XCircle className="w-3 h-3" /> },
  refunded:   { label: "Refunded",   color: "bg-secondary text-muted-foreground border-border",   icon: <RefreshCw className="w-3 h-3" /> },
};

const PAYMENT_STATUS_COLOR: Record<string, string> = {
  paid:     "bg-secondary text-foreground",
  pending:  "bg-secondary text-muted-foreground",
  failed:   "bg-destructive/10 text-destructive",
  refunded: "bg-secondary text-muted-foreground",
};

const ORDER_TIMELINE: Record<Order["status"], string[]> = {
  pending:    ["pending"],
  processing: ["pending", "processing"],
  shipped:    ["pending", "processing", "shipped"],
  delivered:  ["pending", "processing", "shipped", "delivered"],
  cancelled:  ["pending", "cancelled"],
  refunded:   ["pending", "processing", "refunded"],
};

const TIMELINE_STEPS = ["pending", "processing", "shipped", "delivered"];

interface OrdersTableProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

const OrdersTable = ({ orders, setOrders }: OrdersTableProps) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { toast } = useToast();

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = o.customer.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      (o.phone || "").includes(q);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchPayment = filterPayment === "all" || o.paymentMethod.toLowerCase() === filterPayment;
    return matchSearch && matchStatus && matchPayment;
  });

  // Summary counts
  const counts = orders.reduce((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {} as Record<string, number>);
  const totalRevenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (viewOrder?.id === orderId) setViewOrder(prev => prev ? { ...prev, status } : null);
    toast({ title: "Order updated", description: `Order ${orderId} marked as ${status}` });
  };

  const handleTrackingUpdate = (orderId: string, tracking: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, trackingNumber: tracking } : o));
    if (viewOrder?.id === orderId) setViewOrder(prev => prev ? { ...prev, trackingNumber: tracking } : null);
  };

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Total Orders", value: orders.length, color: "text-foreground" },
          { label: "Pending", value: counts.pending || 0, color: "text-amber-600" },
          { label: "Processing", value: counts.processing || 0, color: "text-blue-600" },
          { label: "Shipped", value: counts.shipped || 0, color: "text-purple-600" },
          { label: "Delivered", value: counts.delivered || 0, color: "text-emerald-600" },
          { label: "Revenue", value: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(totalRevenue), color: "text-foreground" },
        ].map(card => (
          <div key={card.label} className="bg-white dark:bg-card border border-border rounded-xl p-3 shadow-sm">
            <p className="text-[11px] text-muted-foreground">{card.label}</p>
            <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, order ID, email or phone..." className="pl-9" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                <span className="flex items-center gap-1.5">{cfg.icon} {cfg.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterPayment} onValueChange={setFilterPayment}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Payment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="credit card">Credit Card</SelectItem>
            <SelectItem value="debit card">Debit Card</SelectItem>
            <SelectItem value="cod">COD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} order{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Table */}
      <div className="bg-white dark:bg-card rounded-xl border border-border overflow-x-auto shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="w-8"></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Update Status</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => (
              <>
                <TableRow key={order.id} className="group">
                  <TableCell>
                    <button
                      onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {expandedRow === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium text-primary">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                      {order.phone && <p className="text-xs text-muted-foreground">{order.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-center font-medium">{order.items}</TableCell>
                  <TableCell className="text-sm text-right font-semibold">{formatPrice(order.total)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-xs font-medium">{order.paymentMethod}</p>
                      {order.paymentStatus && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${PAYMENT_STATUS_COLOR[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Select value={order.status} onValueChange={(v) => handleStatusChange(order.id, v as Order["status"])}>
                      <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                          <SelectItem key={key} value={key} className="text-xs">
                            <span className="flex items-center gap-1.5">{cfg.icon} {cfg.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewOrder(order)}>
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expanded Row - Quick Info */}
                {expandedRow === order.id && (
                  <TableRow key={`${order.id}-expanded`} className="bg-secondary/20">
                    <TableCell colSpan={10} className="py-3 px-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-muted-foreground font-medium mb-0.5">Shipping Address</p>
                            <p>{order.address || "—"}</p>
                            {order.city && <p>{order.city}{order.state ? `, ${order.state}` : ""} {order.pincode}</p>}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Package className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-muted-foreground font-medium mb-0.5">Tracking</p>
                            <p>{order.trackingNumber || "Not assigned"}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CreditCard className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-muted-foreground font-medium mb-0.5">Payment Breakdown</p>
                            <p>Subtotal: {formatPrice(order.subtotal || order.total)}</p>
                            {order.shipping !== undefined && <p>Shipping: {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</p>}
                            {order.discount && <p className="text-primary">Discount: -{formatPrice(order.discount)}</p>}
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium mb-0.5">Order Timeline</p>
                          <div className="flex items-center gap-1">
                            {TIMELINE_STEPS.map((step, i) => {
                              const done = ORDER_TIMELINE[order.status]?.includes(step);
                              const isCancelled = order.status === "cancelled" || order.status === "refunded";
                              return (
                                <div key={step} className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${isCancelled && i === 1 ? "bg-red-400" : done ? "bg-emerald-500" : "bg-border"}`} />
                                  {i < TIMELINE_STEPS.length - 1 && <div className={`w-4 h-0.5 ${done && !isCancelled ? "bg-emerald-400" : "bg-border"}`} />}
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex gap-2 mt-1 text-[10px] text-muted-foreground">
                            {TIMELINE_STEPS.map(s => <span key={s} className="capitalize">{s.slice(0, 4)}</span>)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Full Order Detail Dialog */}
      <Dialog open={!!viewOrder} onOpenChange={() => setViewOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between pr-8">
              <div>
                <DialogTitle className="text-base font-mono">{viewOrder?.id}</DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{viewOrder?.date}</p>
              </div>
              {viewOrder && <StatusBadge status={viewOrder.status} />}
            </div>
          </DialogHeader>

          {viewOrder && (
            <div className="space-y-5 text-sm">
              {/* Order Timeline */}
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Order Progress</p>
                {viewOrder.status === "cancelled" || viewOrder.status === "refunded" ? (
                  <div className="flex items-center gap-2 text-destructive text-xs">
                    <XCircle className="w-4 h-4" />
                    <span className="font-medium capitalize">{viewOrder.status} — {viewOrder.date}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-0">
                    {TIMELINE_STEPS.map((step, i) => {
                      const done = ORDER_TIMELINE[viewOrder.status]?.includes(step);
                      return (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${done ? "bg-emerald-500 border-emerald-500 text-white" : "bg-card border-border text-muted-foreground"}`}>
                              {step === "pending" && <Clock className="w-3.5 h-3.5" />}
                              {step === "processing" && <RefreshCw className="w-3.5 h-3.5" />}
                              {step === "shipped" && <Truck className="w-3.5 h-3.5" />}
                              {step === "delivered" && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                            <p className={`text-[10px] mt-1 capitalize font-medium ${done ? "text-emerald-600" : "text-muted-foreground"}`}>{step}</p>
                          </div>
                          {i < TIMELINE_STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mb-4 ${done && ORDER_TIMELINE[viewOrder.status]?.includes(TIMELINE_STEPS[i + 1]) ? "bg-emerald-400" : "bg-border"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Customer Info */}
                <div className="space-y-3 bg-secondary/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium">{viewOrder.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs">{viewOrder.email}</span>
                    </div>
                    {viewOrder.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">{viewOrder.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3 bg-secondary/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipping Address</p>
                  {viewOrder.address ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
                      <div className="text-xs space-y-0.5">
                        <p>{viewOrder.address}</p>
                        {viewOrder.city && <p>{viewOrder.city}{viewOrder.state ? `, ${viewOrder.state}` : ""}</p>}
                        {viewOrder.pincode && <p>PIN: {viewOrder.pincode}</p>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No address provided</p>
                  )}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-secondary/20 rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Summary</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium">{viewOrder.paymentMethod}</span>
                  </div>
                  {viewOrder.paymentStatus && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Status</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${PAYMENT_STATUS_COLOR[viewOrder.paymentStatus]}`}>{viewOrder.paymentStatus}</span>
                    </div>
                  )}
                  <Separator className="my-1" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({viewOrder.items} items)</span>
                    <span>{formatPrice(viewOrder.subtotal || viewOrder.total)}</span>
                  </div>
                  {viewOrder.shipping !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{viewOrder.shipping === 0 ? "Free" : formatPrice(viewOrder.shipping)}</span>
                    </div>
                  )}
                  {viewOrder.discount && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-{formatPrice(viewOrder.discount)}</span>
                    </div>
                  )}
                  <Separator className="my-1" />
                  <div className="flex justify-between font-bold text-sm">
                    <span>Total</span>
                    <span>{formatPrice(viewOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Tracking + Status Update */}
              <div className="bg-secondary/20 rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shipment & Status</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Tracking number (e.g. BD123456789IN)"
                    defaultValue={viewOrder.trackingNumber || ""}
                    className="flex-1 text-xs h-8"
                    onChange={e => handleTrackingUpdate(viewOrder.id, e.target.value)}
                  />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Change Status:</p>
                  <Select value={viewOrder.status} onValueChange={(v) => handleStatusChange(viewOrder.id, v as Order["status"])}>
                    <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                        <SelectItem key={key} value={key} className="text-xs">
                          <span className="flex items-center gap-1.5">{cfg.icon} {cfg.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {viewOrder.notes && (
                <div className="bg-secondary border border-border rounded-lg p-3 text-xs text-muted-foreground">
                  <p className="font-medium mb-0.5">Order Notes</p>
                  <p>{viewOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
