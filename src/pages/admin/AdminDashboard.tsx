import { useState } from "react";
import { Search, Bell, UserCircle } from "lucide-react";
import { Product, allProducts } from "@/data/products";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStats from "@/components/admin/AdminStats";
import ProductsTable from "@/components/admin/ProductsTable";
import OrdersTable, { Order } from "@/components/admin/OrdersTable";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import FeedbackTable from "@/components/admin/FeedbackTable";
import ContactTable from "@/components/admin/ContactTable";
import AdminLogin from "./AdminLogin";
import { cn } from "@/lib/utils";

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", items: 2, subtotal: 20998, shipping: 0, total: 20998, status: "pending", paymentMethod: "UPI", paymentStatus: "paid", date: "2026-02-18", address: "42, MG Road", city: "Mumbai", state: "Maharashtra", pincode: "400001" },
  { id: "ORD-002", customer: "Ananya Patel", email: "ananya@email.com", phone: "+91 87654 32109", items: 1, subtotal: 89999, shipping: 0, total: 89999, status: "processing", paymentMethod: "Credit Card", paymentStatus: "paid", date: "2026-02-17", address: "15, Park Street", city: "Kolkata", state: "West Bengal", pincode: "700016", trackingNumber: "BD987654321IN" },
  { id: "ORD-003", customer: "Riya Gupta", email: "riya@email.com", phone: "+91 99887 76655", items: 3, subtotal: 55997, shipping: 99, discount: 1500, total: 54596, status: "shipped", paymentMethod: "COD", paymentStatus: "pending", date: "2026-02-16", address: "8, Connaught Place", city: "New Delhi", state: "Delhi", pincode: "110001", trackingNumber: "SP112233445IN" },
  { id: "ORD-004", customer: "Sneha Reddy", email: "sneha@email.com", phone: "+91 76543 21098", items: 1, subtotal: 28999, shipping: 0, total: 28999, status: "delivered", paymentMethod: "Debit Card", paymentStatus: "paid", date: "2026-02-15", address: "5, Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: "500034" },
  { id: "ORD-005", customer: "Kavya Singh", email: "kavya@email.com", phone: "+91 88776 65544", items: 2, subtotal: 42998, shipping: 99, total: 43097, status: "cancelled", paymentMethod: "UPI", paymentStatus: "refunded", date: "2026-02-14", address: "12, Civil Lines", city: "Jaipur", state: "Rajasthan", pincode: "302006" },
  { id: "ORD-006", customer: "Meera Joshi", email: "meera@email.com", phone: "+91 65432 10987", items: 4, subtotal: 115996, shipping: 0, discount: 5000, total: 110996, status: "processing", paymentMethod: "Credit Card", paymentStatus: "paid", date: "2026-02-13", address: "22, Anna Salai", city: "Chennai", state: "Tamil Nadu", pincode: "600002" },
  { id: "ORD-007", customer: "Pooja Nair", email: "pooja@email.com", phone: "+91 77665 54433", items: 1, subtotal: 34999, shipping: 0, total: 34999, status: "delivered", paymentMethod: "UPI", paymentStatus: "paid", date: "2026-02-12", address: "3, Palarivattom", city: "Kochi", state: "Kerala", pincode: "682025" },
  { id: "ORD-008", customer: "Ishita Verma", email: "ishita@email.com", phone: "+91 99001 12233", items: 2, subtotal: 18998, shipping: 99, total: 19097, status: "pending", paymentMethod: "Credit Card", paymentStatus: "paid", date: "2026-02-20", address: "7, Hazratganj", city: "Lucknow", state: "Uttar Pradesh", pincode: "226001", notes: "Please pack as a gift." },
];

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f1f2f4] dark:bg-background text-foreground">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={cn("transition-all duration-300 min-h-screen flex flex-col", sidebarCollapsed ? "ml-16" : "ml-60")}>
        {/* Shopify-style Top Bar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-card border-b border-border h-14 flex items-center justify-between px-6 shadow-sm">
          <div className="flex-1 flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground capitalize mr-4">
              {activeTab === "dashboard" ? "Home" : activeTab}
            </h1>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search" className="w-full h-9 pl-9 pr-4 rounded-lg bg-[#f1f2f4] dark:bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:font-normal" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2.5 w-2 h-2 bg-black dark:bg-white rounded-full ring-2 ring-white dark:ring-card"></div>
            </button>
            <button className="flex items-center gap-2 p-1 pl-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors">
              <span className="text-sm font-medium hidden sm:block text-foreground/80">Admin</span>
              <UserCircle className="w-7 h-7 text-muted-foreground" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-[1200px] w-full mx-auto space-y-6 flex-1">
          {activeTab === "dashboard" && (
            <>
              <AdminStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-card rounded-xl border border-border p-5 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-foreground/80">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-mono text-xs text-muted-foreground mr-2">{o.id}</span>
                          <span className="font-medium text-foreground">{o.customer}</span>
                        </div>
                        <span className="font-medium text-foreground">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(o.total)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-card rounded-xl border border-border p-5 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-foreground/80">Latest Products in Catalog</h3>
                  <div className="space-y-3">
                    {products.slice().reverse().slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-border bg-secondary" />
                          <div>
                            <span className="font-medium block">{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.category}</span>
                          </div>
                        </div>
                        <span className="font-medium">{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <ProductsTable />
          )}

          {activeTab === "orders" && (
            <OrdersTable />
          )}

          {activeTab === "customers" && (
            <div className="bg-white dark:bg-card rounded-xl border border-border p-12 text-center text-muted-foreground shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-2">Customers</h2>
              <p>View and manage your customer accounts and purchase history here.</p>
            </div>
          )}

          {activeTab === "analytics" && (
            <AnalyticsDashboard />
          )}

          {activeTab === "feedback" && (
            <FeedbackTable />
          )}

          {activeTab === "contact" && (
            <ContactTable />
          )}

          {activeTab === "discounts" && (
            <div className="bg-white dark:bg-card rounded-xl border border-border p-12 text-center text-muted-foreground shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-2">Discounts</h2>
              <p>Create and manage discount codes and automatic discounts.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white dark:bg-card rounded-xl border border-border p-12 text-center text-muted-foreground shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-2">Settings</h2>
              <p>Configure your store details, shipping, and payments.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
