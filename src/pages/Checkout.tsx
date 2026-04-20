import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, CreditCard, Check, Download, Package, Truck, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import CheckoutHeader from "../components/header/CheckoutHeader";
import Footer from "../components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

const generateOrderId = () => {
  return "TRY-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
};

interface CheckoutOrderItem {
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  shipping_method: string | null;
  shipping_cost: string;
  payment_method: string;
  payment_status: "paid" | "pending";
  payment_id: string | null;
  payment_provider: string | null;
  status: "pending" | "processing";
  subtotal: string;
  total: string;
  items: CheckoutOrderItem[];
}

interface CreateOrderResponse {
  id?: number;
  order_number?: string;
}

interface CompletedOrderSnapshot {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  codCharge: number;
  total: number;
  paymentMethod: string;
  shippingOption: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const apiBaseUrl = (import.meta.env.VITE_BACKEND_API_URL as string | undefined) || "";

const toDecimalString = (value: number) => value.toFixed(2);

const normalizeProductId = (productId: string, fallback: number) => {
  const numericPart = Number.parseInt(productId.replace(/\D/g, ""), 10);
  return Number.isNaN(numericPart) ? fallback : numericPart;
};

const Checkout = () => {
  const { cartItems, updateQuantity, clearCart, subtotal } = useCart();
  const { toast } = useToast();
  const [openSection, setOpenSection] = useState<string>("customer");
  const toggleSection = (id: string) => setOpenSection(prev => prev === id ? "" : id);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "", firstName: "", lastName: "", phone: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "", city: "", state: "", postalCode: "", country: "India"
  });
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", postalCode: "", country: "India"
  });
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "", expiryDate: "", cvv: "", cardholderName: "", upiId: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderError, setOrderError] = useState("");
  const [completedOrder, setCompletedOrder] = useState<CompletedOrderSnapshot | null>(null);

  const getShippingCost = () => {
    switch (shippingOption) {
      case "express": return 149;
      case "overnight": return 349;
      default: return 0;
    }
  };
  
  const shipping = getShippingCost();
  const codCharge = paymentMethod === "cod" ? 49 : 0;
  const total = subtotal + shipping + codCharge;
  const receiptItems = completedOrder?.items ?? cartItems;
  const receiptSubtotal = completedOrder?.subtotal ?? subtotal;
  const receiptShipping = completedOrder?.shipping ?? shipping;
  const receiptCodCharge = completedOrder?.codCharge ?? codCharge;
  const receiptTotal = completedOrder?.total ?? total;
  const receiptPaymentMethod = completedOrder?.paymentMethod ?? paymentMethod;
  const receiptShippingOption = completedOrder?.shippingOption ?? shippingOption;
  const receiptShippingAddress = completedOrder?.shippingAddress ?? shippingAddress;
  const receiptCustomerDetails = completedOrder?.customerDetails ?? customerDetails;

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };
  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };
  const handleBillingDetailsChange = (field: string, value: string) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };
  const handlePaymentDetailsChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const validateCheckout = () => {
    const requiredCustomerFields = [
      customerDetails.email,
      customerDetails.firstName,
      customerDetails.lastName,
      customerDetails.phone,
      shippingAddress.address,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postalCode,
      shippingAddress.country,
    ];

    if (requiredCustomerFields.some(value => !value.trim())) {
      return "Please complete all required customer and shipping fields.";
    }

    if (paymentMethod === "card") {
      if (!paymentDetails.cardholderName.trim() || !paymentDetails.cardNumber.trim() || !paymentDetails.expiryDate.trim() || !paymentDetails.cvv.trim()) {
        return "Please complete all card details before placing the order.";
      }
    }

    if (paymentMethod === "upi" && !paymentDetails.upiId.trim()) {
      return "Please enter your UPI ID before placing the order.";
    }

    if (hasSeparateBilling) {
      const requiredBillingFields = [
        billingDetails.firstName,
        billingDetails.lastName,
        billingDetails.address,
        billingDetails.city,
        billingDetails.postalCode,
      ];

      if (requiredBillingFields.some(value => !value.trim())) {
        return "Please complete the billing address or disable separate billing.";
      }
    }

    return null;
  };

  const buildOrderPayload = (): CreateOrderPayload => {
    const paymentStatus = paymentMethod === "cod" ? "pending" : "paid";
    const orderStatus = paymentMethod === "cod" ? "pending" : "processing";

    return {
      customer_name: `${customerDetails.firstName} ${customerDetails.lastName}`.trim(),
      customer_email: customerDetails.email.trim(),
      customer_phone: customerDetails.phone.trim(),
      address_line1: shippingAddress.address.trim(),
      address_line2: hasSeparateBilling
        ? `Billing: ${billingDetails.firstName} ${billingDetails.lastName}, ${billingDetails.address}, ${billingDetails.city}, ${billingDetails.postalCode}`.trim()
        : null,
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      pincode: shippingAddress.postalCode.trim(),
      country: shippingAddress.country.trim(),
      shipping_method: shippingOption,
      shipping_cost: toDecimalString(shipping),
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      payment_id: null,
      payment_provider: paymentMethod === "upi" ? "upi" : paymentMethod === "card" ? "card" : null,
      status: orderStatus,
      subtotal: toDecimalString(subtotal),
      total: toDecimalString(total),
      items: cartItems.map((item, index) => ({
        product_id: normalizeProductId(item.id, index + 1),
        product_name: item.name,
        product_image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
    };
  };

  const generatePDF = (oid: string) => {
    const doc = new jsPDF();
    const gold = [201, 168, 108] as const;
    
    // Header
    doc.setFillColor(26, 26, 26);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(201, 168, 108);
    doc.setFontSize(22);
    doc.text("TRIYANK", 105, 20, { align: "center" });
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("JEWELRY  •  HANDCRAFTED WITH LOVE", 105, 28, { align: "center" });

    // Order Info
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.text("Order Confirmation", 20, 55);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Order ID: ${oid}`, 20, 64);
    doc.text(`Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, 20, 70);
    doc.text(`Payment: ${receiptPaymentMethod === "card" ? "Credit/Debit Card" : receiptPaymentMethod === "upi" ? "UPI" : "Cash on Delivery"}`, 20, 76);

    // Divider
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(20, 82, 190, 82);

    // Customer Details
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Customer Details", 20, 92);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`${receiptCustomerDetails.firstName} ${receiptCustomerDetails.lastName}`, 20, 100);
    doc.text(receiptCustomerDetails.email, 20, 106);
    doc.text(receiptCustomerDetails.phone || "N/A", 20, 112);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Shipping Address", 120, 92);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(receiptShippingAddress.address || "N/A", 120, 100);
    doc.text(`${receiptShippingAddress.city}, ${receiptShippingAddress.state}`, 120, 106);
    doc.text(`${receiptShippingAddress.postalCode}, ${receiptShippingAddress.country}`, 120, 112);

    // Items Table Header
    let y = 125;
    doc.setDrawColor(...gold);
    doc.line(20, y, 190, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text("Item", 20, y);
    doc.text("Qty", 130, y, { align: "center" });
    doc.text("Price", 160, y, { align: "center" });
    doc.text("Total", 185, y, { align: "right" });
    y += 3;
    doc.line(20, y, 190, y);
    y += 8;

    // Items
    doc.setTextColor(80, 80, 80);
    receiptItems.forEach(item => {
      doc.text(item.name, 20, y, { maxWidth: 100 });
      doc.text(String(item.quantity), 130, y, { align: "center" });
      doc.text(formatPrice(item.price), 160, y, { align: "center" });
      doc.text(formatPrice(item.price * item.quantity), 185, y, { align: "right" });
      y += 8;
    });

    // Totals
    y += 4;
    doc.line(120, y, 190, y);
    y += 8;
    doc.setTextColor(100, 100, 100);
    doc.text("Subtotal", 120, y);
    doc.text(formatPrice(receiptSubtotal), 185, y, { align: "right" });
    y += 7;
    doc.text("Shipping", 120, y);
    doc.text(receiptShipping === 0 ? "Free" : formatPrice(receiptShipping), 185, y, { align: "right" });
    y += 7;
    if (receiptCodCharge > 0) {
      doc.text("COD Charge", 120, y);
      doc.text(formatPrice(receiptCodCharge), 185, y, { align: "right" });
      y += 3;
    }
    doc.line(120, y, 190, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Total", 120, y);
    doc.text(formatPrice(receiptTotal), 185, y, { align: "right" });

    // Footer
    doc.setFillColor(245, 242, 238);
    doc.rect(0, 270, 210, 27, "F");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for shopping with Triyank Jewelry!", 105, 280, { align: "center" });
    doc.text("triyankweb@gmail.com  •  +91 9967676817", 105, 286, { align: "center" });

    doc.save(`Triyank-Order-${oid}.pdf`);
  };

  const handleCompleteOrder = async () => {
    const validationError = validateCheckout();

    if (validationError) {
      setOrderError(validationError);
      toast({
        title: "Checkout incomplete",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    const payload = buildOrderPayload();
    console.log("Cart items:", cartItems);
    console.log("Order payload:", JSON.stringify(payload, null, 2));
    setIsProcessing(true);
    setOrderError("");

    try {
      setCompletedOrder({
        items: cartItems,
        subtotal,
        shipping,
        codCharge,
        total,
        paymentMethod,
        shippingOption,
        shippingAddress: { ...shippingAddress },
        customerDetails: { ...customerDetails },
      });

      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Could not create order. Please verify POST /api/orders is available.");
      }

      const createdOrder = await response.json() as CreateOrderResponse;
      const oid = createdOrder.order_number || (createdOrder.id ? `TRY-${createdOrder.id}` : generateOrderId());
      clearCart();
      setOrderId(oid);
      setPaymentComplete(true);
      toast({
        title: "Order placed",
        description: `Your order ${oid} has been created successfully.`,
      });
    } catch (error) {
      setCompletedOrder(null);
      const message = error instanceof Error ? error.message : "Could not create your order. Please try again.";
      setOrderError(message);
      toast({
        title: "Order creation failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(orderId);
  };

  // Payment success screen
  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-12 pb-20">
          <div className="max-w-xl mx-auto px-6 text-center">
            {/* Success animation */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">
              {paymentMethod === "cod" ? "Order Placed!" : "Payment Successful!"}
            </h1>
            <p className="text-muted-foreground font-light mb-1">
              {paymentMethod === "cod" ? "Your cash on delivery order has been confirmed." : "Thank you for your purchase."}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: <span className="text-foreground font-medium">{orderId}</span>
            </p>

            {/* Order Summary Card */}
            <div className="bg-muted/20 border border-border p-6 text-left mb-6">
              <h3 className="text-sm font-medium text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3">
                {receiptItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{receiptShipping === 0 ? "Free" : formatPrice(receiptShipping)}</span>
                </div>
                {receiptCodCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">COD Charge</span>
                    <span className="text-foreground">{formatPrice(receiptCodCharge)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-medium">
                  <span className="text-foreground">{receiptPaymentMethod === "cod" ? "Total Due" : "Total Paid"}</span>
                  <span className="text-foreground">{formatPrice(receiptTotal)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/20 border border-border p-6 text-left mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="h-5 w-5 text-[#c9a86c]" />
                <span className="text-sm text-foreground">
                  {receiptShippingOption === "overnight" ? "Delivery by tomorrow" : receiptShippingOption === "express" ? "Delivery in 1-2 days" : "Delivery in 3-5 business days"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-[#c9a86c]" />
                <span className="text-sm text-muted-foreground">
                  {receiptShippingAddress.address}, {receiptShippingAddress.city}, {receiptShippingAddress.state} - {receiptShippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownloadPDF}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-none gap-2"
              >
                <Download className="h-4 w-4" /> Download Order Receipt (PDF)
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-none mt-2"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CheckoutHeader />
        <main className="pt-20 pb-20 text-center px-6">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-light text-foreground mb-2">Your bag is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/">
            <Button className="rounded-none h-12 px-8">Start Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <main className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-muted/20 p-4 rounded-none sticky top-4">
                <h2 className="text-base font-medium text-foreground mb-3">Order Summary</h2>

                <div className="space-y-2 mb-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 rounded border border-border bg-background/80 p-2">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-secondary">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-xs truncate">{item.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-5 w-5 flex items-center justify-center rounded border border-muted-foreground/20 hover:bg-muted">
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="text-xs font-medium min-w-[1rem] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-5 w-5 flex items-center justify-center rounded border border-muted-foreground/20 hover:bg-muted">
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-medium text-foreground text-xs">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-muted-foreground/20 pt-2">
                  {!showDiscountInput ? (
                    <button onClick={() => setShowDiscountInput(true)} className="text-xs text-foreground underline hover:no-underline">
                      Have a discount code?
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code" className="flex-1 rounded-none h-8 text-xs" />
                      <Button variant="outline" className="rounded-none h-8 text-xs px-3" onClick={() => setShowDiscountInput(false)}>Apply</Button>
                    </div>
                  )}
                </div>

                <div className="border-t border-muted-foreground/20 mt-2 pt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  {codCharge > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">COD Charge</span>
                      <span>{formatPrice(codCharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium border-t border-muted-foreground/20 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-muted-foreground/20 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  <span>Secure checkout • 100% safe payment</span>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-3">

              {/* Step 1: Customer Details */}
              <div className="bg-muted/20 rounded-none border border-muted-foreground/10">
                <button
                  onClick={() => toggleSection("customer")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium shrink-0">1</span>
                    <span className="text-sm font-medium text-foreground">Customer & Shipping Details</span>
                  </div>
                  {openSection === "customer" ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {openSection === "customer" && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-light text-foreground">First Name *</Label>
                        <Input value={customerDetails.firstName}
                          onChange={(e) => handleCustomerDetailsChange("firstName", e.target.value)}
                          className="mt-1 rounded-none h-8 text-sm" placeholder="First name" />
                      </div>
                      <div>
                        <Label className="text-xs font-light text-foreground">Last Name *</Label>
                        <Input value={customerDetails.lastName}
                          onChange={(e) => handleCustomerDetailsChange("lastName", e.target.value)}
                          className="mt-1 rounded-none h-8 text-sm" placeholder="Last name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-light text-foreground">Email *</Label>
                        <Input id="email" type="email" value={customerDetails.email}
                          onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
                          className="mt-1 rounded-none h-8 text-sm" placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label className="text-xs font-light text-foreground">Phone *</Label>
                        <Input type="tel" value={customerDetails.phone}
                          onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                          className="mt-1 rounded-none h-8 text-sm" placeholder="+91 99676 76817" />
                      </div>
                    </div>

                    <div className="border-t border-muted-foreground/20 pt-3">
                      <p className="text-xs font-medium text-foreground mb-2">Shipping Address</p>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs font-light text-foreground">Address *</Label>
                          <Input value={shippingAddress.address}
                            onChange={(e) => handleShippingAddressChange("address", e.target.value)}
                            className="mt-1 rounded-none h-8 text-sm" placeholder="House/Flat No., Street" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-light text-foreground">City *</Label>
                            <Input value={shippingAddress.city}
                              onChange={(e) => handleShippingAddressChange("city", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="City" />
                          </div>
                          <div>
                            <Label className="text-xs font-light text-foreground">State *</Label>
                            <Input value={shippingAddress.state}
                              onChange={(e) => handleShippingAddressChange("state", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="State" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-light text-foreground">PIN Code *</Label>
                            <Input value={shippingAddress.postalCode}
                              onChange={(e) => handleShippingAddressChange("postalCode", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="110005" />
                          </div>
                          <div>
                            <Label className="text-xs font-light text-foreground">Country</Label>
                            <Input value={shippingAddress.country}
                              onChange={(e) => handleShippingAddressChange("country", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-muted-foreground/20 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="separateBilling" checked={hasSeparateBilling}
                          onCheckedChange={(checked) => setHasSeparateBilling(checked === true)} />
                        <Label htmlFor="separateBilling" className="text-xs font-light cursor-pointer">
                          Use different billing address
                        </Label>
                      </div>
                    </div>

                    {hasSeparateBilling && (
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-medium text-foreground">Billing Address</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-light">First Name *</Label>
                            <Input value={billingDetails.firstName}
                              onChange={(e) => handleBillingDetailsChange("firstName", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="First name" />
                          </div>
                          <div>
                            <Label className="text-xs font-light">Last Name *</Label>
                            <Input value={billingDetails.lastName}
                              onChange={(e) => handleBillingDetailsChange("lastName", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="Last name" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-light">Address *</Label>
                          <Input value={billingDetails.address}
                            onChange={(e) => handleBillingDetailsChange("address", e.target.value)}
                            className="mt-1 rounded-none h-8 text-sm" placeholder="Street address" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-light">City *</Label>
                            <Input value={billingDetails.city}
                              onChange={(e) => handleBillingDetailsChange("city", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="City" />
                          </div>
                          <div>
                            <Label className="text-xs font-light">PIN Code *</Label>
                            <Input value={billingDetails.postalCode}
                              onChange={(e) => handleBillingDetailsChange("postalCode", e.target.value)}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="PIN code" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Shipping Options */}
              <div className="bg-muted/20 rounded-none border border-muted-foreground/10">
                <button
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium shrink-0">2</span>
                    <span className="text-sm font-medium text-foreground">
                      Shipping Options
                      {openSection !== "shipping" && <span className="ml-2 text-xs text-muted-foreground font-normal">
                        {shippingOption === "standard" ? "Standard – Free" : shippingOption === "express" ? "Express – ₹149" : "Overnight – ₹349"}
                      </span>}
                    </span>
                  </div>
                  {openSection === "shipping" ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {openSection === "shipping" && (
                  <div className="px-4 pb-4">
                    <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-2">
                      {[
                        { id: "standard", label: "Standard Shipping", meta: "Free • 3-5 business days" },
                        { id: "express", label: "Express Shipping", meta: "₹149 • 1-2 business days" },
                        { id: "overnight", label: "Overnight Delivery", meta: "₹349 • Next business day" },
                      ].map(opt => (
                        <div key={opt.id} className="flex items-center justify-between px-3 py-2 border border-muted-foreground/20">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.id} id={opt.id} />
                            <Label htmlFor={opt.id} className="text-sm font-light cursor-pointer">{opt.label}</Label>
                          </div>
                          <span className="text-xs text-muted-foreground">{opt.meta}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>

              {/* Step 3: Payment */}
              <div className="bg-muted/20 rounded-none border border-muted-foreground/10">
                <button
                  onClick={() => toggleSection("payment")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium shrink-0">3</span>
                    <span className="text-sm font-medium text-foreground">
                      Payment
                      {openSection !== "payment" && <span className="ml-2 text-xs text-muted-foreground font-normal capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod.toUpperCase()}</span>}
                    </span>
                  </div>
                  {openSection === "payment" ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {openSection === "payment" && (
                  <div className="px-4 pb-4">
                    <div className="flex border-b border-muted-foreground/20 mb-4">
                      {[
                        { id: "card", label: "Card" },
                        { id: "upi", label: "UPI" },
                        { id: "cod", label: "Cash on Delivery" },
                      ].map(method => (
                        <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                          className={`px-4 py-2 text-xs font-light transition-colors border-b-2 -mb-[1px] ${
                            paymentMethod === method.id
                              ? "border-[#c9a86c] text-foreground"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs font-light text-foreground">Cardholder Name *</Label>
                          <Input value={paymentDetails.cardholderName}
                            onChange={(e) => handlePaymentDetailsChange("cardholderName", e.target.value)}
                            className="mt-1 rounded-none h-8 text-sm" placeholder="Name on card" />
                        </div>
                        <div>
                          <Label className="text-xs font-light text-foreground">Card Number *</Label>
                          <div className="relative mt-1">
                            <Input value={paymentDetails.cardNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                                if (value.length <= 19) handlePaymentDetailsChange("cardNumber", value);
                              }}
                              className="rounded-none pl-9 h-8 text-sm" placeholder="4242 4242 4242 4242" maxLength={19} />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-light text-foreground">Expiry *</Label>
                            <Input value={paymentDetails.expiryDate}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
                                if (value.length <= 5) handlePaymentDetailsChange("expiryDate", value);
                              }}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div>
                            <Label className="text-xs font-light text-foreground">CVV *</Label>
                            <Input value={paymentDetails.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                if (value.length <= 3) handlePaymentDetailsChange("cvv", value);
                              }}
                              className="mt-1 rounded-none h-8 text-sm" placeholder="123" maxLength={3} />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs font-light text-foreground">UPI ID *</Label>
                          <Input value={paymentDetails.upiId}
                            onChange={(e) => handlePaymentDetailsChange("upiId", e.target.value)}
                            className="mt-1 rounded-none h-8 text-sm" placeholder="yourname@upi" />
                        </div>
                        <p className="text-xs text-muted-foreground">Supports Google Pay, PhonePe, Paytm and all UPI apps.</p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="p-3 bg-muted/30 text-xs text-muted-foreground">
                        Pay with cash when your order is delivered. An additional ₹49 COD charge applies.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order total + Pay Button */}
              <div className="bg-muted/10 border border-muted-foreground/20 px-4 py-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>COD Charge</span><span>₹49</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium border-t border-muted-foreground/20 pt-2">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>

              {orderError && (
                <p className="text-sm text-destructive">{orderError}</p>
              )}

              <Button onClick={handleCompleteOrder} disabled={isProcessing}
                className="w-full rounded-none h-11 text-sm">
                {isProcessing ? "Placing Order..." : `Pay ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
